export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //width: '25vw',
    //height: '25.5vh',
    width: '300px',
    height: '300px',
    marginTop: '0vh',
    marginLeft: '2vh',
    marginBottom: '2vh',
    backgroundColor: 'rgba(196, 34, 147, 0.253)',
    /* backgroundColor: 'red', */
  }
}

export const image = () => {
  return {
    display: 'flex',
    height: '13vh',
    width: '15vw',
    marginTop: '1vh',
  }
}


export const title = () => {
  return {
    fontSize: 'larger',
    textDecoration: 'none',
  }
}

export const text = () => {
  return {
    width: '23vw',
    height: '2.8vh',
    /* outline: 1px solid #000; */
    /* margin: 0 0 2em 0; */
    margin: '0 0 0 0',
    color: 'antiquewhite',
    textAlign: 'center',
    fontSize: 'medium',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '0px !important',
  }
}

