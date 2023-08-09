export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    background: 'gray', // dev
    
  }
}

export const form = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    background: 'darkred', // dev
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    marginTop: '16px',
  }
}

export const genericTooltip = () => {
  return {
    zIndex: 1,
  }
}

// eachRow 80vw
// (text) 12vw + 68vw (input)

export const eachRow = () => {
  return { 
    background: 'gray', // dev
    margin: '6px 0px',
    display: 'flex',
    flexDirection: 'row',
    width: '80vw',
    justifyContent: 'center',
  }
}

export const text = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    width: '12vw',
    height: '56px',
    background: 'green',
    justifyContent: 'center',
    alignItems: 'center'

  }
}

export const input = () => {
  return { 
    width: '68vw',
    background: 'lightblue'
  }
}

export const stepsContainer = () => {
  return {
    background: 'gold',
    display: 'flex',
    flexDirection: 'column'
  }
}

export const eachStep = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '68vw',
    marginBottom: '12px',
    ':last-child': {  marginBottom: '0px' }
  }
}

// eachRow 80vw
// (text) 12vw + 68vw (input)
// (text) 12vw + 6vw (step) + 48vw (input) + 7vw (button) + 7vw (button)


export const stepTitle = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '6vw',
    background: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export const inputStep = () => {
  return { 
    width: '48vw',
    background: 'lightblue'
  }
}

export const buttonNew = () => {
  return { 
    width: '7vw',
    background: 'green',
    color: 'white',
    //height: '100%',
    height: '36.5px',
    alignSelf: 'center',
    marginLeft: '5px',
    marginRight: '5px',
  }
}

export const buttonDelete = () => {
  return { 
    width: '7vw',
    background: 'red',
    color: 'white',
    //height: '100%',
    height: '36.5px',
    alignSelf: 'center',
    //marginLeft: '5px',
    marginRight: '5px',
  }
}


export const optionsLeft = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    paddingRight: '0.5vw',
  }
}

export const optionsRight = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  }
}

export const buttonClearSave = () => {
  return {
    margin: '0px 7px',
    //alignItems: 'baseline',
  }
}
