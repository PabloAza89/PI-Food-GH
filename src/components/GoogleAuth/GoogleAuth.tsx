import { useEffect, useState, useRef } from "react";
import css from './GoogleAuthCSS.module.css';
import { useMatch } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("HHH", res)
        fetch(`http://localhost:3001/user`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            fd_tkn: codeResponse.access_token,
            overwrite: true
          })
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            console.log("res res res", res)
            setUserData({ email: res.email, fd_tkn: res.fd_tkn })
            dispatch(landingHidden(true))
            localStorage.setItem('landingHidden', 'true')

            // //$(`#buttonGL`)
            //   //.html(`  Signed in as ${res.email}`)
            //   //.html(`  Signed in as ${userData.email}`)
            //  $(`#buttonIn`)
            //    .off()
            //   //.unbind('mouseenter mouseleave')

            // setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
            // $(`#buttonIn`) // WHEN NEW USER IS LOGGED (OVERWRITE), WIDTH GO SMALL
            //   .stop()
            //   .animate({ width: $(`#buttonWidthHelper`).outerWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
            //   //.animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
            //   setTimeout(() => {
            //     $(`#buttonIn`)
            //     .stop()
            //     .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
            //     setClicked(false)
            //   }, 2000)
            //   setTimeout(() => {
            //     setShown(false)
            //   }, 3000)

             $(`#buttonIn`)
               .off() // DISABLES HOVER

            $(`#buttonGL`)
            //.html(`  Signed in as ${userData.email}`)
            .html(`  Signed in as ${res.email}`)
            // .html(
            //   userData.email ?
            //   `  Signed in as ${userData.email}` :
            //   `  Sign in with Google`
            // )

          $(`#buttonIn`) // NECESSARY FOR ANIMATION WORKS PROPERLY
            //.stop() // NECESSARY FOR ANIMATION WORKS PROPERLY // OJO
            .animate({ width: $(`#buttonWidthHelper`).outerWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
            //.animate({ width: 300 }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
            // UP HERE GOOD

              setTimeout(() => {
                $(`#buttonIn`)
                .stop()
                .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
                setClicked(false)
              }, 2000)
             /*  setTimeout(() => {
                setShown(false)
              }, 3000) */


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
      $(`#buttonIn`) // WHEN POP-UP IS CLOSED RETURN TO SMALL WIDTH
        .stop()
        .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
      setClicked(false)
    }
  })

  const logout = () => {
    fetch(`https://oauth2.googleapis.com/revoke?token=${userData.fd_tkn}`, {
      method: 'POST'
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.error !== undefined) { // USER HAS ALREADY LOGOUT..
        setUserData({email: "", fd_tkn: ""})
        fetch(`http://localhost:3001/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
      }
      if (res.error === undefined) { // USER LOGOUT SUCCESSFULLY
        setUserData({email: "", fd_tkn: ""})
        fetch(`http://localhost:3001/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
      }
    })
    .catch(rej => console.log(rej))
  }

  const [ shown, setShown ] = useState<boolean>(false)
  const [ buttonHelperWidth, setButtonHelperWidth ] = useState<number | undefined>(undefined)
  const [ clicked, setClicked ] = useState<boolean>(false)

   useEffect(() => { // FIRST AUTO WIDTH CHECKER //
      console.log("SE EJECUTO SE EJECUTO")
      //console.log("SE EJECUTO SE EJECUTO", $(`#buttonIn`).innerWidth())

      $(`#buttonIn`)
        .css("width", "64px")
      
      setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())

    //  if ($(`#buttonIn`).innerWidth() === 64) {
    //     userData.email ?
    //     $(`#buttonGL`).html(` ✔️`) :
    //     $(`#buttonGL`).html(` ❌`)
    //   }
        

     //setButtonHelperWidth(310)
   },[userData.email]) // HELPS WITH NEW WIDTH WHEN USER CHANGES

   window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER
    //checkPrevLogin({ setUserData, userData })
    console.log("FOCUSED FOCUSED APP")
    console.log("FOCUSED FOCUSED USER DATA", userData.email)
    //console.log("FOCUSED FOCUSED APP", $(`#buttonIn`).outerWidth())
    //console.log("FOCUSED FOCUSED APP", $(`#buttonIn`).width())
    console.log("FOCUSED FOCUSED APP", $(`#buttonIn`).innerWidth())

    checkPrevLogin({ setUserData, userData })

    if ($(`#buttonIn`).innerWidth() === 64) {
      userData.email ?
      $(`#buttonGL`).html(` ✔️`) :
      $(`#buttonGL`).html(` ❌`)
    }
  }

  $(`#buttonIn`)
    .on( "mouseenter", function() {
      if (clicked) $(this).stop()
      else {
        //setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
        //setButtonHelperWidth(400)
        //setShown(true) // setShown CAUSING TROUBLES
        $(this) // NECESSARY FOR ANIMATION WORKS PROPERLY
          //.stop() // NECESSARY FOR ANIMATION WORKS PROPERLY // OJO
          .animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
          //.animate({ width: 300 }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
        $(`#buttonGL`)
          .html(
            userData.email ?
            `  Signed in as ${userData.email}` :
            `  Sign in with Google`
          )
      }
    })
    .on( "click", function() {
      $(this) // NECESSARY FOR ANIMATION WORKS PROPERLY
        .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
        .animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
      setShown(true)
    })
    .on("mouseleave", function() {
      if (clicked) {
        $(this)
          .stop()
          .animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutCubic', duration: 1000 })
      }
      else {
        $(this) // NECESSARY FOR ANIMATION WORKS PROPERLY
          .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
          .animate({ width: '64px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
        setTimeout(() => {
          //if ($(`#buttonIn`).innerWidth() === 64) $(`#buttonGL`).html(` ❌`)
        }, 1000)
        
      }
    })

  // function outputsize() { 
  //   if ($(`#buttonIn`).innerWidth() === 64) {
  //     setShown(false)
  //   }
  // }
  // let buttonIn = document.getElementById('buttonIn')
  // buttonIn && new ResizeObserver(outputsize).observe(buttonIn)

  function outputsize() { 
    if ($(`#buttonIn`).innerWidth() === 64) {
      //setShown(false)
      userData.email ?
      $(`#buttonGL`).html(` ✔️`) :
      $(`#buttonGL`).html(` ❌`)
    }
  }
  let buttonIn = document.getElementById('buttonIn')
  buttonIn && new ResizeObserver(outputsize).observe(buttonIn)

  return (
    <div
      className={css.background}
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
      <Button
        variant="contained"
        id={`buttonIn`}
        className={css.buttonIn}
        onClick={() => { login(); setClicked(true) }}
      >
        <div className={css.buttonInInner}>
          <div><MySvg/></div>
          <div id={`buttonGL`} className={css.test}>
            {
              // userData.email && shown && paginateAmount === 45 ?
              // `  ${userData.email}` :
              // userData.email && shown && paginateAmount === 90 ?
              // `  Signed in as ${userData.email}` :
              // userData.email && !shown ?
              // ` ✔️` :
              // !userData.email && shown ?
              // `  Sign in with Google` :
              // ` ❌`
            }
          </div>
        </div>
      </Button>
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


