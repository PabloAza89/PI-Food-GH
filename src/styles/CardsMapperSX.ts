interface backgroundI {
  scrollWidth: number,
  scrollPosition: number,
  menuShown: boolean,
}

export const background = ({ scrollWidth, scrollPosition, menuShown }: backgroundI) => {
  return {
    zIndex: -1,
    marginRight: `${scrollWidth}px`,
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    //zIndex: 1001,
    background: 'lightblue', // dev
    flexWrap: 'wrap',
    //marginTop: '37px',
    //marginTop: scrollPosition >= 100 ? '37px' : '0px',

    marginTop: menuShown && scrollPosition >= 200 ? '37px' : !menuShown && scrollPosition >= 100 ? '37px' : '0px',



    //width: 'calc(100vw - 50px)',
    //maxWidth: '1410px', // 1356 // 452 * 3
    //maxWidth: '1356px', // 1356 // 452 * 3
    //width: '100vw',
    width: `calc(100vw - ${scrollWidth}px)`,
    //height: '500px',
    
    //minWidth: '1410px',
    //margin: 0,
    
    alignSelf: 'center',
    //justifyContent: 'space-around',
  }
}

// each Card:
// width 450px // 450 * 3 = 1350 // margins 18px (*3) + 6 (border) // 1410
// height 225px
// image 280px 115px

export const notFound = () => {
  return {
    //background: 'gray', // dev
    background: 'rgba(138, 179, 179, 0.171)',
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
    marginTop: '16px',
  }
}