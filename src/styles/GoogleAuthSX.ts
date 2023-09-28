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
    //width: '700px', // dev
    display: 'flex',
    //position: 'absolute',
    position: 'fixed',
    //right: hasScroll ? `${scrollWidth}px` : '0px',
    right: '0px',
    marginRight: '10px',
    marginTop: '10px',
    flexDirection: 'row',
    //flexDirection: 'column', // dev
    zIndex: '2'
  }
}

interface buttonInI {
  clicked: boolean
}

export const buttonIn = ({ clicked }:buttonInI) => {
  return {
    display: 'flex',
    textTransform: 'none',
    padding: '6px 6px !important',
    //width: clicked ? '300px' : '30px',
    width: '30px',
    color: '#3c4043',
    letterSpacing: '0.25px',
    fontFamily: '"Google Sans",arial,sans-serif',
    fontWeight: 500,
    background: 'white',
    ':hover': { 
      background: '#ededed',
    },

    alignItems: 'flex-start',
  }
}

export const buttonInInner = () => {
  return {
    display: 'flex',
    minHeight: '0vh !important',
    height: '25px !important',
    //display: 'flex',
    //background: 'yellow', //dev
    background: 'inherit', //dev
    // background: 'white', //dev
    // ':hover': { 
    //   background: '#ededed',
    // },
    /* width: '60px', */
    textWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    padding: '0px 6px !important',
  }
}

export const buttonWidthHelper = () => {
  return {
    //display: 'flex',
    display: 'none',
    textTransform: 'none',
    padding: '6px 6px !important',
    //width: '30px',
    width: 'fit-content',
    //width: 'unset',
    color: '#3c4043',
    letterSpacing: '0.25px',
    fontFamily: '"Google Sans",arial,sans-serif',
    fontWeight: 500,
    background: 'white',
    ':hover': { 
      background: '#ededed',
    },

    alignItems: 'flex-start',
  }
}

export const buttonWidthHelperInner = () => {
  return {
    display: 'flex',
    minHeight: '0vh !important',
    height: '25px !important',
    //display: 'flex',
    background: 'yellow',
    /* width: '60px', */
    textWrap: 'nowrap',
    //overflow: 'hidden',
    justifyContent: 'flex-start',
    padding: '0px 6px !important',
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

