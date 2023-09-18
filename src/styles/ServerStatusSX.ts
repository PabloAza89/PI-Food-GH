import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

export const background = () => {
  return {
    ...fixed, ...flex,
    //right: '0px',
    right: '-250px',
    top: '200px',
    zIndex: 3000,
  }
}

export const eachRow = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '273px',
    //background: 'yellow', // dev
    alignItems: 'center',
    marginLeft: '7px',
  }
}

export const eachRowSmall = () => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '260px', // 280 total
    //background: 'yellow', // dev
    alignItems: 'center',
    marginLeft: '20px',
  }
}

interface circleBigI {
  online: boolean
}

export const circleBig = ({ online }: circleBigI) => {
  return {
    display: 'flex',
    //position: 'absolute',
    flexDirection: 'row',
    background: online ? 'green' : 'red', // dev
    width: '13px',
    height: '13px',
    border: '2px solid darkslategray',
    right: '0px',
    borderRadius: '50%',
  }
}

interface circleSmallI {
    red: boolean
    blue: boolean
}


export const circleSmall = ({ red, blue }: circleSmallI) => {
  return {
    display: 'flex',
    //position: 'absolute',
    flexDirection: 'row',
    //background: online ? 'green' : 'red',
    background: red ? 'red' : blue ? 'blue' : 'green',
    width: '10px',
    height: '10px',
    border: '2px solid darkslategray',
    right: '0px',
    borderRadius: '50%',
  }
}

export const button = () => {
  return {
    ...flex, ...fixed, ...noSelect,
    zIndex: 3001,
    minWidth: '30px !important',
    width: '30px !important',
    minHeight: '120px !important',
    height: '120px !important',
    color: 'darkblue',
    fontSize: '14px',
    borderRadius: '0px',
    background: 'lightblue',
    ':hover': {
      background: '#91bfcf'
    }
  }
}

export const buttonTypo = () => {
  return {
      ...flex, ...noSelect, ...aic,
    fontFamily: 'Roboto',
    //background: 'gray', // dev
    fontSize: '14px',
    fontWeight: '500',
    transform: 'rotate(270deg)',
    height: '30px',
    textWrap: 'nowrap',
  }
}

export const sliderBox = () => {
  return {
    ...flex, ...relative, ...column, ...jcc,
    //background: 'orange', // dev
    //background: 'lightgray', // dev
    background: 'cadetblue',
    //width: '280px',
    width: '310px',
    //height: '300px',
    //left: '0px',
    //right: '10px',
    right: '-200px',
  }
}