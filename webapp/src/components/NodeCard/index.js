/* eslint camelcase: 0 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useQuery } from '@apollo/client'
import 'flag-icon-css/css/flag-icons.css'

import { NODE_CPU_BENCHMARK } from '../../gql'

import CountryFlag from '../CountryFlag'
import ProducerAvatar from '../ProducerAvatar'
import ProducerHealthIndicators from '../ProducerHealthIndicators'

import styles from './styles'

const useStyles = makeStyles(styles)

const NodeCard = ({ producer, node }) => {
  const classes = useStyles()
  const { data: { cpu } = {} } = useQuery(NODE_CPU_BENCHMARK, {
    variables: { account: node?.name || producer.owner },
  })
  const { t } = useTranslation('nodeCardComponent')
  const [producerOrg, setProducerOrg] = useState({})

  const ShowInfo = ({ cond, title, value }) => {
    if (!cond && !value) {
      return <></>
    }
    return (
      <>
        <dt className={classes.bold}>{title}</dt>
        <dd>{value}</dd>
      </>
    )
  }

  const Endpoints = () => {
    if (!node?.p2p_endpoint && !node?.api_endpoint && !node?.ssl_endpoint) {
      return <></>
    }

    const endpoints = [
      { key: 'p2p_endpoint', value: 'P2P' },
      { key: 'api_endpoint', value: 'API' },
      { key: 'ssl_endpoint', value: 'SSL' },
    ]

    return (
      <>
        <dt className={classes.bold}>{t('endpoints')}</dt>
        {endpoints.map(
          ({ key, value }, index) =>
            node[key]?.length && (
              <dd key={`endpoint-${node[key]}-${value}-${index}`}>
                <span className={classes.bold}>{value}</span>: {node[key]}
              </dd>
            ),
        )}
      </>
    )
  }
  const Keys = () => {
    if (!node?.keys) {
      return <></>
    }

    return (
      <>
        <dt className={classes.bold}>{t('keys')}</dt>
        {Object.keys(node.keys).map((key, i) => (
          <dd key={i}>
            <span className={classes.bold}>{key}</span>:{' '}
            <span className={classes.breakLine}>{node.keys[key]}</span>
          </dd>
        ))}
      </>
    )
  }
  const Features = () => {
    if (!node?.features) {
      return <></>
    }

    return (
      <>
        <dt className={classes.bold}>{t('features')}</dt>
        {node.features.map((feature, i) => (
          <dd key={i}>{feature}</dd>
        ))}
      </>
    )
  }
  const CpuBenchmark = () => {
    return (
      <>
        {cpu?.length > 0 && (
          <>
            <dt className={classes.bold}>{t('cpuBenchmark')}</dt>
            <dd>
              {(
                cpu.reduce((total, item) => total + item.usage, 0) / cpu.length
              ).toFixed(2)}
              µs
            </dd>
          </>
        )}
      </>
    )
  }
  const HealthStatus = () => {
    if (!node?.health_status?.length) {
      return <></>
    }

    return (
      <>
        <dt className={classes.bold}>{t('healthStatus')}</dt>
        <dd>
          <ProducerHealthIndicators producer={node} />
        </dd>
      </>
    )
  }

  useEffect(() => {
    setProducerOrg(producer.bp_json?.org || {})
  }, [producer])

  const title =
    producerOrg.candidate_name ||
    producerOrg.organization_name ||
    producer.owner

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <ProducerAvatar
            classes={classes}
            name={title}
            logo={producerOrg.branding?.logo_256}
          />
        }
        title={title}
        subheader={
          <>
            <span className={classes.country}>
              {node.location?.name || 'N/A'}
            </span>
            <CountryFlag code={node.location?.country} />
          </>
        }
      />
      <CardContent className={classes.content}>
        <dl className={classes.dl}>
          {!node ? (
            <>
              <dt className={classes.bold}>{t('emptyNode')}</dt>
            </>
          ) : (
            <>
              <ShowInfo value={node?.name} title={t('nodeName')} />
              <ShowInfo
                cond={node?.node_type}
                value={node?.node_type.toString()}
                title={t('nodeType')}
              />
              <ShowInfo value={node?.full} title={t('isFull')} />
              <ShowInfo
                value={node?.server_version_string}
                title={t('nodeVersion')}
              />

              <Features />
              <Endpoints />
              <Keys />
              <CpuBenchmark />
              <HealthStatus />
            </>
          )}
        </dl>
      </CardContent>
      <CardActions disableSpacing />
    </Card>
  )
}

NodeCard.propTypes = {
  producer: PropTypes.any,
  node: PropTypes.any,
}
export default NodeCard
