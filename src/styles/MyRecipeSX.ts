import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

interface formI {
  hasScroll: boolean,
  scrollWidth: number
}

export const form = ({ hasScroll, scrollWidth }: formI) => {
  return {
    background: 'darkred', // dev
    //...noSelect,
    //width: '70vw',
    display: 'flex',
    position: 'relative',
    //display: 'none',
    flexDirection: 'column',
    
    //width: '85vw',
    //width: '83vw',
    minWidth: '400px',
    //height: '100vh',
    alignItems: 'center',
    //marginLeft: 'max(101px, 10%)',
    //marginLeft: 'min(151px, 100%)',
    marginLeft: '101px',
    //marginLeft: '118px',
    //marginLeft: hasScroll ? `${101 + scrollWidth}px` : `101px`, // 16 + 64 + 16 + scrollWidth ~ 96 + scrollWidth
    marginRight: hasScroll ? `${96 + scrollWidth}px` : `96px`, // 16 + 64 + 16 + scrollWidth ~ 96 + scrollWidth
    marginTop: '16px',
    //alignSelf: 'center',

    // background: 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))',
    // backdropFilter: 'blur(20px)',
    // boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    // border: '1px solid rgb(255, 255, 255, 0.18)',
    // borderRadius: '4px',
  }
}

export const imageSearcher = () => {
  return {
    //...noSelect,
    display: 'flex',
    position : 'relative',
    //flexDirection: 'column',
    //background: 'yellow', // dev
    background: 'antiquewhite', // dev
    width: '400px !important',
    height: '300px !important',
    alignItems: 'center',
    marginTop: '16px',
  }
}

export const tooltipCenter = () => {
  return {
    //display: 'flex',
    //position: 'relative',
    zIndex: 1,
    //transitionDelay: '1s'
  }
}

export const tooltipLeft = () => {
  return {
    zIndex: 1,
    span: {
      position: relative,
      width: '90%',
      //background: 'blue', // dev
    }
  }
}

export const tooltipRight = () => {
  return {
    zIndex: 1,
    span: {
      position: relative,
      display: 'flex',
      flexDirection: 'row-reverse',
      width: '90%',
    }
  }
}

// eachRow 80vw
// (text) 12vw + 68vw (input)

export const eachRow = () => {
  return { 
    //...noSelect,
    background: 'gray', // dev
    margin: '6px 0px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    width: '80vw',
    //minWidth: '900px',
    minWidth: '600px',
    //height: '56px',
    //justifyContent: 'center',
  }
}

export const text = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    width: '12vw',
    minWidth: '113px',
    height: '56px',
    background: 'green',
    justifyContent: 'center',
    alignItems: 'center'

  }
}

export const textFieldLabel = () => {
  return {

    paddingTop: '0.5px',
    '::selection': {
       color: 'red !important',
       background: 'red !important',
    }

  }
}

export const textFieldInput = () => {
  return {
    color: 'transparent',
    '::selection': {
    }
  }
}

interface inputShownTitleI {
  disabled: boolean
}

export const inputShownTitle = ({ disabled }: inputShownTitleI) => {
  return {
    display: 'flex',
    whiteSpace: 'pre',
    width: 'calc(68vw - 28px)',
    marginLeft: '14px',
    padding: '16.5px 0px 16.5px 0px',
    position: 'absolute',
    //color: 'yellow', // IF SETTING TO !IMPORTANT, JQUERY CANNOT OVERRIDE STYLE ! // dev
    color: disabled ? 'transparent !important' : 'rgba(0, 0, 0, 0.87) !important', // IF TextField IS MULTILINE, PLACEHOLDER MUST BE LIKE THIS
  }
}

interface inputHiddenTitleI {
  length: number
}

export const inputHiddenTitle = ({ length }: inputHiddenTitleI) => {
  return {
    /* ...noSelect, */
    display: 'flex',
    //display: 'none', // dev
    position: 'relative',
    width: '68vw',
    input: {
      color: length > 0 ? 'transparent !important' : 'rgba(0, 0, 0, 0.87) !important', // IF TextField IS MULTILINE, PLACEHOLDER MUST BE LIKE THIS
      //color: 'transparent !important',
      //color: 'red !important', // dev
      caretColor: 'rgba(0, 0, 0, 0.87) !important',
      '::selection': {  
      }
    }
  }
}

