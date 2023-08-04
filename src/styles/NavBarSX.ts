import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX'; // ALL VARS

export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100px',
    height: '100px',
    width: '100vw',
    backgroundColor: 'rgba(0,255,255,.264)',
    //background: 'gray' // dev
  }
}

export const logoTextContainer = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    background: 'red', // dev
    minWidth: '200px',
    width: '200px',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export const selectsAndButtons = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    //width: '80vw',
    width: 'calc(100vw - 200px)',
    //width: 'min-content',
    justifyContent: 'space-around',
    padding: '0px 300px'
  }
}

export const logo = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '8vh',
    height: '8vh',
    alignSelf: 'center',
    marginLeft: '0.5vh',
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
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    justifyContent: 'center',
    paddingLeft: '1vh',
    fontSize: '24px',
    fontWeight: '700',
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
    background: 'yellow',
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
    background: 'red'
  }
}



export const upper = () => {
  return {
    background: 'gray', // dev
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
    background: 'red', // dev
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