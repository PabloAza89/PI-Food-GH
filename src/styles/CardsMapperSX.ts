export const background = () => {
  return {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    background: 'lightblue', // dev
    flexWrap: 'wrap',
    //maxWidth: '1250px',
    maxWidth: '1300px',
    width: '100vw',
    //minHeight: '900px !important',
    //minHeight: '800px',
    //height: '100vh',
    //height: '90vh',
    alignSelf: 'center',
  }
}

export const notFound = () => {
  return {
    backgroundColor: 'rgba(138, 179, 179, 0.171)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '30vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(240, 248, 255, 0.726)',
    fontSize: '10vh',  
    marginTop: '5vh',
    marginBottom: '20vh',
  }
}