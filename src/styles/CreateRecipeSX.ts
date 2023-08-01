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
  }
}

// eachRow 80vw
// (text) 12vw + 68vw (input)

export const eachRow = () => {
  return { 
    background: 'lightgray',
    display: 'flex',
    flexDirection: 'row',
    width: '80vw',
    justifyContent: 'center',
  }
}

export const text = () => {
  return {
    color: 'black',
    width: '12vw',
    background: 'green',
  }
}

export const input = () => {
  return { 
    width: '68vw',
    background: 'lightblue'
  }
}

// eachRow 80vw
// (text) 12vw + 68vw (input)
// (text) 12vw + 6vw (step) + 48vw (input) + 7vw (button) + 7vw (button)


export const step = () => {
  return { 
    width: '6vw',
    background: 'lightblue'
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
    height: '100%',
  }
}

export const buttonDelete = () => {
  return { 
    width: '7vw',
    background: 'red',
    color: 'white',
    height: '100%',
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