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
    //background: 'gray',
    transform: 'rotate(90deg)',
    
    bottom: '10px',
    //backdropFilter: 'blur(40px)',
    //background: 'rgba(128, 128, 128, .5)',
    background: 'darkorchid',
    //':hover': { background: '#962ec9', },
    ':hover': { background: '#9030bf', },
    
    //backdropFilter: 'blur(40px)',
    //boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.37)',
    color: 'antiquewhite',
    right: '10px',
    minWidth: '43px !important',
    width: '43px !important',
    height: '43px',
  }
}
