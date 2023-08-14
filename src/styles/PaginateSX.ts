interface backgroundI {
  scrollWidth: number,
  scrollPosition: number,
  menuShown: boolean,
}

export const background = ({ scrollWidth, scrollPosition, menuShown }: backgroundI) => {
  return {
    //background: 'darkblue', // dev
    //background: menuShown && scrollPosition >= 200 ? 'darkblue' :  !menuShown && scrollPosition >= 100 ? 'darkblue' : 'relative',
    display: 'flex',
    zIndex: 1,
    //backdropFilter: 'blur(40px)',
    backdropFilter:
      menuShown && scrollPosition >= 209 ? 'blur(40px)' :
      !menuShown && scrollPosition >= 109 ? 'blur(40px)' :
      'blur(0px)',
    //zIndex: 100000,
    position:
      menuShown && scrollPosition >= 209 ? 'fixed' :
      !menuShown && scrollPosition >= 109 ? 'fixed' :
      'relative',
    //zIndex: 2000,
    marginTop:
      menuShown && scrollPosition >= 209 ? '0px' :
      !menuShown && scrollPosition >= 109 ? '0px' :
      '9px',
    //position: 'relative',
    justifyContent: 'center',
    padding: '8px 0px',
    //padding: '8px 0px 0px 0px',
    width: `calc(100vw - ${scrollWidth}px)`,
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
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    //background: 'rgba(230, 46, 175, 0.363)'
  }
}