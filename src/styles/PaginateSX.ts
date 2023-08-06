interface backgroundI {
  scrollWidth: number,
  scrollPosition: number,
  menuShown: boolean,
}

export const background = ({ scrollWidth, scrollPosition, menuShown }: backgroundI) => {
  return {
    display: 'flex',
    //position: 'relative',
    //top: '0px',
    //top: '100px',
    //position: scrollPosition >= 100 ? 'fixed' : 'relative',
    position: menuShown && scrollPosition >= 200 ? 'fixed' :  !menuShown && scrollPosition >= 100 ? 'fixed' : 'relative',
    //position: 'fixed',
    //zIndex: 1500,
    justifyContent: 'center',
    padding: '8px 0px',
    width: `calc(100vw - ${scrollWidth}px)`,
    background: 'darkblue', // dev
  }
}

export const eachButton = () => {
  return {
    display: 'flex',
    paddingTop: '8.49px !important',
    color: 'black',
    minWidth: '30px !important',
    width: '30px !important',
    height: '21px !important',
    //justifyContent: 'center',
    borderRadius: '0px',
    border: '1px solid black',
    //background: 'rgba(230, 46, 175, 0.363)'
  }
}