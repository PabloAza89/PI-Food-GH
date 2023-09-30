import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX'; // ALL VARS

interface buttonI {
  scrollPosition: number,
}

export const button = ({ scrollPosition }: buttonI) => {
  return {
    display: scrollPosition >= 270 ? 'flex' : 'none',
    position: 'fixed',
    transform: 'rotate(90deg)',
    bottom: '10px',
    background: 'rgba(46, 230, 163, 0.377)',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.37)',
    color: 'antiquewhite',
    right: '10px',
    minWidth: '43px !important',
    width: '43px !important',
    height: '43px',
    ':hover': {
      background: 'rgba(45, 204, 146, 0.377)',
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.37)',
    }
  }
}
