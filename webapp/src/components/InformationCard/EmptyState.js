import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const EmptyState = ({ classes, t }) => {
  return (
    <div className={`${classes.centerWrapper} ${classes.borderLine}`}>
      <div className={classes.emptyState}>
        <div className={classes.horizontalLine}></div>
        <img
          className={classes.imgError}
          src="/empty-states/Error.webp"
          loading="lazy"
          alt=""
        />
        <span>{t('emptyState')}</span>
        <Button
          component={Link}
          to="/non-compliant-bps"
          variant="contained"
          color="secondary"
          mt={2}
        >
          {t('viewList')}
        </Button>
      </div>
    </div>
  )
}

EmptyState.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
}

EmptyState.defaultProps = {
  classes: {},
}

export default memo(EmptyState)
