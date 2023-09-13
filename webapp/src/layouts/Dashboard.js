import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createGlobalStyle } from 'styled-components'
import { makeStyles } from '@mui/styles'
import Hidden from '@mui/material/Hidden'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import NetworkSelector from '../components/NetworkSelector'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import SnackbarMessage from '../components/SnackbarMessage'
import { eosConfig, generalConfig } from '../config'
import { useSharedState } from '../context/state.context'
import routes from '../routes'

import styles from './styles'

const drawerWidth = 70
const openDrawerWidth = drawerWidth * (24 / 7)
const INIT_VALUES = {
  dynamicTitle: '',
  pathname: null,
}
const useStyles = makeStyles((theme) => styles(theme))

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    background: ${(props) => props.theme.body.background};
  }
  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const { t, i18n } = useTranslation('routes')
  const location = useLocation()
  const [lacchain] = useSharedState()
  const [routeName, setRouteName] = useState(INIT_VALUES)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    if (routes.some((route) => route.path === location.pathname)) {
      const managementCardTitle = lacchain.dynamicTitle || ''

      setRouteName({
        dynamicTitle:
          location.pathname === '/management'
            ? managementCardTitle
            : t(`${location.pathname}>heading`, {
                networkName: eosConfig.networkLabel,
              }),
        pathname: location.pathname,
        pageTitle: `${location.pathname}>title`,
      })
    } else {
      setRouteName(INIT_VALUES)
    }
    // eslint-disable-next-line
  }, [location.pathname, lacchain.dynamicTitle, t])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <GlobalStyle />
      <PageTitle title={t(routeName.pageTitle)} />
      <div className={classes.header}>
        <Header onDrawerToggle={handleDrawerToggle} />
      </div>
      <div
        className={classes.drawer}
        style={{ width: mobileOpen ? openDrawerWidth : drawerWidth }}
      >
        <Hidden mdUp implementation="js">
          <Sidebar
            PaperProps={{ style: { width: openDrawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Sidebar open={mobileOpen} onDrawerToggle={handleDrawerToggle} />
        </Hidden>
      </div>
      <div className={classes.appContent}>
        <div className={classes.mainContent}>
          <div className={classes.subHeader}>
            <div className={classes.boxHeader}>
              {routeName.pathname && (
                <Typography
                  variant="h3"
                  component="h1"
                  className={clsx(
                    classes.textAlignReadMore,
                    classes.marginBottom,
                  )}
                >
                  {routeName.dynamicTitle}
                </Typography>
              )}
              <Typography className={classes.textAlignReadMore}>
                {i18n.exists(`routes:${location.pathname}>moreDescription`)
                  ? t(`${location.pathname}>moreDescription`)
                  : ''}
              </Typography>
            </div>
            <NetworkSelector
              title={eosConfig.networkLabel}
              networkLogo={eosConfig.networkLogo}
              options={generalConfig.networkLinks}
            />
          </div>
          {children}
        </div>
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
      <SnackbarMessage />
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
}

export default Dashboard
