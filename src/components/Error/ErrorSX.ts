import {
  column, flex, mix, jcsb, jcc,
  aic, noSelect, relative
} from '../../styles/CommonsSX';

interface errorGifI {
  loaded: boolean,
  smaPort: boolean,
  smaLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const errorGif = ({ loaded, smaPort, smaLand, medPort, medLand }: errorGifI) => {
  return {
    ...relative, ...noSelect, ...flex,
    visibility: loaded ? 'visible' : 'hidden',
    width: smaPort ? '65vw' : smaLand ? '50vh' : medPort || medLand ? '300px' : '400px',
    height: smaPort ? '65vw' : smaLand ? '50vh' : medPort || medLand ? '300px' : '400px',
  }
}

interface placeholderI {
  loaded: boolean,
  smaPort: boolean,
  smaLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const placeholderAnimation = ({ loaded, smaPort, smaLand, medPort, medLand }: placeholderI) => {
  return {
    ...noSelect, ...relative,
    display: loaded ? 'none' : 'flex',
    marginTop: smaPort ? '-65vw' : smaLand ? '-50vh' : medPort || medLand ? '-300px' : '-400px',
    width: smaPort ? '65vw' : smaLand ? '50vh' : medPort || medLand ? '300px' : '400px',
    height: smaPort ? '65vw' : smaLand ? '50vh' : medPort || medLand ? '300px' : '400px',
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
  smaPort: boolean,
  smaLand: boolean,
  medPort: boolean,
  medLand: boolean,
}

export const message = ({ smaPort, smaLand, medPort, medLand }: messageI) => {
  return {
    ...flex, ...relative, ...noSelect, /* ...mix, */
    //color: 'limegreen',
    color: 'antiquewhite',
    textShadow: '0px 0px 10px black',
    fontSize: smaPort ? '7vw' : smaLand ? '5.5vh' : medPort || medLand ? '31px' : '35px',
  }
}