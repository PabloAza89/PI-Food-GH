interface backgroundI {
  scrollWidth: number,
  scrollPosition: number,
  menuShown: boolean,
}

export const backgroundSX = ({ scrollWidth, scrollPosition, menuShown }: backgroundI) => {
  return {
    marginRight: `${scrollWidth}px`,
    marginTop:
      menuShown && scrollPosition >= 209 ?
      '46px' :
      !menuShown && scrollPosition >= 109 ?
      '46px' :
      '0px',
    width: `calc(100vw - ${scrollWidth}px)`,
  }
}

// each Card:
// width 450px // 450 * 3 = 1350 // margins 18px (*3) + 6 (border) // 1410
// height 225px
// image 280px 115px