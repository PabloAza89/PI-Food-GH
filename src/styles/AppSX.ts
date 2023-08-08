import bgImage from '../images/bgImage.webp';

export const background = () => {
  return {
    display: 'flex',
    //margin: 0,
    position: 'relative',
    flexDirection : 'column',
    //width: 'calc(100vw - 17px)',
    width: '100vw',
    height: '0vh',
    //height: '100vh',
    //height: '100vh',
    
  }
}

export const wallpaperBody = () => {
  return {
    display: 'flex',
    //display: 'none',
    position: 'fixed',
    //flexDirection : 'column',
    //justifyContent: 'center',
    //background: 'gray', // dev
    zIndex: -1,
    ////flexWrap: 'wrap',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    //filter: 'grayscale(0%)',
  }
}




