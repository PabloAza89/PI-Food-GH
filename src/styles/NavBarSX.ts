import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX'; // ALL VARS

interface backgroundI {
  menuShow: boolean
}

export const background = ({ menuShow }: backgroundI) => {
  return {
    display: 'flex',
    flexDirection: menuShow ? 'column' : 'row',
    minHeight: menuShow ? '200px' : '100px',
    height: menuShow ? '200px' : '100px',
    width: '100vw',
    backgroundColor: 'rgba(0,255,255,.264)',
    //background: 'gray' // dev
  }
}

export const logoAndMenuContainer = () => {
  return {
    //background: 'red', // dev
    display: 'flex',
    flexDirection: 'row',
  }
}

export const logoTextContainer = () => {
  return {
    //background: 'red', // dev
    display: 'flex',
    flexDirection: 'row',
    minWidth: '200px',
    width: '200px',
    minHeight: '100px',
    height: '100px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
}

interface selectsAndButtonsI {
  menuShow: boolean,
  currentWidth: number,
}

export const selectsAndButtons = ({ menuShow, currentWidth }: selectsAndButtonsI) => {
  return {
    //display: menuShow ? 'flex' : 'none',
    display: currentWidth <= 800 && !menuShow ? 'none' : 'flex',
    //display: 'flex',
    flexDirection: 'column',
    minWidth: '560px',
    width: 'calc(100vw - 200px)',
    justifyContent: 'space-around',
    background: 'blue', // dev
    //padding: '0px 300px'
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

export const input = () => {
  return {
    //width: '180px',
    height: '35px',
    background: '#FFFFFF',
    //marginTop: '3px',
  }
}

export const inputProps = () => {
  return {
    //width: '180px',
    height: '35px',
    background: '#FFFFFF',
    borderRadius: '4px',
    //marginTop: '3px',
  }
}

export const diets = () => {
  return {
    width: '180px',
    height: '35px',
    background: '#FFFFFF',
    marginTop: '3px',
  }
}

export const health = () => {
  return {
    width: '180px',
    height: '35px',
    background: '#FFFFFF',
    marginLeft: '8px',
    marginTop: '3px',
  }
}

export const labelHealth = () => {
  return {
    //width: '180px',
    //height: '2px !important',
    //fontSize: '1px !important',
    //background: 'yellow',
  }
}


export const label = () => {
  return {
    background: '#FFFFFF !important',
    borderRadius: '4px 4px 0px 0px '
  }
}


export const alpha = () => {
  return {
    // width: '180px',
    // height: '35px',
    // background: '#FFFFFF',
    width: '180px',
    height: '35px',
    background: '#FFFFFF',
    marginLeft: '8px',
    marginTop: '3px',
  }
}

export const test = () => {
  return {
    display: 'flex',
    //background: 'red', // dev
  }
}

export const upper = () => {
  return {
    //background: 'gray', // dev
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginLeft: '15vw',
    //marginRight: '15vw',
  }
}

export const lower = () => {
  return {
    //background: 'red', // dev
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    //marginLeft: '15vw',
    //marginRight: '15vw',
  }
}

export const button = () => {
  return {
    //background: 'blue', // dev
    background: '#F0F0F0',
    color: 'black',
    height: '35px',
    fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: '13.33px',
    /* display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center', */
    //marginLeft: '15vw',
    //marginRight: '15vw',
  }
}

interface menuButtonI {
  currentWidth: number,
}

export const menuButton = ({ currentWidth }: menuButtonI) => {
  return {
    display: currentWidth <= 800 ? 'flex' : 'none',
    //background: 'blue', // dev
    background: 'gray',
    //background: '#F0F0F0',
    color: 'black',
    height: '35px',
    fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: '13.33px',
    /* display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center', */
    //marginLeft: '15vw',
    //marginRight: '15vw',
  }
}