export const inputShownSummary = () => {
  return {
    
    flexWrap: 'wrap',
    whiteSpace: 'pre-wrap',
    display: 'flex',
    width: 'calc(68vw - 28px)',
    marginLeft: '14px',
    padding: '16.5px 0px 16.5px 0px',
    position: 'absolute',
    fontWeight: '400',
    color: 'transparent !important',
  }
}

export const inputHiddenSummary = () => {
  return {
    display: 'flex',
    position: 'relative',
    width: '68vw',
    input: {
      //whiteSpace: 'pre',
      //color: length > 0 ? 'transparent !important' : 'rgba(0, 0, 0, 0.87) !important',
      color: 'transparent !important',
      //color: 'red !important', // dev
      //fontWeight: '900',
      caretColor: 'rgba(0, 0, 0, 0.87) !important',
      //caretColor: 'transparent !important',
      '::selection': { 
      }
    }
  }
}

export const inputShownInstructions = () => {
  return {
    
    flexWrap: 'wrap',
    whiteSpace: 'pre-wrap',
    display: 'flex',
    //width: 'calc(68vw - 28px)',
    width: 'calc(48vw - 28px)',
    marginLeft: '14px',
    padding: '16.5px 0px 16.5px 0px',
    position: 'absolute',
    fontWeight: '400',
    color: 'transparent !important',
  }
}

export const inputHiddenInstructions = () => {
  return {
    display: 'flex',
    position: 'relative',
    //width: '68vw',
    width: '48vw',
    //background: 'lightblue', // dev
    input: {
      //whiteSpace: 'pre',
      //color: length > 0 ? 'transparent !important' : 'rgba(0, 0, 0, 0.87) !important',
      color: 'transparent !important',
      //color: 'red !important', // dev
      //fontWeight: '900',
      caretColor: 'rgba(0, 0, 0, 0.87) !important',
      //caretColor: 'transparent !important',
      '::selection': {
      }
    }
  }
}

export const inputStep = () => {
  return { 
    width: '48vw',
    background: 'lightblue'
  }
}

export const input = () => {
  return {
    /* ...noSelect, */
    display: 'flex',
    position: 'relative',
    width: '68vw',
    input: {
      color: 'rgba(0, 0, 0, 0.87) !important',
      //color: 'transparent !important',
      //color: 'red !important', // dev
      caretColor: 'rgba(0, 0, 0, 0.87) !important',
      '::selection': {
      }
    }
  }
}

export const stepsContainer = () => {
  return {
    //background: 'gold', // dev
    background: 'gray',
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
    background: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    width: '6vw',
    minWidth: '57px',
    height: '56px',
    //background: 'lightred',
    justifyContent: 'center',
    alignItems: 'center'
  }
}



export const newStepTooltip = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  }
}


export const buttonNewHelper = () => {
  return {
    minWidth: '122px',
    width: '122px',
    height: '36.5px',
    //background: 'green',
    //background: 'gray', // dev
    //background: 'transparent', // dev
    //':hover': { background: 'darkgreen' },
    color: 'white',
    alignSelf: 'center',
    marginLeft: '5px',
    marginRight: '5px',
  }
}

export const buttonNew = () => {
  return {
    minWidth: '122px',
    width: '122px',
    height: '36.5px',
    background: 'green',
    //background: 'red', // dev
    //background: 'transparent', // dev
    ':hover': { background: 'darkgreen' },
    color: 'white',
    alignSelf: 'center',
    //marginLeft: '5px',
    //marginRight: '5px',
  }
}

export const buttonDeleteHelper = () => {
  return {
    minWidth: '122px',
    width: '122px',
    height: '36.5px',
    color: 'white',
    alignSelf: 'center',
    padding: '0px !important',
    marginRight: '5px',
  }
}

export const buttonDelete = () => {
  return {
    minWidth: '122px',
    width: '122px',
    height: '36.5px',
    //background: 'blue', // dev
    background: 'red',
    ':hover': { background: 'darkred' },
    color: 'white',
    alignSelf: 'center',
    padding: '0px !important',
    //paddingRight: '10px',
    marginLeft: '10px',
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
