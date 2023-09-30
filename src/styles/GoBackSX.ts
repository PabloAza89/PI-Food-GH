import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX'; // ALL VARS

interface backgroundI {
  recipeNotFound: boolean | undefined
}

// export const background = ({ recipeNotFound }: backgroundI) => {
//   return {
//     display: recipeNotFound ? 'none' : 'flex',
//     position: 'fixed',
//     flexDirection: 'row',
//     minHeight: '100px',
//     height: '100px',
//     width: '100vw',
//     zIndex: 2,
//     //backgroundColor: 'rgba(0,255,255,.264)',
//     //background: 'gray' // dev
//   }
// }

export const background = ({ recipeNotFound }: backgroundI) => {
  return {
    background: 'lightblue', // dev
    display: recipeNotFound ? 'none' : 'flex',
    position: 'fixed',
    cursor: 'pointer', // dev
    //flexDirection: 'row',
    flexDirection: 'column',
    //minHeight: '100px',
    //padding: '16px 0px 0px 16px',
    //marginLeft: '16px',
    margin: '16px 0px 0px 16px',
    //width: '200px',
    width: '69px',
    zIndex: 2,
    //backgroundColor: 'rgba(0,255,255,.264)',
    //background: 'gray' // dev
  }
}

// export const logoTextContainer = () => {
//   return {
//     background: 'red', // dev
//     cursor: 'pointer', // dev
//     display: 'flex',
//     flexDirection: 'row',
//     //flexDirection: 'column',
//     minWidth: '200px',
//     width: '200px',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   }
// }

// 16px // 69px

export const logo = () => {
  return {
    background: 'yellow', // dev
    display: 'flex',
    flexDirection: 'row',
    //marginTop: '16px',
    width: '69px',
    height: '69px',
    //alignSelf: 'center',
    //marginLeft: '0.5vh',
  }
}

export const columnContainer = () => {
  return {
    background: 'blue', // dev
    width: '36px', // 61 + 8 = 69
    height: '155px',
    display: 'flex',
    ...noDeco,
    flexDirection: 'row',
    textDecoration: 'none',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    //justifyContent: 'center',
    //paddingLeft: '1vh',
    //paddingLeft: '7px',
    fontSize: '24px',
    fontWeight: 700,
    //width: '115px',
    //width: '56x', // 61 + 8 = 69

    //height: '200px',
    lineHeight: '23px',
    textAlign: 'center',
    //alignSelf: 'center',
    //textAlign: 'right'
    //justifyContent: 'center',
    marginLeft: '18px',
    marginTop: '8px',
    
  }
}

export const letters = () => {
  return {
    background: 'gray',
    flexDirection: 'column',
    display: 'flex',
    position: 'relative',
    height: '155px',
    width: '18px',
  }
}


export const exclamationMarkContainer = () => {
  return {
    display: 'flex',
    position: 'relative',
    height: '155px',
    width: '18px',
    background: 'orange',
    //marginBottom: '42px'
  }
}

export const exclamationMark = () => {
  return {
    background: 'yellow',
    //width: '36px', // 'scale(.5, 1)' // 36 = 18
    width: '18px', // 'scale(.5, 1)' // 36 = 18
    height: '112px',
    //alignSelf: 'flex-end',
    fontSize: '123px',
    transform: 'scale(.5, 1)',
    //paddingBottom: '42px',
    display: 'flex',
    justifyContent: 'center',
    //alignItems: 'flex-end',
    alignItems: 'flex-end',
  }
}

