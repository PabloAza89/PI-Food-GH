import css from './LandingCSS.module.css';
import { useEffect } from 'react';
import { checkPrevLogin } from '../../commons/commonsFunc';
//import './LandingPageCSS.css';
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { landingHidden } from '../../actions';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import Swal from 'sweetalert2';
import { useGoogleLogin } from '@react-oauth/google';

const LandingPage = ({ retrieveLogin, userData }: any) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let landingHiddenLS: string | null = localStorage.getItem('landingHidden'); // EN USO
  //let userGuestLS: string | null = localStorage.getItem('userGuest');

  //console.log("RSR", landHiddenLS && JSON.parse(landHiddenLS))
  //localStorage.removeItem('landHidden');

  // if (userGuestLS && JSON.parse(userGuestLS)) dispatch(landingShown(false))
  // else {
  //   if (landHiddenLS && JSON.parse(landHiddenLS)) dispatch(landingShown(false))
  // }

  // window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER 
  //   console.log("ASD", "FOCUSED")
  //   checkPrevLogin({ retrieveLogin, userData })
  // }
  
  useEffect(() => { // TEST THISS
    function landingHiddenChecker() {
      //const item = localStorage.getItem('userData')
      //if (landingHiddenLS && JSON.parse(landingHiddenLS)) dispatch(landingHidden(true))
      console.log("PASO ALGO CON EL LOCALSTORAGE")
      let landingHiddenLS: string | null = localStorage.getItem('landingHidden');
      if (landingHiddenLS && JSON.parse(landingHiddenLS)) dispatch(landingHidden(true))
      // if (item) {
      //   setUserData(item)
      // }
    }
  
    window.addEventListener('storage', landingHiddenChecker)
  
    return () => {
      window.removeEventListener('storage', landingHiddenChecker)
    }
  //}, [dispatch, landingHiddenLS])
  }, [])
  

  window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER 
    console.log("FOCUSED LANDING")
    checkPrevLogin({ retrieveLogin, userData })
    if (landingHiddenLS && JSON.parse(landingHiddenLS)) {
      dispatch(landingHidden(true))
      console.log("DISPATCHED")
    }
  }

  
  const landingHiddenState = useSelector((state: { landingHidden: boolean }) => state.landingHidden)

  if (landingHiddenLS && JSON.parse(landingHiddenLS)) dispatch(landingHidden(true))

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        //console.log("HHH", res.fd_tkn)
        console.log("HHH", res)
        fetch(`http://localhost:3001/user`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            //email: res.email,
            fd_tkn: codeResponse.access_token,
            overwrite: true
          })
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            console.log("res res res", res)
            retrieveLogin({ email: res.email, fd_tkn: res.fd_tkn })
            dispatch(landingHidden(true))
            localStorage.setItem('landingHidden', 'true')
            navigate("/")
          }

          if (res.status === 400 && res.message === `User not logged`) {
            retrieveLogin({ email: "", fd_tkn: "" })
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
        })//.then(() => localStorage.removeItem('newLogin'))
      })
      .catch(rej => { console.log(rej) })
    },
    onError: (error) => { console.log(error) },
    onNonOAuthError: () => {
      //setPopUp(false)
      //setClicked(false)
      /* localStorage.removeItem('newLogin') */
    }
  })

  return (
    <div
      style={{
        display: landingHiddenState ? 'none' : 'flex',
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
              dispatch(landingHidden(true))
              localStorage.setItem('landingHidden', 'true')
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