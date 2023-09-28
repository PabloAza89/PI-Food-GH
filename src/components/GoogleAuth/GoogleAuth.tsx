import { useEffect, useState, useRef } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material/';
import { easings } from '../../styles/CommonsSX';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import * as s from "../../styles/GoogleAuthSX";
import Swal from 'sweetalert2';
import $ from 'jquery';

const GoogleAuth = ({ retrieveLogin, userData }: any) => {

  easings() // Jquery easings..

  const hasScroll = useSelector((state: {hasScroll:boolean}) => state.hasScroll)
  const scrollWidth = useSelector((state: {scrollWidth:number}) => state.scrollWidth)
  const [ popUp, setPopUp ] = useState<boolean>(false)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((res) => {
        retrieveLogin({ email: res.email, fd_tkn: codeResponse.access_token })

        //return { email: res.email, fd_tkn: codeResponse.access_token }
      })
      .catch(rej => { console.log(rej) })
    },
    onError: (error) => { console.log(error) },
    onNonOAuthError: () => {
      setPopUp(false)
      setClicked(false)
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
        setClicked(false)

        $(`.buttonIn`)
          setTimeout(() => {
            $(`.buttonIn`)
            .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
          }, 2000)
          $(`.buttonIn`)
          //.stop(true, true)
          .css("animation", "none")
          .css("transition", "none")



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

  const [ shown, setShown ] = useState<boolean>(false)
  const [ buttonLoggedInHelperWidth, setButtonLoggedInHelperWidth ] = useState<number | undefined>(undefined)
  const [ buttonLoggedOutHelperWidth, setButtonLoggedOutHelperWidth ] = useState<number | undefined>(undefined)
  const [ buttonHelperWidth, setButtonHelperWidth ] = useState<number | undefined>(undefined)
  const [ clicked, setClicked ] = useState<boolean>(false)

  $(`.buttonIn`)
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
      console.log("userData.email", userData.email)
      console.log("XXXX", $(`.buttonWidthHelper`).outerWidth())
      if (userData.email) {
        console.log("SE EJECUTO ESTE 1")
        setClicked(false)
        setButtonHelperWidth($(`.buttonWidthHelper`).outerWidth())
        $(`.buttonIn`)
          .animate({ width: $(`.buttonWidthHelper`).outerWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
          setTimeout(() => {
            $(`.buttonIn`)
            .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
          }, 2000)
          $(`.buttonIn`)
          //.stop(true, true)
          .css("animation", "none")
          .css("transition", "none")
      }
      else {
        console.log("SE EJECUTO ESTE 2")
        setClicked(false)
        setButtonHelperWidth($(`.buttonWidthHelper`).outerWidth())
      }

    },[userData.email])

  if (!popUp) {
    $(`.buttonIn`)
      .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
      .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
  }

  console.log("shown shown", shown)
  console.log("clicked clicked", clicked)

  return (
    <Box sx={s.background({ hasScroll, scrollWidth })}>
      <Button className={`buttonWidthHelper`} variant="contained" sx={s.buttonWidthHelper}>
        <Box sx={s.buttonWidthHelperInner}>
          <Box><MySvg/></Box>
            {
              userData.email ?
              `  Signed in as ${userData.email}` :
              `  Sign in with Google`
            }
        </Box>
      </Button>
      <Button id={`buttonIn`} className={`buttonIn`} variant="contained" sx={s.buttonIn({ clicked })} onClick={() => { login(); setClicked(true); setPopUp(true) }} >
        
        <Box sx={s.buttonInInner}>
          <Box><MySvg/></Box>
          
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
          
        </Box>
      </Button>
      {
        userData.email ?
        <Button variant="contained" sx={s.bgOut} onClick={() => logout()}>
          <Box className="fa fa-sign-out fa-lg" aria-hidden="true"></Box>
        </Button> :
        null
      }
    </Box>
  )
}

export default GoogleAuth;


