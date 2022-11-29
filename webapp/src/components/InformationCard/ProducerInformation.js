import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Popover, Tooltip } from '@mui/material'
import CountryFlag from '../CountryFlag'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LaunchIcon from '@mui/icons-material/Launch'
import CopyToClipboard from '../CopyToClipboard'

const ProducerInformation = ({ info, classes, t }) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const [OtherRes, SetOtherRes] = useState(null)
  const [data, setData] = useState([])

  const handleClick = (target, data) => {
    setAnchorEl(target)
    setData(data)
  }

  const handleClose = () => {
    setAnchorEl(null)
    SetOtherRes(null)
  }

  const handleOther = (target) => {
    SetOtherRes(target)
  }
  const open = Boolean(anchorEl)
  const openRes = Boolean(OtherRes)

  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <div className={classes.borderLine}>
        <div className={classes.rowWrapper}>
          {info?.location && info?.location !== 'N/A' && (
            <Typography variant="body1">
              {`${t('location')}: `}
              <CountryFlag code={info?.country} />
            </Typography>
          )}
        </div>

        <div className={classes.flex}>
          {!!info?.website ? (
            <>
              <>
                <Typography variant="body1" className={classes.textEllipsis}>
                  {t('website')}
                </Typography>
                <LaunchIcon
                  onClick={() => window.open(info?.website, '_blank')}
                  className={classes.clickableIcon}
                />
                <InfoOutlinedIcon
                  className={classes.clickableIcon}
                  onClick={(e) => {
                    handleClick(e.target, info?.website)
                  }}
                />
              </>
              <Popover
                className={classes.shadow}
                id={id}
                open={anchorEl !== null}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.flex}>
                  <div className={classes.popoverStyle}>
                    <Link target="_blank" rel="noopener noreferrer">
                      {data}
                    </Link>
                  </div>
                  <CopyToClipboard text={data} />
                </div>
              </Popover>
            </>
          ) : null}
        </div>

        <div className={classes.flex}>
          {!!info?.email ? (
            <>
              <>
                <Typography variant="body1" className={classes.textEllipsis}>
                  {t('email')}
                </Typography>
                <LaunchIcon
                  onClick={() => (window.location = `mailto:${info.email}`)}
                  className={classes.clickableIcon}
                />
                <InfoOutlinedIcon
                  className={classes.clickableIcon}
                  onClick={(e) => {
                    handleClick(e.target, info?.email)
                  }}
                />
              </>
              <Popover
                className={classes.shadow}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.flex}>
                  <div className={classes.popoverStyle}>
                    <Link target="_blank" rel="noopener noreferrer">
                      {data}
                    </Link>
                  </div>
                  <CopyToClipboard text={data} />
                </div>
              </Popover>
            </>
          ) : (
            <Typography variant="body1" className={classes.textEllipsis}>
              {t('email')}: N/A
            </Typography>
          )}
        </div>

        <div className={classes.flex}>
          {!!info?.ownership ? (
            <>
              <>
                <Typography variant="body1" className={classes.textEllipsis}>
                  {t('ownershipDisclosure')}
                </Typography>
                <LaunchIcon
                  onClick={() => window.open(info?.ownership, '_blank')}
                  className={classes.clickableIcon}
                />
                <InfoOutlinedIcon
                  className={classes.clickableIcon}
                  onClick={(e) => {
                    handleClick(e.target, info?.ownership)
                  }}
                />
              </>
              <Popover
                className={classes.shadow}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.flex}>
                  <div className={classes.popoverStyle}>
                    <Link target="_blank" rel="noopener noreferrer">
                      {data}
                    </Link>
                  </div>
                  <CopyToClipboard text={data} />
                </div>
              </Popover>
            </>
          ) : null}
        </div>

        <div className={classes.flex}>
          {!!info?.code_of_conduct ? (
            <>
              <>
                <Typography variant="body1" className={classes.textEllipsis}>
                  {t('codeofconduct')}
                </Typography>
                <LaunchIcon
                  onClick={() => window.open(info?.code_of_conduct, '_blank')}
                  className={classes.clickableIcon}
                />
                <InfoOutlinedIcon
                  className={classes.clickableIcon}
                  onClick={(e) => {
                    handleClick(e.target, info?.code_of_conduct)
                  }}
                />
              </>
              <Popover
                className={classes.shadow}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.flex}>
                  <div className={classes.popoverStyle}>
                    <Link target="_blank" rel="noopener noreferrer">
                      {data}
                    </Link>
                  </div>
                  <CopyToClipboard text={data} />
                </div>
              </Popover>
            </>
          ) : null}
        </div>

        <div className={classes.flex}>
          {!!info?.chain ? (
            <>
              <>
                <Typography variant="body1" className={classes.textEllipsis}>
                  {t('chainResources')}
                </Typography>
                <LaunchIcon
                  onClick={() => window.open(info?.chain, '_blank')}
                  className={classes.clickableIcon}
                />
                <Tooltip title="test" arrow placement='right'>
                  <InfoOutlinedIcon
                    className={classes.clickableIcon}
                    onClick={(e) => {
                      handleClick(e.target, info?.chain)
                    }}
                  />
                </Tooltip>
              </>
              <Popover
                className={classes.shadow}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.flex}>
                  <div className={classes.popoverStyle}>
                    <Link target="_blank" rel="noopener noreferrer">
                      {data}
                    </Link>
                  </div>
                  <CopyToClipboard text={data} />
                </div>
              </Popover>
            </>
          ) : null}
        </div>
        <div className={classes.flex}>
          {!!info?.otherResources.length && (
            <>
              <Typography variant="body1" className={classes.textEllipsis}>
                {t('otherResources')}
              </Typography>
              <InfoOutlinedIcon
                className={classes.clickableIcon}
                onClick={(e) => {
                  handleOther(e.target)
                }}
              />
              <Popover
                className={classes.shadow}
                id={id}
                open={openRes}
                anchorEl={OtherRes}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {info.otherResources.map((url, i) => (
                  <div className={classes.dd} key={i}>
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </Link>
                  </div>
                ))}
              </Popover>
            </>
          )}
        </div>
      </div>
    </>
  )
}

ProducerInformation.propTypes = {
  info: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
}

ProducerInformation.defaultProps = {
  info: {},
  classes: {},
}

export default memo(ProducerInformation)
