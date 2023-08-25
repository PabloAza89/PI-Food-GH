import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    background: 'gray', // dev
    
  }
}

export const form = () => {
  return {
    //...noSelect,
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
    //...noSelect,
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

export const inputShownTitle = () => {
  return {
    display: 'flex',
    whiteSpace: 'pre',
    width: 'calc(68vw - 28px)',
    marginLeft: '14px',
    padding: '16.5px 0px 16.5px 0px',
    position: 'absolute',
    //color: 'yellow', // IF SETTING TO !IMPORTANT, JQUERY CANNOT OVERRIDE STYLE ! // dev
    color: 'rgba(0, 0, 0, 0.87) !important',
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
      color: length > 0 ? 'transparent !important' : 'rgba(0, 0, 0, 0.87) !important',
      //color: 'red !important', // dev
      caretColor: 'rgba(0, 0, 0, 0.87) !important',
      '::selection': {  
      }
    }
  }
}

export const inputShownSummary = () => {
  return {
    //display: 'flex',
    //display: 'inline-flex',
    //position: 'absolute',
    //flexDirection: 'row',
    //display: 'none', // dev
    //background: 'darkgreen',
    //whiteSpace: 'pre',
    
    //width: '350px',
    //height: '250px',
    //height: '150px',
    //height: '23px',
    //maxwidth: 'calc(68vw - 28px)',
    //minwidth: 'calc(68vw - 28px)',
    //height: '79px',
    //textWrap: 'wrap',
    //whiteSpace: 'pre-wrap',
    //marginLeft: '14px',
    //padding: '16.5px 0px 16.5px 0px',
    //padding: '16.5px 0px 16.5px 0px',

    //position: 'relative', // dev
    
    //color: 'rgba(0, 0, 0, 0.87) !important',
    //flexWrap: 'wrap',
    //whiteSpace: 'pre',
    //fontWight: '400',
    //letterSpacing: '0.15008px',
    //lineHeight: '23px',
    //textOverflow: 'clip',
    //whiteSpace: 'pre-wrap',
    //overflowWrap: 'anywhere',
    //whiteSpace: 'nowrap',
    //whiteSpace: 'wrap',

    //flexWrap: 'nowrap',
    //overflowWrap: 'normal',
    //textWrap: 'wrap',
    //letterSpacing: '0.15008px',
    //wordSpacing: '0px',
    //WebkitBorderHorizontalSpacing: '0px',
    //WebkitBorderVerticalSpacing: '0px',
    //whiteSpaceCollapse: 'collapse'
    //whiteSpace: 'break-spaces',
    //whiteSpace: 'pre',

    //textWrap: 'wrap',
    //whiteSpace: 'break-spaces',
    //flexWrap: 'wrap',

    height: '79px',
    //width: 'calc(68vw - 28px)',
    width: 'calc(68vw - 14px)',
    color: 'yellow', // dev // IF SETTING TO !IMPORTANT, JQUERY CANNOT OVERRIDE STYLE !
    background: 'darkgreen',

    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
    //color: 'rgba(0, 0, 0, 0.87)',
    boxSizing: 'border-box',
    cursor: 'text',
    display: 'inline-flex',
    WebkitBoxAlign: 'center',
    msFlexAlign: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '4px',
    //padding: '16.5px 14px',
    padding: '16.5px 0px 0px 14px',

    textOverflow: 'clip',
    textEmphasisPosition: 'over',
    //flexWrap: 'nowrap',
    overflowWrap: 'normal',
    textWrap: 'nowrap',
    whiteSpaceCollapse: 'collapse',
    flexWrap: 'wrap',
    //whiteSpace: 'break-spaces',
    whiteSpace: 'pre-wrap',

  }
}

interface inputHiddenSummaryI {
  length: number
}

export const inputHiddenSummary = ({ length }: inputHiddenSummaryI) => {
  return {
    /* ...noSelect, */
    display: 'flex',
    //display: 'none',
    //whiteSpace: 'pre',
    //display: 'none', // dev
    position: 'relative',
    //whiteSpace: 'pre',
    width: '68vw',
    //width: 'calc(68vw - 12px)',
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
    height: '56px',
    background: 'lightred',
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
