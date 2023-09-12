import { useGoogleLogin } from '@react-oauth/google';
import { Box, Button } from '@mui/material/';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import * as s from "../../styles/GoogleAuthSX";

const GoogleAuth = ({ retrieveLogin, userData }: any) => {

  console.log("userData", userData)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      //console.log("RESPOSE", codeResponse);

      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        //console.log("response", res.email)
        retrieveLogin({email: res.email, token: codeResponse.access_token})
        return { email: res.email, token: codeResponse.access_token }
      })
      .then((res) => {
        console.log("A VER ESTE", res)
        fetch(`http://localhost:3001/user`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            email: res.email,
            token: res.token
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          }
        })
      })
      .catch(rej => console.log(rej))

    },
    onError: (error) => console.log('Login Failed:', error)
  })

  const logout = () => {
    fetch(`https://oauth2.googleapis.com/revoke?token=${userData.token}`, {
      method: 'POST',
      })
      .then((res) => res.json())
      .then((response) => {
        if (response.error !== undefined) {
          console.log("User is already log out..");
          retrieveLogin({email: "", token: ""})
        }
        if (response.error === undefined) {
          console.log("User logout successfully")
          retrieveLogin({email: "", token: ""})
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

