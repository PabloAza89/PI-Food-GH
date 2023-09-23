import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX'; // ALL VARS

export const background = () => {
  return {
    display: 'flex',
    position: 'fixed',
    flexDirection: 'row',
    minHeight: '100px',
    height: '100px',
    width: '100vw',
    //backgroundColor: 'rgba(0,255,255,.264)',
    //background: 'gray' // dev
  }
}

export const logoTextContainer = () => {
  return {
    //background: 'red', // dev
    cursor: 'pointer', // dev
    display: 'flex',
    flexDirection: 'row',
    minWidth: '200px',
    width: '200px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
}

export const logo = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '69px',
    height: '69px',
    alignSelf: 'center',
    //marginLeft: '0.5vh',
  }
}

export const linkLink = () => {
  return {
    ...noDeco,
  }
}

export const linkText = () => {
  return {
    ...noDeco,
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    //background: 'gray', // dev
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    justifyContent: 'center',
    //paddingLeft: '1vh',
    //paddingLeft: '7px',
    fontSize: '24px',
    fontWeight: 700,
    width: '115px',
    textAlign: 'right',
  }
}