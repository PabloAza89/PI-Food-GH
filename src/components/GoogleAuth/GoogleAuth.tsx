import { useEffect, useState } from "react";
import css from './GoogleAuthCSS.module.css';
import { useMatch } from "react-router-dom";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import { checkPrevLogin } from '../../commons/commonsFunc';
import { landingHidden } from '../../actions';
import Swal from 'sweetalert2';
import $ from 'jquery';

const GoogleAuth = ({ paginateAmount, setUserData, userData }: any) => {

  const dispatch = useDispatch()
  easings() // JQuery easings..

  const inHome = useMatch("/")?.pattern.path === "/" ? true : false; // "/" === Home
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)

  const getCurrentWidth = () => {
    return $(`#backgroundGoogleAuth`).outerWidth()! - 108 > $(`#buttonWidthHelper`).outerWidth()! ?
      $(`#buttonWidthHelper`).outerWidth()! :
      $(`#backgroundGoogleAuth`).outerWidth()! - 108
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        fetch(`${process.env.REACT_APP_SV}/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({
            fd_tkn: codeResponse.access_token,
            overwrite: true
          })
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setUserData({ email: res.email, fd_tkn: res.fd_tkn })
            dispatch(landingHidden(true))
            localStorage.setItem('landingHidden', 'true')

            $(`#buttonIn`)
              .css("pointer-events", "none")
            $(`#buttonGL`)
              .html(
                paginateAmount === 45 ?
                `  ${res.email}` :
                `  Signed in as ${res.email}`
              )

            $(`#buttonIn`)
              .animate({ width: getCurrentWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
            setTimeout(() => {
              $(`#buttonIn`)
              .stop()
              .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
              setClicked(false)
              $(`#buttonIn`) // ENABLES CLICK/HOVER EVENT
                .css("pointer-events", "auto")
            }, 2000)
          }

          if (res.status === 400 && res.message === `User not logged`) {
            setUserData({ email: "", fd_tkn: "" })
          }
          if (res.status === 400 && res.message === `Invalid Credentials`) {
            setUserData({ email: "", fd_tkn: "" })
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
        .catch(rej => {
          $(`#buttonIn`)
            .stop() // RETURN TO SMALL WIDTH
            .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
          if (rej.message === `Failed to fetch`) {
            Swal.fire({
              title: `It looks like server it's sleeping..`,
              html: `Please, try again later.<br>We are sorry.`,
              icon: 'info',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 4000,
            })
          } else {
            console.log(rej)
            Swal.fire({
              title: `There was some error.. `,
              text: `Please try again.`,
              icon: 'info',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 3000,
            })
          }
        })
      })
      .catch(rej => { console.log(rej) })
    },
    onError: (error) => { console.log(error) },
    onNonOAuthError: () => {
      $(`#buttonIn`) // ENABLES CLICK/HOVER EVENT
        .css("pointer-events", "auto")
      $(`#buttonIn`) // WHEN POP-UP IS CLOSED RETURN TO SMALL WIDTH
        .stop()
        .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
      setClicked(false)
    }
  })

  const logout = () => {
    googleLogout()
    fetch(`https://oauth2.googleapis.com/revoke?token=${userData.fd_tkn}`, {
      method: 'POST'
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.error !== undefined) { // USER HAS ALREADY LOGOUT..
        setUserData({email: "", fd_tkn: ""})
        fetch(`${process.env.REACT_APP_SV}/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
      }
      if (res.error === undefined) { // USER LOGOUT SUCCESSFULLY
        setUserData({email: "", fd_tkn: ""})
        fetch(`${process.env.REACT_APP_SV}/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
      }
      $(`#buttonIn`).each(function() { // THEN RETURN TO SMALL WIDTH
        if ($(this).innerWidth() === 64)  $(this).css("width", "64px")
        else  $(this).animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
      })
      setClicked(false)
    })
    .catch(rej => console.log(rej))
  }

  const [ clicked, setClicked ] = useState<boolean>(false)

  const widthHandler = () => {
    $(`#buttonIn`)
      .on("mouseenter click", function() {
        if (clicked) $(this).stop()
        else {
          $(this)
            .animate({ width: getCurrentWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
          $(`#buttonGL`)
            .html(
              userData.email ?
              `  Signed in as ${userData.email}` :
              `  Sign in with Google`
            )
        }
      })
    .on("mouseleave", function() {
      if (clicked) {
        $(this)
          .stop()
          .animate({ width: getCurrentWidth() }, { queue: false, easing: 'easeOutCubic', duration: 1000 })
      }
      else {
        $(this)
          .stop()
          .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
      }
    })
  }

  useEffect(() => { // FIRST CHECK
    if ($(`#buttonIn`).innerWidth() === 64) {
      userData.email ?
      $(`#buttonGL`).html(` ✔️`) :
      $(`#buttonGL`).html(` ❌`)
    }
    widthHandler()
    // eslint-disable-next-line
  },[userData.email])

  useEffect(() => { // FIRED ONLY WHEN TAB IS FOCUSED, CHECK VALID USER
    const onFocusGoogle = () => {
      checkPrevLogin({ setUserData, userData })
    }
    window.addEventListener("focus", onFocusGoogle);
    return () => window.removeEventListener("focus", onFocusGoogle);
  })

  widthHandler()

  useEffect(() => {
    let buttonIn = document.getElementById('buttonIn')
    buttonIn && new ResizeObserver(outputsize).observe(buttonIn)
    function outputsize() {
      if ($(`#buttonIn`).innerWidth() === 64) {
        userData.email ?
        $(`#buttonGL`).html(` ✔️`) :
        $(`#buttonGL`).html(` ❌`)
      }
    }
  })

  return (
    <div
      className={css.background}
      id={`backgroundGoogleAuth`}
      style={{
        position: inHome ? 'absolute' : 'fixed',
        visibility: menuShown ? 'visible' : 'hidden'
      }}
    >
      <Button variant="contained" id={`buttonWidthHelper`} className={css.buttonWidthHelper} sx={{ display: 'none' }}>
        <div className={css.buttonWidthHelperInner}>
          <div><MySvg/></div>
            {
              userData.email && paginateAmount === 45 ?
              `  ${userData.email}` :
              userData.email && paginateAmount === 90 ?
              `  Signed in as ${userData.email}` :
              `  Sign in with Google`
            }
        </div>
      </Button>
      <div>
        <Button
          variant="contained"
          id={`buttonIn`}
          className={css.buttonIn}
          onClick={() => { if (!clicked) {
            setClicked(true);
            paginateAmount === 45 ?
            setTimeout(() => login(), 1000) :
            login()
            $(`#buttonIn`)
              .css("pointer-events", "none")
          } }}
        >
          <div className={css.buttonInInner}>
            <div><MySvg/></div>
            <div id={`buttonGL`}>
            </div>
          </div>
        </Button>
      </div>
      {
        userData.email ?
        <Button variant="contained" className={css.bgOut} onClick={() => logout()}>
          <div className="fa fa-sign-out fa-lg" aria-hidden="true"></div>
        </Button> :
        null
      }
    </div>
  )
}

export default GoogleAuth;