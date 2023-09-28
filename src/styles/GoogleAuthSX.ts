import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

interface backgroundI {
  hasScroll: boolean,
  scrollWidth: number
}

export const background = ({ hasScroll, scrollWidth }: backgroundI) => {
  return {
    display: 'flex',
    position: 'absolute',
    right: hasScroll ? `${scrollWidth}px` : '0px',
    marginRight: '10px',
    marginTop: '10px',
    flexDirection: 'row',
    zIndex: '2'
  }
}

export const bgIn = () => {
  return {
    textTransform: 'none',
    width: '50px',
    color: '#3c4043',
    letterSpacing: '0.25px',
    fontFamily: '"Google Sans",arial,sans-serif',
    fontWeight: 500,
    background: 'white',
    ':hover': { 
      background: '#ededed',
      //width: 'unset',
    },
    
    //paddingRight: '20px',
    //padding: '0px 2px'
    
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

