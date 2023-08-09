import {
  column, flex, mix, jcsb, jcc,
  aic, noSelect, relative
} from '../styles/CommonsSX';

interface backgroundI {
  minPort: boolean,
  minLand: boolean,
}

export const background = ({ minPort, minLand }: backgroundI) => {
  return {
    ...flex, ...jcsb,
    position: 'fixed',
    //background: 'darkorange', //dev
    height: '100vh',
    width: '100vw',
    minHeight: minPort || minLand ? 'none' : '530px',
    zIndex: -1
  }
}

interface leftRightHelperI {
  minPort: boolean,
  minLand: boolean,
}

export const leftRightHelper = ({ minPort, minLand }: leftRightHelperI) => {
  return {
    ...flex,
    //background: 'blue',
    minWidth: minPort || minLand ? 'none' : '30px',
  }
}

interface mainContainerI {
  minPort: boolean,
  minLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const mainContainer = ({ minPort, minLand, medPort, medLand }: mainContainerI) => {
  return {
    ...flex, ...relative, ...column, ...aic, ...jcc,
    //background: 'red',
    width: minPort ? '90vw' : minLand ? '40vw' : medPort || medLand ? '430px' : '500px',
  }
}

interface errorGifI {
  loaded: boolean,
  minPort: boolean,
  minLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const errorGif = ({ loaded, minPort, minLand, medPort, medLand }: errorGifI) => {
  return {
    ...relative, ...noSelect, ...flex,
    visibility: loaded ? 'visible' : 'hidden',
    width: minPort ? '65vw' : minLand ? '50vh' : medPort || medLand ? '300px' : '400px',
    height: minPort ? '65vw' : minLand ? '50vh' : medPort || medLand ? '300px' : '400px',
  }
}

interface placeholderI {
  loaded: boolean,
  minPort: boolean,
  minLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const placeholderAnimation = ({ loaded, minPort, minLand, medPort, medLand }: placeholderI) => {
  return {
    ...noSelect, ...relative,
    display: loaded ? 'none' : 'flex',
    marginTop: minPort ? '-65vw' : minLand ? '-50vh' : medPort || medLand ? '-300px' : '-400px',
    width: minPort ? '65vw' : minLand ? '50vh' : medPort || medLand ? '300px' : '400px',
    height: minPort ? '65vw' : minLand ? '50vh' : medPort || medLand ? '300px' : '400px',
    zIndex: 1001,
    animation: `error .8s linear infinite`,
    animationTimingFunction: 'steps(12, end)',
    '@keyframes error': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    }
  }
}

interface messageI {
  minPort: boolean,
  minLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const message = ({ minPort, minLand, medPort, medLand }: messageI) => {
  return {
    ...flex, ...relative, ...noSelect, /* ...mix, */
    //color: 'limegreen',
    color: 'antiquewhite',
    textShadow: '0px 0px 10px black',
    fontSize: minPort ? '7vw' : minLand ? '5.5vh' : medPort || medLand ? '31px' : '35px',
  }
}