import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

export const background = () => {
  return {
    //background: 'gray', // dev
    background: 'rgba(148, 179, 138, 0.171)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(240, 248, 255, 0.726)',
    fontSize: '4vh',
    textDecoration: 'none',

  }
}

export const text = () => {
  return {
    // fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    // fontSize: '34px',
    // fontWeight: '400px',
    // color: 'antiquewhite'
    ...noSelect,
    lineHeight: '27px',
    //color: darkMode ? 'white' : 'rgb(33, 37, 41)',
    //color: 'rgb(33, 37, 41)',
    color: 'antiquewhite',
    fontSize: '18px',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    fontWeight: 400,
    textAlign: 'center',
    padding: '0px 40px',
    marginBottom: '30px',
    //background: 'red', //
  }
}

export const link = (/* { darkMode }: linkI */) => {
  return {
    ...noSelect,
    lineHeight: '27px',
    //color: darkMode ? 'white' : 'rgb(0, 86, 179)',
    color: 'rgb(0, 86, 179)',
    fontSize: '18px',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    fontWeight: 400,
    //background: 'gray', // dev
    textUnderlinePosition: 'under',
    textAlign: 'center',
    //cursor: 'pointer',
  }
}

export const button = () => {
  return {
    marginTop: '40px',
    minWidth: '122px',
    width: '122px',
    height: '36.5px',
    //background: 'green',
    //background: '#41b1b1',

    background: '#859e7d',
    //background: 'red', // dev

    //background: 'transparent', // dev
    ':hover': { background: '#7b9174' },
    //color: 'white',
    color: 'antiquewhite',
    alignSelf: 'center',
    //cursor: 'pointer'
    //marginLeft: '5px',
    //marginRight: '5px',
  }
}

// export const button = () => {
//   return {
//     display: 'flex',
//     flexDirection: 'column',
//     color: 'antiquewhite',
//     width: '130px',
//     //color: 'red',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
//     fontWeight: 650,
//     fontSize: '15px',
//     background: '#41b1b1',
//     //border: '1px solid black',
//     boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
//     ':hover': { background: '#859e7d' }
//     //background: 'gray', // dev
//     //width: '55vw',
//     //padding: '18px',
//     //alignItems: 'center',
//     //alignSelf: 'center',

//   }
// }
