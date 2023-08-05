export const background = () => {
  return {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    zIndex: 1001,
    //background: 'lightblue', // dev
    flexWrap: 'wrap',
    maxWidth: '1410px',
    width: '100vw',
    alignSelf: 'center',
  }
}

// each Card:
// width 450px // 450 * 3 = 1350 // margins 18px (*3) + 6 (border) // 1410
// height 225px
// image 280px 115px

export const notFound = () => {
  return {
    backgroundColor: 'rgba(138, 179, 179, 0.171)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '925px',
    width: '100vw',
    //height: '30vh',
    height: '260px',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(240, 248, 255, 0.726)',
    //fontSize: '10vh',
    fontSize: '87px',
    textWrap: 'nowrap',
  }
}