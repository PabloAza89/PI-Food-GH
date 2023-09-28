import { useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { Box, Button } from '@mui/material/';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import * as s from "../../styles/GoogleAuthSX";
import Swal from 'sweetalert2';

const GoogleAuth = ({ retrieveLogin, userData }: any) => {

  //console.log("userData", userData)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        retrieveLogin({ email: res.email, fd_tkn: codeResponse.access_token })
        return { email: res.email, fd_tkn: codeResponse.access_token }
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
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          email: userData.email,
          fd_tkn: userData.fd_tkn
        })
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("RES APP", res)
        if (res.status === 400 && res.message === `Invalid Credentials`) {
          retrieveLogin({ email: "", fd_tkn: "" })
          Swal.fire({
            title: `There was an error when cheking your loggin.. `,
            text: `Please, log in again.`,
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
        }
      })
      .catch(rej => console.log(rej))
    }
  },[userData.email, userData.fd_tkn])
 
  const logout = () => {
    fetch(`https://oauth2.googleapis.com/revoke?token=${userData.fd_tkn}`, {
      method: 'POST',
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.error !== undefined) {
          console.log("User is already log out..");
          retrieveLogin({email: "", fd_tkn: ""})
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
          retrieveLogin({email: "", fd_tkn: ""})
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


