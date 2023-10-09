import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import { formatWithThousandSeparator } from '../../utils'
import CountryFlag from '../../components/CountryFlag'
import { eosConfig } from '../../config'

import styles from './styles'
import TokenToUSD from './TokenToUSD'

const lowestRewardsColor = '#B6EBF3'
const highestRewardsColor = '#265F63'

const useStyles = makeStyles((theme) =>
  styles(theme, lowestRewardsColor, highestRewardsColor),
)

const RewardsDistributionStats = ({ summary, setting, handlePopoverOpen }) => {
  const classes = useStyles()
  const { t } = useTranslation('rewardsDistributionRoute')

  return (
    <div className={classes.divMargin}>
      <div className={classes.cardHeader}>
        <Card className={`${classes.cardContent} ${classes.cardShadow}`}>
          <CardContent className={`${classes.cards} ${classes.totalDailyCard}`}>
            <Typography component="h2">{t('dailyRewards')}</Typography>
            <div className={classes.verticallyCenter}>
              <Typography variant="h6" component="p">
                {!summary?.dailyRewards > 0 && (
                  <Skeleton variant="text" width="100%" animation="wave" />
                )}
                {summary?.dailyRewards > 0 && (
                  <span>
                    {formatWithThousandSeparator(summary.dailyRewards, 2)}{' '}
                    {eosConfig.tokenSymbol}
                  </span>
                )}
              </Typography>
              <Typography variant="h6" component="p">
                {!setting?.token_price > 0 && (
                  <Skeleton variant="text" width="100%" animation="wave" />
                )}
                {setting?.token_price && !!summary?.dailyRewards && (
                  <span>
                    $
                    {formatWithThousandSeparator(
                      summary.dailyRewards * setting?.token_price,
                      0,
                    )}{' '}
                    USD
                  </span>
                )}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={classes.cardHeader}>
        <Card className={`${classes.cardContent} ${classes.cardShadow}`}>
          <CardContent className={classes.cards}>
            <Typography component="h2">
              {t('topCountryDailyRewards')}
            </Typography>
            <Typography variant="h6" component="p">
              {!summary?.topCountryByRewards > 0 && (
                <Skeleton variant="text" width="100%" animation="wave" />
              )}
              {summary?.topCountryByRewards && (
                <>
                  {summary.topCountryByRewards.name}
                  <CountryFlag code={summary.topCountryByRewards.code} />
                </>
              )}
            </Typography>
            <div className={`${classes.spaceBetween} ${classes.textBlock}`}>
              <Typography
                className={classes.textMargin}
                variant="subtitle1"
                component="p"
              >
                {!summary?.topCountryByRewards?.rewards > 0 && (
                  <Skeleton variant="text" width="100%" animation="wave" />
                )}
                {summary?.topCountryByRewards?.rewards > 0 && (
                  <TokenToUSD
                    amount={summary.topCountryByRewards.rewards}
                    tokenPrice={setting?.token_price}
                  />
                )}
              </Typography>
              <ExpandMoreIcon
                className={classes.expandIcon}
                onClick={handlePopoverOpen(summary?.topCountryByRewards)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={classes.cardHeader}>
        <Card className={`${classes.cardContent} ${classes.cardShadow}`}>
          <CardContent className={classes.cards}>
            <div className={classes.notLocated}>
              <Typography component="h2">{t('paidProducers')}</Typography>
              {!!summary?.producersWithoutProperBpJson.quantity && (
                <Button
                  className={classes.nonCompliantButton}
                  component={Link}
                  to="/undiscoverable-bps"
                  variant="contained"
                  color="primary"
                  mt={2}
                >
                  {t('viewList')}
                </Button>
              )}
            </div>
            <Typography variant="h6" component="p">
              {!summary?.producersWithoutProperBpJson.quantity > 0 ?? (
                <Skeleton variant="text" width="100%" animation="wave" />
              )}
              {summary?.producersWithoutProperBpJson.quantity >= 0 &&
                summary?.producersWithoutProperBpJson.quantity && (
                  <span>{summary?.producersWithoutProperBpJson.quantity}</span>
                )}
            </Typography>
            {summary?.producersWithoutProperBpJson.rewards > 0 && (
              <Typography
                variant="subtitle2"
                component="p"
                className={`${classes.textMargin} ${classes.marginPaidText}`}
              >
                {t('paidProducersText')}
              </Typography>
            )}
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.textMargin}
            >
              {!summary?.producersWithoutProperBpJson.rewards > 0 ?? (
                <Skeleton variant="text" width="100%" animation="wave" />
              )}
              {summary?.producersWithoutProperBpJson.rewards > 0 && (
                <TokenToUSD
                  amount={summary?.producersWithoutProperBpJson.rewards}
                  tokenPrice={setting?.token_price}
                />
              )}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className={classes.cardHeader}>
        <Card className={`${classes.cardContent} ${classes.cardShadow}`}>
          <CardContent className={`${classes.cards} ${classes.exchangeCard}`}>
            <div className={classes.center}>
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.rewardsColorSchema}
              >
                <span
                  className={`${classes.squareRewards} ${classes.lowestRewards}`}
                />
                <span className={classes.itemLabel}>{t('lowestRewards')}</span>
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                className={classes.rewardsColorSchema}
              >
                <span
                  className={`${classes.squareRewards} ${classes.highestRewards}`}
                />
                <span className={classes.itemLabel}>{t('highestRewards')}</span>
              </Typography>
            </div>
            <div className={classes.textBlock}>
              <Typography
                variant="subtitle1"
                component="p"
                className={`${classes.textMargin} ${classes.center}`}
              >
                <span className={classes.exchangeRateLabel}>
                  {`${t('exchangeRate')}: `}{' '}
                </span>
                {setting?.token_price ? (
                  <span>
                    {`1 ${
                      eosConfig.tokenSymbol
                    } = $${formatWithThousandSeparator(
                      setting.token_price,
                      4,
                    )}`}
                  </span>
                ) : (
                  <span>N/A</span>
                )}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RewardsDistributionStats
