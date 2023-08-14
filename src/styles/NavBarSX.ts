import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX'; // ALL VARS

interface backgroundI {
  menuShown: boolean
}

export const background = ({ menuShown }: backgroundI) => {
  return {
    display: 'flex',
    flexDirection: menuShown ? 'column' : 'row',
    minHeight: menuShown ? '200px' : '100px',
    height: menuShown ? '200px' : '100px',
    width: '100vw',
    //width: '600px',
    backgroundColor: 'rgba(0,255,255,.264)',
    //background: 'gray' // dev
    //marginBottom: '10px',
  }
}

interface logoAndMenuContainerI {
  currentWidth: number,
  scrollWidth: number
}

export const logoAndMenuContainer = ({ currentWidth, scrollWidth }: logoAndMenuContainerI) => {
  return {
    //background: 'red', // dev
    display: 'flex',
    //width: '100vw',
    
    width: currentWidth <= 800 ? `calc(100vw - ${scrollWidth}px)` : '200px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  menuShown: boolean,
  currentWidth: number,
  scrollWidth: number,
}

export const selectsAndButtons = ({ menuShown, currentWidth, scrollWidth }: selectsAndButtonsI) => {
  return {
    //display: menuShow ? 'flex' : 'none',
    marginRight: `17px`,
    display: currentWidth <= 800 && !menuShown ? 'none' : 'flex',
    //display: 'flex',
    flexDirection: 'column',
    minWidth: '570px',
    //width: 'calc(100vw - 200px)',
    //width: `calc(100vw - ${scrollWidth}px)`,
    width: `95vw`,
    height: '100px',
    //width: 'calc(100% - 200px - 17px)',
    justifyContent: 'space-around',
    //background: 'blue', // dev
    alignItems: 'center',
    alignSelf: 'center',
    //paddingRight: '100px',
    //marginRight: '50px',
    //padding: currentWidth <= 800 ? `0px 90px 0px 1px` : `0px 300px`,
    //padding: '0px 300px'
    // marginLeft: '7px',
    // marginRight: '27px',
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
    //background: '#FFFFFF',
    background: 'yellow', // dev
    borderRadius: '4px',
    //marginTop: '3px',
    fieldset: {
      border: '2px solid rgb(190, 190, 174)',
    }
  }
}

export const inputProps = () => {
  return {
    //width: '180px',
    height: '35px',
    background: '#FFFFFF',
    //background: 'red', // dev
    //borderRadius: '4px',
    //marginTop: '3px',
  }
}

interface labelHealthI {
  healthLabelShown: boolean,
}

export const labelHealth = ({ healthLabelShown }: labelHealthI) => {
  return {
    //background: 'red', // dev
    background: '#FFFFFF !important',
    borderRadius: '4px 4px 0px 0px ',
    marginLeft: '-8px',
    //width: healthLabelShown || alphaLabelShown ? 'unset' : '82%',
    //width: healthLabelShown ? 'unset' : '82%',
    //width: healthLabelShown ? 'calc(fit-content + 8px)' : '80%',
    width: healthLabelShown ? '130px' : '80%',
    marginTop: '-3px',
  }
}

interface labelAlphaI {
  alphaLabelShown: boolean,
}

export const labelAlpha = ({ alphaLabelShown }: labelAlphaI) => {
  return {
    //background: 'red', // dev
    background: '#FFFFFF !important',
    borderRadius: '4px 4px 0px 0px ',
    marginLeft: '-8px',
    //paddingRight: '8px',
    //width: healthLabelShown || alphaLabelShown ? 'unset' : '82%',
    //width: alphaLabelShown ? 'unset' : '80%',
    //width: alphaLabelShown ? 'calc(fit-content + 8px)' : '80%',
    //width: alphaLabelShown ? 'fit-content' : '80%',
    width: alphaLabelShown ? '155px' : '80%',
    //width: alphaLabelShown ? 'calc(fit-content + 8px)' : '80%',
    marginTop: '-3px',
  }
}

export const selectDietsHealthAlpha = () => {
  return {
    //width: '180px',
    minWidth: '155px',
    width: '11vw',
    height: '35px',
    background: '#FFFFFF',
    fieldset: {
      border: '2px solid rgb(190, 190, 174)',
    }
  }
}


export const test = () => {
  return {
    display: 'flex',
    //background: 'red', // dev
  }
}

interface upperI {
  currentWidth: number,
  scrollWidth: number,
}

export const upper = ({ currentWidth, scrollWidth }: upperI) => {
  return {
    //background: 'red', // dev
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //padding: currentWidth <= 800 ? '0px 7px' : '0px 20%',
    //width: currentWidth <= 800 ? `calc(100vw - ${scrollWidth}px)` : '50vw',
    width: currentWidth <= 800 ? `95vw` : '50vw',
    minWidth: currentWidth <= 800 ? 'unset' : '570px',
    // marginLeft: '7px',
    // marginRight: '7px',
  }
}

interface lowerI {
  currentWidth: number,
  scrollWidth: number,
}

export const lower = ({ currentWidth, scrollWidth }: lowerI) => {
  return {
    //background: 'red', // dev
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: currentWidth <= 800 ? `95vw` : '50vw',
    minWidth: currentWidth <= 800 ? 'unset' : '570px',
    alignItems: 'flex-end',
  }
}

export const button = () => {
  return {
    //background: 'blue', // dev
    background: '#F0F0F0',
    ':hover': { background: '#e8e8e8' },
    color: 'black',
    height: '35px',
    //fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: '13.33px',
    //alignItems: 'baseline',
    paddingLeft: '11px',
    paddingRight: '11px',
    paddingTop: '0px',
    paddingBottom: '0px',
    
    border: '2px solid rgb(190, 190, 174)',
    alignItems: 'center',
    lineHeight: 'unset', // very important, makes button unaligned.
    //inlineSize: '150px',
    fontFamily: 'Roboto',

  }
}

interface menuButtonI {
  currentWidth: number,
}

export const menuButton = ({ currentWidth }: menuButtonI) => {
  return {
    display: currentWidth <= 800 ? 'flex' : 'none',
    //background: 'blue', // dev
    background: '#F0F0F0',
    ':hover': { background: '#e8e8e8' },
    marginRight: '18px',
    color: 'black',
    height: '45px',
    minWidth: '55px !important',
    width: '55px !important',
    fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: '13.33px',
  }
}

