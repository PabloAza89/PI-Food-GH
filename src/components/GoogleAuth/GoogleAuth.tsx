import { useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { Box, Button } from '@mui/material/';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import * as s from "../../styles/GoogleAuthSX";

const GoogleAuth = ({ retrieveLogin, userData }: any) => {

  //console.log("userData", userData)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        retrieveLogin({email: res.email, token: codeResponse.access_token})
        return { email: res.email, token: codeResponse.access_token }
      })
      .catch(rej => console.log(rej))

    },
    onError: (error) => {console.log(error)}
  })

  useEffect(() => {
    if (userData.email !== '') {
      fetch(`http://localhost:3001/user`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          email: userData.email,
          token: userData.token
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then((res) => res.json())
      .catch(rej => console.log(rej))
    }
  },[userData.email, userData.token])
 
  const logout = () => {
    fetch(`https://oauth2.googleapis.com/revoke?token=${userData.token}`, {
      method: 'POST',
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.error !== undefined) {
          console.log("User is already log out..");
          retrieveLogin({email: "", token: ""})
          fetch(`http://localhost:3001/user`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          })
        }
        if (res.error === undefined) {
          console.log("User logout successfully")
          retrieveLogin({email: "", token: ""})
          fetch(`http://localhost:3001/user`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          })
        }
      })
      .catch(rej => console.log(rej))
  }

  return (
    <Box sx={s.background}>
      <Button variant="contained" sx={s.bgIn} onClick={() => login()} ><MySvg/>{ userData.email ? `  Signed in as ${userData.email}` : `  Sign in with Google` }</Button>
      { userData.email ?
      <Button variant="contained" sx={s.bgOut} onClick={() => logout()} >
        <Box className="fa fa-sign-out fa-lg" aria-hidden="true"></Box>
      </Button>
      : null }
    </Box>
  )
}

export default GoogleAuth;


