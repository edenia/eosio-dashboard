import React from 'react'
import { makeStyles } from '@mui/styles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import styles from './styles'

const useStyles = makeStyles(styles)

const HighchartsWrapper = ({ options }) => {
  const classes = useStyles()

  options.time = {
    timezoneOffset: new Date().getTimezoneOffset(),
    ...options?.time,
  }

  options.tooltip = {
    ...options?.tooltip,
    borderRadius: 10,
    borderWidth: 1,
  }

  return (
    <div className={classes.chart}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default HighchartsWrapper
