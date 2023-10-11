export default (theme) => ({
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    '& a': {
      color: theme.palette.primary.main,
      textDecorationColor: theme.palette.primary.main,
    },
  },
  emptyStateContainer: {
    '& span': {
      width: '16em',
      height: '45px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.12',
      letterSpacing: '-0.22px',
      textAlign: 'center',
      color: '#3d3d3dde',
    },
  },
  emptyStateRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& span': {
      marginTop: theme.spacing(1),
    },
  },
  imgError: {
    [theme.breakpoints.down('lg')]: {
      width: '200px',
      height: '120px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '260px',
      height: '160px',
    },
    objectFit: 'contain',
  },
})
