export const background = () => {
  return {
    display: 'flex',
    justifyContent: 'center',
    background: 'gray',
    flexWrap: 'wrap',
    width: '100vw',
    height: '90vh',
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