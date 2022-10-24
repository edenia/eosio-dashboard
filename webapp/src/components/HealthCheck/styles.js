export default (theme) => ({
  icon: {
    '& svg': {
      width: '16px !important',
      height: '16px !important',
      cursor: 'pointer',
    },
  },
  modal: {
    padding: theme.spacing(0, 3, 3),
    display: 'flex',
    flexDirection: 'column',
    '& p': {
      fontWeight: 'bold',
    },
    '& svg': {
      marginRight: theme.spacing(2),
    },
  },
  item: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    marginBlock: '2px',
  },
  helpIcon: {
    width: '15px !important',
    height: '15px !important',
    cursor: 'pointer',
  },
  greenLight: {
    color: 'darkgreen',
  },
  timerOff: {
    color: 'orange',
  },
  yellowLight: {
    color: 'orangered',
  },
  redLight: {
    color: 'darkred',
  },
  test: {
    boxShadow: '10px 5px 5px red !important'
  }
})
