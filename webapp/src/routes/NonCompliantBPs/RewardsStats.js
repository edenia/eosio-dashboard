/* eslint camelcase: 0 */
import React, { memo } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'

import { eosConfig } from '../../config'
import { formatWithThousandSeparator } from '../../utils'

import styles from './styles'

const useStyles = makeStyles(styles)

const RewardsStats = ({ stats }) => {
  const classes = useStyles()
  const { t } = useTranslation('rewardsDistributionRoute')

  return (
    <>
      <div className={`${classes.cardHeader} ${classes.cardShadow}`}>
        <div className={classes.rewardsCards}>
          <Typography variant="h6" component="h4">
            {t('paidProducers')}
          </Typography>
          <Typography variant="h3" component="p" className={classes.statsText}>
            {stats.quantity || 0}
          </Typography>
        </div>
      </div>
      <div className={`${classes.cardHeader} ${classes.cardShadow}`}>
        <div className={classes.rewardsCards}>
          <Typography variant="h6" component="h4">{`${t(
            'dailyRewards',
          )} (USD)`}</Typography>
          <Typography variant="h3" component="p" className={classes.statsText}>
            {`${formatWithThousandSeparator(
              stats.dailyRewards * stats.tokenPrice,
              0,
            )} USD`}
          </Typography>
        </div>
      </div>
      <div className={`${classes.cardHeader} ${classes.cardShadow}`}>
        <div className={classes.rewardsCards}>
          <Typography variant="h6" component="h4">
            {`${t('dailyRewards')} (${eosConfig.tokenSymbol})`}
          </Typography>
          <Typography variant="h3" component="p" className={classes.statsText}>
            {`${formatWithThousandSeparator(stats.dailyRewards, 0)} ${
              eosConfig.tokenSymbol
            }`}
          </Typography>
        </div>
      </div>
      <div className={`${classes.cardHeader} ${classes.cardShadow}`}>
        <div className={classes.rewardsCards}>
          <Typography variant="h6" component="h4">
            {t('rewardsPercentage')}
          </Typography>
          <Typography variant="h3" component="p" className={classes.statsText}>
            {`${stats.percentageRewards?.toFixed(2)}%`}
          </Typography>
        </div>
      </div>
    </>
  )
}

RewardsStats.propTypes = {}

export default memo(RewardsStats)
