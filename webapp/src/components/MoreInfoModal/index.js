import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Tooltip as MUITooltip } from '@mui/material'

import Tooltip from '../Tooltip'

import styles from './styles'

const useStyles = makeStyles(styles)

const MoreInfoModal = ({ hideCloseButton, children }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (target) => {
    setAnchorEl(target)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <MUITooltip title={t('moreInfo')} arrow placement="right">
        <InfoOutlinedIcon
          className={classes.clickableIcon}
          onClick={(e) => {
            handlePopoverOpen(e.target)
          }}
        />
      </MUITooltip>
      <Tooltip
        anchorEl={anchorEl}
        open={anchorEl !== null}
        hideCloseButton={hideCloseButton}
        onClose={handlePopoverClose}
      >
        {children}
      </Tooltip>
    </>
  )
}

Tooltip.defaultProps = {
  hideCloseButton: false,
}

export default MoreInfoModal
