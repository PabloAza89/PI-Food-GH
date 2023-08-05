import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1002,
    alignItems: 'center',
    width: '450px',
    height: '225px',
    margin: '9px 9px 9px 9px',
    justifyContent: 'center',
    //backgroundColor: 'rgba(196, 34, 147, 0.253)',
    background: 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))',
    '-webkit-backdrop-filter': 'blur(20px)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    border: '1px solid rgb(255, 255, 255, 0.18)',
    borderRadius: '4px',
  }
}

export const image = () => {
  return {
    ...noSelect,
    display: 'flex',
    width: '280px',
    height: '115px',
  }
}


export const title = () => {
  return {
    ...noSelect,
    fontSize: '19px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    whiteSpace: 'nowrap', // all 3 together
    overflow: 'hidden', // all 3 together
    textOverflow: 'ellipsis', // all 3 together
    color: 'antiquewhite',
    fontWeight: 700,
    //background: 'red', // dev
    width: '417px',
    height: '25px',
    textAlign: 'center',
    letterSpacing: 'normal',
  }
}

export const text = () => {
  return {
    ...noSelect,
    fontSize: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    whiteSpace: 'nowrap', // all 3 together
    overflow: 'hidden', // all 3 together
    textOverflow: 'ellipsis', // all 3 together
    color: 'antiquewhite',
    //fontWeight: 700,
    //background: 'red', // dev
    width: '417px',
    height: '25px',
    textAlign: 'center',
    letterSpacing: 'normal',
  }
}

