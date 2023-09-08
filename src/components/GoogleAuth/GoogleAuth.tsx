import { useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect, useRef } from "react";
import { Box, Button } from '@mui/material/';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import * as s from "../../styles/GoogleAuthSX";

const GoogleAuth = (props: any) => {
  const [ responseTkn, setResponseTkn ] = useState("")
  const [ user, setUser ] = useState("")

  
  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        console.log("RESPOSE", codeResponse);
        setResponseTkn(codeResponse.access_token)

        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
          method: 'GET',
          })
          .then((res) => res.json())
          .then((response) => {
            
            console.log("response", response.email)
            setUser(response.email)
            props.hCB({userEmail: response.email, userTkn: codeResponse.access_token})
          })
          .catch(rej => console.log(rej))

      },
      onError: (error) => console.log('Login Failed:', error)
    })

  const logout = () => {
    fetch(`https://oauth2.googleapis.com/revoke?token=${responseTkn}`, {
      method: 'POST',
      })
      .then((res) => res.json())
      .then((response) => {
        if (response.error !== undefined) {
          console.log("User is already log out..");
          setUser(response.email)
          setResponseTkn("")
        }
        if (response.error === undefined) {
          console.log("User logout successfully")
          setUser(response.email)
          setResponseTkn("")
        }
      })
      .catch(rej => console.log(rej))
  }

  return (
    <Box sx={s.background}>
      <Button variant="contained" sx={s.bgIn} onClick={() => login()} ><MySvg/>{ user ? `  Signed in as ${user}` : `  Sign in with Google` }</Button>
      { user ?
      <Button variant="contained" sx={s.bgOut} onClick={() => logout()} >
        <Box className="fa fa-sign-out fa-lg" aria-hidden="true"></Box>
      </Button>
      : null }
    </Box>
  )
}

export default GoogleAuth;


