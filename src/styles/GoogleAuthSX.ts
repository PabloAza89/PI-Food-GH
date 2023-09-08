import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';



export const background = () => {
  return {
    display: 'flex',
    position: 'absolute',
    right: '0px',
    marginRight: '10px',
    marginTop: '10px',
    flexDirection: 'row',
    zIndex: '2'
  }
}

export const bgIn = () => {
  return {
    textTransform: 'none',
    color: '#3c4043',
    letterSpacing: '0.25px',
    fontFamily: '"Google Sans",arial,sans-serif',
    fontWeight: 500,
    background: 'white',
    ':hover': { background: '#ededed' }
  }
}

export const bgOut = () => {
  return {
    marginLeft: '4px',
    padding: '0vw !important',
    minWidth: '0vh !important',
    minHeight: '0vh !important',
    width: '36.5px !important',
    height: '36.5px !important',
  }
}

