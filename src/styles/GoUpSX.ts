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
    background: 'gray',
    transform: 'rotate(90deg)',
    ':hover': { background: 'darkgray', },
    bottom: '10px',
    right: '10px',
    minWidth: '45px !important',
    width: '45px !important',
    height: '45px',
  }
}
