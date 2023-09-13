/* eslint camelcase: 0 */
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { makeStyles } from '@mui/styles'

import { formatWithThousandSeparator, rangeOptions } from '../../utils'
import { BLOCK_DISTRIBUTION_QUERY } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const options = {
  time: {
    timezoneOffset: new Date().getTimezoneOffset(),
  },
  title: {
    text: ' ',
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  tooltip: {
    pointFormat: '<b>{point.percentage:.1f}%</b>',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [],
}

const BlockDistribution = () => {
  const { t } = useTranslation('blockDistributionRoute')
  const [range, setRange] = useState(rangeOptions[0])
  const [series, setSeries] = useState([])
  const [load, { loading, data }] = useLazyQuery(BLOCK_DISTRIBUTION_QUERY)
  const classes = useStyles()

  useEffect(() => {
    load({
      variables: {
        range,
      },
    })
  }, [load, range])

  useEffect(() => {
    if (!data?.items) {
      return
    }

    setSeries([
      {
        innerSize: '80%',
        data: data.items.map((item) => ({
          name: item.account,
          y: item.percent * 100,
        })),
      },
    ])
  }, [data])

  return (
    <Card className={classes.cardShadow}>
      <CardContent>
        <div className={classes.textDiv}>
          <Typography component="p" variant="h6">
            {t('title')}
          </Typography>
          <div className={classes.formControl}>
            <FormControl variant="standard">
              <InputLabel htmlFor="select-range-label">
                {t('timeFrame')}
              </InputLabel>
              <Select
                inputProps={{ id: 'select-range-label' }}
                value={range}
                onChange={(e) => setRange(e.target.value)}
                fullWidth
              >
                {rangeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {t(option)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {loading && <LinearProgress />}
        {!loading && data?.items?.length > 0 && (
          <>
            <HighchartsReact
              highcharts={Highcharts}
              options={{ ...options, series }}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('account')}</TableCell>
                    <TableCell align="right">{t('blocksProduced')}</TableCell>
                    <TableCell align="right">{t('percent')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.account}</TableCell>
                      <TableCell align="right">
                        {formatWithThousandSeparator(item.blocks)}
                      </TableCell>
                      <TableCell align="right">
                        {formatWithThousandSeparator(
                          Math.ceil(item.percent * 100),
                          1,
                        )}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default BlockDistribution
