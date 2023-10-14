import { useEffect, useState, useRef } from "react";
import css from './GoogleAuthCSS.module.css';
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import { landingHidden } from '../../actions';
import Swal from 'sweetalert2';
import $ from 'jquery';

const GoogleAuth = ({ retrieveLogin, userData }: any) => {

  const dispatch = useDispatch()
  easings() // Jquery easings..

  const hasScroll = useSelector((state: {hasScroll:boolean}) => state.hasScroll)
  const scrollWidth = useSelector((state: {scrollWidth:number}) => state.scrollWidth)
  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)
  const [ popUp, setPopUp ] = useState<boolean>(false)

  //const showHelpBG = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  //const aa = useMatch("/")?.params.route?.toLowerCase()
  //const inHome = useMatch("/")?.pattern.path // "/" === Home
  const inHome = useMatch("/")?.pattern.path === "/" ? true : false;// "/" === Home
  //const aa = useLocation()

  //console.log("HHH", aa )
  //console.log("HHH aa", inHome )

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
    onError: (error) => { console.log(error); /* localStorage.removeItem('newLogin') */ },
    onNonOAuthError: () => {
      setPopUp(false)
      setClicked(false)
      /* localStorage.removeItem('newLogin') */
    }
  })

  const logout = () => {
    fetch(`https://oauth2.googleapis.com/revoke?token=${userData.fd_tkn}`, {
      method: 'POST'
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.error !== undefined) { // USER HAS ALREADY LOGOUT..
        retrieveLogin({email: "", fd_tkn: ""})
        //localStorage.removeItem('landingHidden')
        fetch(`http://localhost:3001/user`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
      }
      if (res.error === undefined) { // USER LOGOUT SUCCESSFULLY
        retrieveLogin({email: "", fd_tkn: ""})
        //localStorage.removeItem('landingHidden')
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

  $(`#buttonIn`)
    .on( "mouseenter", function() {
      if (clicked) {
        $(this)
          .stop()
      }
      else {
        setShown(true)
        $(this) // NECESSARY FOR ANIMATION WORKS PROPERLY
          .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
          .animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
      }
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
          .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
      }
    })

    useEffect(() => {
      if (userData.email !== '' || userData.email !== undefined) {
        setClicked(false)
        setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
        $(`#buttonIn`)
          .animate({ width: $(`#buttonWidthHelper`).outerWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
          setTimeout(() => {
            $(`#buttonIn`)
            .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
          }, 2000)
          $(`#buttonIn`)
          .css("animation", "none")
          .css("transition", "none")
      }
      //else {
        //setClicked(false)
        //setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
      //}
    },[userData.email])
    //},[])

  if (!popUp) {
    $(`#buttonIn`)
      .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
      .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
  }

  return (
    <div
      className={css.background}
      style={{
        position: inHome ? 'absolute' : 'fixed', // inHome
        //marginRight: hasScroll ? `${87 + scrollWidth}px` : `16px` // 16 + 55 + 16 = 87
        //currentWidth <= 800 ? `100vw` : '200px'
        marginRight:
          currentWidth <= 800 && inHome && hasScroll ?
          `${87 + scrollWidth}px` :
          //`${87 + scrollWidth}px` :
          currentWidth <= 800 && inHome ?
          `87px` :
          inHome && hasScroll ?
          `${16 + scrollWidth}px` : 
          '16px'
          //hasScroll ?
          //`${16 + scrollWidth}px` :
          //`16px` :
          //'16px' // 16 + 55 + 16 = 87
      }}
    >
      <Button variant="contained" id={`buttonWidthHelper`} className={css.buttonWidthHelper} sx={{ display: 'none' }}>
        <div className={css.buttonWidthHelperInner}>
          <div><MySvg/></div>
            {
              userData.email ?
              `  Signed in as ${userData.email}` :
              `  Sign in with Google`
            }
        </div>
      </Button>
      <Button
        variant="contained"
        id={`buttonIn`}
        className={css.buttonIn}
        onClick={() => {
          login(); setClicked(true); setPopUp(true); /* localStorage.setItem('newLogin', 'true') */
        }}
      >
        <div className={css.buttonInInner}>
          <div><MySvg/></div>
          {
            userData.email && shown ?
            `  Signed in as ${userData.email}` :
            userData.email && !shown ?
            //`  Signed in as ${userData.email}` :
            ` ✔️` :
            //`  ` :
            !userData.email && shown ?
            `  Sign in with Google` :
            ` ❌`
            
          }
          
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


