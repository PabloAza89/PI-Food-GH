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
    /* ...noSelect, */
    /* display: 'flex', */
    /* color: 'yellow !important', */
    /* color: 'transparent !important', */
    /* color: 'red !important', */
    /* color: 'black !important', */
    /* background: 'red !important', */
    //UserSelect: 'text !important',
    //userSelect: "text",
    paddingTop: '0.5px',
    '::selection': {
      // color: 'red !important',
      // background: 'red !important',
       color: 'red !important',
       background: 'red !important',
      //color: 'rgba(255, 255, 255, 0) !important', // PERFECT
      //background: 'rgba(255, 255, 255, 0) !important', // PERFECT
      //color: 'yellow !important',
      /* background: 'red !important',
      backgroundColor: 'red !important', */

    }

  }
}

export const textFieldInput = () => {
  return {
    //...noSelect,
    /* display: 'flex', */
    /* display: 'none', */
    color: 'transparent',
    //color: 'blue',
    /* WebkitTouchCallout: 'none !important',
    WebkitUserSelect: 'none !important',
    khtmlUserSelect: 'none !important',
    MozUserSelect: 'none !important',
    MsUserSelect: 'none !important',
    UserSelect: 'none !important' */
    '::selection': {
      /* color: 'transparent !important',
      backgroundColor: 'transparent !important',
      background: 'transparent !important', */
      // color: 'black !important',
      // background: 'black !important',
      // color: 'red !important',
      // background: 'red !important',
      /* color: 'yellow !important',
      background: 'red !important',
      backgroundColor: 'red !important', */

    }
 
  }
}

export const test3 = () => {
  return {
    /* ...noSelect, */
    display: 'flex',
    //position: 'relative',
    position: 'absolute',
    //color: 'transparent',
    //zIndex: '40000 !important',
    height: '101px',
    background: 'yellow',
    //zIndex: '100001 !important',
    zIndex: '500000',
    //background: 'transparent',
  }
}

export const test4 = () => {
  return {
    //display: 'flex',
    //position: 'absolute',
    //zIndex: 400000,
    width: '68vw',
    //height: '100px',
    color: 'green',
    //width: '90vw',
    background: 'blue !important',
    //width: 'calc(68vw - 42px)',
    //textAlign: 'start',
    //width: '100px',
    //height: '100px',
    // maxWidth: '68vw',
    // minWidth: '68vw',
    //maxWidth: '100px',
    //minWidth: '100px',
    // minWidth: '68vw',
    //minHeight: '0px',
    //maxHeight: '0px',
    //textOverflow: 'clip',
    //width: '68vw',

    // font: 'inherit',
    // //letterSpacing: 'inherit',
    // color: 'currentColor',
    // //padding: 0,
    // border: 0,
    // boxSizing: 'content-box',
    // //background: none;
    // //height: auto;
    // margin: 0,
    // '-webkit-tap-highlight-color': 'transparent',
    // display: 'block',
    // minWidth: 0,
    // width: '100%',
    // '-webkit-animation-name': 'mui-auto-fill-cancel',
    // 'animation-name': 'mui-auto-fill-cancel',
    // '-webkit-animation-duration': '10ms',
    // 'animation-duration': '10ms',
    // resize: 'none',
    // //paddingTop: 0,
    //padding: '16.5px 14px',
    //fontFamily: 'Roboto',
    //fontSize: '16px',
    // blockSize: '23px',
    // letterSpacing: '0.15008px',
    // lineHeight: '23px',
  }
}


export const input = () => {
  return {
    /* ...noSelect, */
    display: 'flex',
    position: 'relative',
    //position: 'absolute',
    //zIndex: '10000 !important',
    zIndex: '0',
    width: '68vw',
    background: 'lightblue',
    //zIndex: '-0 !important',
    /* color: 'black !important', */
    color: 'red !important',
    /* input: { color: 'red' }, */
    //userSelect: "text",
    
    userSelect: 'text',

    // label: {
    //   pointerEvents: 'auto',
    //   cursor: 'text',
    //   userSelect: "auto",
    //   color: 'red !important',
    //   //userSelect: 'text',
    //   '::selection': {
    //     // color: 'red !important',
    //     // background: 'red !important',
    //      color: 'yellow !important',
    //     background: 'red !important',
    //     //color: 'rgba(255, 255, 255, 0) !important', // PERFECT
    //     //background: 'rgba(255, 255, 255, 0) !important', // PERFECT
    //     //color: 'yellow !important',
    //     /* background: 'red !important',
    //     backgroundColor: 'red !important', */
  
    //   }
    // },
    
    input: {
      /* color: 'transparent', */
      '::selection': {
        // color: 'red !important',
        // background: 'red !important',
         //color: 'yellow !important',
         //background: 'red !important',
        //color: 'rgba(255, 255, 255, 0) !important', // PERFECT
        //background: 'rgba(255, 255, 255, 0) !important', // PERFECT
        //color: 'yellow !important',
        /* background: 'red !important',
        backgroundColor: 'red !important', */
  
      }
    }
    
/*     '::selection': {
      background: 'red !important',
      backgroundColor: 'red !important',

    } */
    //color: 'transparent', // dev

    //color: 'red', // dev
    //background: 'blue' // dev
    // fieldset: {
    //   ...noSelect,
    // }
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
