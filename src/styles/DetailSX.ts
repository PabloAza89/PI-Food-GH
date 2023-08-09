import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    //background: 'gray', // dev
    alignItems: 'center',
    alignSelf: 'center',
  }
}

export const card = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    //background: 'gray', // dev
    width: '55vw',
    padding: '18px',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '16px',
    //paddingBottom: '5000px',
    //marginBottom: '5000px',
    //margin: '16px 16px 16px 16px',
    background: 'linear-gradient(135deg, rgba(64, 117, 117, 0.1), rgba(64, 117, 117, 0))',
    //'-webkit-backdrop-filter': 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    border: '1px solid rgb(255, 255, 255, 0.18)',
    //borderRadius: '4px',
  }
}

export const image = () => {
  return {
    ...noSelect,
    display: 'flex',
    width: '400px',
    height: '260px',
  }
}


export const text = () => {
  return {
    ...noSelect,
    fontSize: '18px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    color: 'antiquewhite',
    //background: 'red', // dev
    textAlign: 'center',
    letterSpacing: 'normal',
    textWrap: 'wrap',
  }
}

export const instructions = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  }
}

export const eachStep = () => {
  return {
    ...noSelect,
    display: 'flex',
    flexDirection: 'row',
  }
}

export const eachStepTitle = () => {
  return {
    ...noSelect,
    //background: 'blue', // dev
    fontSize: '18px',
    width: '75px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    color: 'antiquewhite',
    textAlign: 'right',
    letterSpacing: 'normal',
    textWrap: 'wrap',
  }
}

export const eachStepContent = () => {
  return {
    ...noSelect,
    //background: 'red', // dev
    fontSize: '18px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    width: 'calc(55vw - 75px)',
    color: 'antiquewhite',
    letterSpacing: 'normal',
    textWrap: 'wrap',
  }
}

export const helperBottom = () => {
  return {
    //...noSelect,
    display: 'flex',
    //zIndex: 4000,
    height: '16px', // marginTop: '16px',
    //background: 'red', //dev
    //width: '100vw',
    width: '50vw',
  }
}

export const errorCard = () => {
  return {
    //background: 'gray', // dev
    display: 'flex',
    //position: 'relative',
    position: 'fixed',
    flexDirection: 'column',
    color: 'antiquewhite',
    width: '55vw',
    //height: '15vh',
    height: '150px',
    padding: '18px',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    background: 'linear-gradient(135deg, rgba(64, 117, 117, 0.1), rgba(64, 117, 117, 0))',
    WebkitBackdropFilter: 'blur(20px)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    border: '1px solid rgb(255, 255, 255, 0.18)',
  }
}

export const button = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    color: 'antiquewhite',
    //color: 'red',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontWeight: 650,
    background: '#94b38a',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    ':hover': { background: '#859e7d' }
    //background: 'gray', // dev
    //width: '55vw',
    //padding: '18px',
    //alignItems: 'center',
    //alignSelf: 'center',

  }
}

export const backgroundError = () => {
  return {
    //marginTop: '90px',
    display: 'flex',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    //background: 'blue', // dev
    //zIndex: '50000 !important',
    justifyContent: 'center',
  }
}