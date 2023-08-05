export const background = () => {
  return {
    backgroundColor: 'rgba(148, 179, 138, 0.171)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(240, 248, 255, 0.726)',
    fontSize: '4vh',
    textDecoration: 'none',

  }
}

export const text = () => {
  return {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: '34px',
    fontWeight: '400px',
    color: 'antiquewhite'
  }
}

export const button = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    color: 'antiquewhite',
    width: '130px',
    //color: 'red',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontWeight: 650,
    fontSize: '15px',
    background: '#41b1b1',
    //border: '1px solid black',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    ':hover': { background: '#859e7d' }
    //background: 'gray', // dev
    //width: '55vw',
    //padding: '18px',
    //alignItems: 'center',
    //alignSelf: 'center',

  }
}
