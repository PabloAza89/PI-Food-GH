import css from './LandingCSS.module.css';
import { useEffect } from 'react';
//import './LandingPageCSS.css';
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { landingShown } from '../../actions';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import Swal from 'sweetalert2';
import { useGoogleLogin } from '@react-oauth/google';

const LandingPage = ({ retrieveLogin, userData }: any) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let landHiddenLS: string | null = localStorage.getItem('landHidden');
  //let userGuestLS: string | null = localStorage.getItem('userGuest');

  console.log("RSR", landHiddenLS && JSON.parse(landHiddenLS))
  //localStorage.removeItem('landHidden');

  // if (userGuestLS && JSON.parse(userGuestLS)) dispatch(landingShown(false))
  // else {
  //   if (landHiddenLS && JSON.parse(landHiddenLS)) dispatch(landingShown(false))
  // }
  

  if (landHiddenLS && JSON.parse(landHiddenLS)) dispatch(landingShown(false))

  //else dispatch(landingShown(true))

  
  const landingShownState = useSelector((state: { landingShown: boolean }) => state.landingShown)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        retrieveLogin({ email: res.email, fd_tkn: codeResponse.access_token });
        dispatch(landingShown(false))
        localStorage.setItem('landHidden', 'true')
        navigate("/")
      })
      .catch(rej => { console.log(rej) })
    },
    onError: (error) => { console.log(error) },
    onNonOAuthError: () => {
      // setPopUp(false)
      // setClicked(false)
    }
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
        console.log("RES RES RES", res)

        if (res.status === 200) {
          dispatch(landingShown(false))
        }

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

  return (
    <div
      style={{
        display: landingShownState ? 'flex' : 'none',
      }}
      className={css.background}
    >
      <div className={css.bgImage}></div>
      <div className={css.buttonsAndText}>
        <h1 className={css.text}>Welcome to Foodify !</h1>
        <div className={css.divider} />
        <div className={css.buttons}>
          <Button
            className={css.button}
            onClick={() => { login() }}
          >
            <div className={css.buttonInner}>
              <div><MySvg/></div>  LOGIN WITH GOOGLE
            </div>
          </Button>
          <Button
            className={css.button}
            onClick={() => {
              dispatch(landingShown(false))
              localStorage.setItem('landHidden', 'true')
              navigate("/")
              //localStorage.setItem('userGuest', 'true')
            }}
          >LOGIN AS GUEST</Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;