import React from 'react'
import { makeStyles } from '@mui/styles'
import styles from './styles'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import Link from '@mui/material/Link'

const useStyles = makeStyles(styles)

const MainSocialLinks = ({ social, name }) => {
  const classes = useStyles()
  const socialMediaNames = ['twitter', 'github', 'telegram']
  const links = {}

  const icons = {
    twitter: <TwitterIcon />,
    github: <GitHubIcon />,
    telegram: <TelegramIcon />,
  }

  social.forEach((item, index) => {
    if (index > socialMediaNames.length || !socialMediaNames.includes(item?.name)) return
    links[item?.name] = item.url
  })

  return (
    <div className={classes.socialLinksContainer}>
      {socialMediaNames.map(
        (socialMedia) =>
          links[socialMedia] && (
            <Link
              href={links[socialMedia]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} ${socialMedia}`}
            >
              {icons[socialMedia]}
            </Link>
          ),
      )}
    </div>
  )
}

export default MainSocialLinks
