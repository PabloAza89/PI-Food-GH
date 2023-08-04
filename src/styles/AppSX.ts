import bgImage from '../images/bgImage.webp';

export const background = () => {
  return {
    display: 'flex',
    flexDirection : 'column',
    //justifyContent: 'center',
    //background: 'gray', // dev
    ////flexWrap: 'wrap',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    //filter: 'grayscale(0%)',
  }
}

