import { useEffect, useState, useRef } from "react";
import css from './GoogleAuthCSS.module.css';
import { useMatch } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import { landingHidden } from '../../actions';
import Swal from 'sweetalert2';
import $ from 'jquery';

const GoogleAuth = ({ paginateAmount, setUserData, userData }: any) => {

  const dispatch = useDispatch()
  easings() // Jquery easings..

  const [ popUp, setPopUp ] = useState<boolean>(false)
  const inHome = useMatch("/")?.pattern.path === "/" ? true : false;// "/" === Home
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

            // $(`#buttonIn`) // WHEN POP-UP IS CLOSED, WIDTH GO SMALL
            //   .stop()
            //   .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000  })
            setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
            $(`#buttonIn`)
              .animate({ width: $(`#buttonWidthHelper`).outerWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
              setTimeout(() => {
                $(`#buttonIn`)
                .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 /* , complete: () => setShown(false) */ })
                setShown(false)
                setClicked(false)
              }, 2000)
              // $(`#buttonIn`)
              // .css("animation", "none")
              // .css("transition", "none")
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
            .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => {
              // if ($(`#buttonIn`).innerWidth() === 64) {
              //   setShown(false)
              // }
              
            } })
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
      $(`#buttonIn`) // WHEN POP-UP IS CLOSED, WIDTH GO SMALL
        .stop()
        .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000  })
      setPopUp(false)
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

   useEffect(() => { // FIRST AUTO WIDTH CHECKER
     setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
   })

  //  const funcc = () => {
  //   setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
  //  }
   
  //  funcc()
  
  //setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())

  $(`#buttonIn`)
    .on( "mouseenter", function() {
      
      if (clicked) {
        $(this)
          .stop()
      }
      else {
        setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
        setShown(true)
        $(this) // NECESSARY FOR ANIMATION WORKS PROPERLY
          //.stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
          .animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
          
      }
    })
    .on( "click", function() {
      // if (clicked) {
      //   $(this)
      //     .stop()
      // }
      // else {
        
        $(this) // NECESSARY FOR ANIMATION WORKS PROPERLY
          .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
          .animate({ width: buttonHelperWidth }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
        setShown(true)
      //}
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
          .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000  })
          //setShown(false)
        // if ($(`#buttonIn`).innerWidth() === 64) {
        //   //setShown(false)
         }
        



     // }
    })

   // useEffect(() => {

    function outputsize() {
      //width.value = textbox.offsetWidth
      //height.value = textbox.offsetHeight
      console.log("123123 RESIZED")
        if ($(`#buttonIn`).innerWidth() === 64) {
          setShown(false)
        }
    }
    //outputsize()

    let buttonIn = document.getElementById('buttonIn')

    buttonIn && new ResizeObserver(outputsize).observe(buttonIn)
    


  //  new ResizeSensor(jQuery('#buttonIn'), function(){ 
  //     //console.log('content dimension changed');
  //     console.log("123123 RESIZED")
  //   });
      

    //   $('#buttonIn').on(
    //     "resize", function() {
    //       console.log("123123 RESIZED")
    //     //clearTimeout(id);
    //     //id = setTimeout(doneResizing, 500);
    
    // });

    // $('#buttonIn').resize(function() {
    //   console.log("123123 RESIZED")
  
    // });

   // })

  // useEffect(() => { // THIS RESIZES WIDTH WHEN NEW USER IS LOGGED
  //  // if (userData.email !== '' || userData.email !== undefined) {
  //  if (userData.email) {
  //     setClicked(false)
  //     setButtonHelperWidth($(`#buttonWidthHelper`).outerWidth())
  //     $(`#buttonIn`)
  //       .animate({ width: $(`#buttonWidthHelper`).outerWidth() }, { queue: false, easing: 'easeOutBounce', duration: 1000 })
  //       setTimeout(() => {
  //         $(`#buttonIn`)
  //         .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
  //       }, 2000)
  //       $(`#buttonIn`)
  //       .css("animation", "none")
  //       .css("transition", "none")
  //   }
  // },[userData.email])
  // //})

  // window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER
    
       
  //     $(`#buttonIn`)
  //     .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
        
  // }

  // window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER
  //   $(`#buttonIn`)
  //     .css("animation", "none")
  //     .css("transition", "none")
  // }


  // if (!popUp) { // WHEN POP-UP IS CLOSED, THIS ANIMATION IS FIRED
  //   $(`#buttonIn`)
  //     .stop() // NECESSARY FOR ANIMATION WORKS PROPERLY
  //     .animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })
  // }

  // useEffect(() => {
  //   let buttonGL = document.getElementById('buttonGL')
  //   //buttonGL && document.documentElement.style.setProperty('--buttonGLContent', userData.email ? `Tigned in as` : `Tign in with Google`);
  //   buttonGL && document.documentElement.style.setProperty('--buttonGLContent', 'Tign in with Google');
  // })

   useEffect(() => {
    //console.log("TEST 123", document.getElementById('root'))
    let root = document.getElementById('root')
    //console.log("TEST 123", root && root.getBoundingClientRect().width)
    //console.log("TEST 123", root && root)
    //console.log("TEST 123", window)
    //counter && document.documentElement.style.setProperty('--paginateMargin', `${counter.getBoundingClientRect().width}px`);
  })

    //$(`#buttonGL`).html('TTT')

    const smallDevicesHandler = () => {
      // userData.email && shown && window.innerWidth > 425 ?
      // $(`#buttonGL`).html(`  Signed in as ${userData.email}`) :
      // userData.email && shown && window.innerWidth <= 425 ?
      // $(`#buttonGL`).html(`  ${userData.email}`) :
      // userData.email && !shown ?
      // $(`#buttonGL`).html(` ✔️`) :
      // !userData.email && shown ?
      // $(`#buttonGL`).html(`  Sign in with Google`)  :
      // $(`#buttonGL`).html(` ❌`)

      // userData.email && shown && window.innerWidth > 425 ?
      // $(`#buttonGLHelper`).html(`  Signed in as ${userData.email}`) :
      // userData.email && shown && window.innerWidth <= 425 ?
      // $(`#buttonGLHelper`).html(`  ${userData.email}`) :
      // userData.email && !shown ?
      // $(`#buttonGLHelper`).html(` ✔️`) :
      // !userData.email && shown ?
      // $(`#buttonGLHelper`).html(`  Sign in with Google`)  :
      // $(`#buttonGLHelper`).html(` ❌`)
  
    }

    //textButtonHandler()
    

  useEffect(() => {
    function handleResize() {

      //textButtonHandler()

      console.log("TEST 123", window.innerWidth)

      let buttonGL = document.getElementById('buttonGL')
      let currentText = buttonGL && buttonGL.innerHTML

     /*  currentText && (
        window.innerWidth > 425 ?
        $(`#buttonGL`).html('TTT') :
        $(`#buttonGL`).html('TTT')
      ) */
      
      

      
      console.log("TEST 123", )

      //$(`#buttonGL`).html(e)


      

      //console.log("123123", $(`#buttonIn`).innerWidth())

    }
    window.addEventListener("resize", handleResize);
    //handleResize()
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  },[])

  $(window).on("blur", function() {
    console.log("123123 BLURED")
    // $(`#buttonIn`) // PREVENT ANIMATION WHEN NEW TAB IS FOCUSED
    //   .stop(false, false)
    //   .css("animation", "none")
    //   .css("transition", "none")

      //$(`#buttonIn`)
      //.animate({ width: '30px' }, { queue: false, easing: 'easeOutBounce', duration: 1000 , complete: () => setShown(false) })

    // $(`#buttonIn`) // PREVENT ANIMATION WHEN NEW TAB IS FOCUSED
    //   .stop(false, false)
    //   .css("animation", "none")
    //   .css("transition", "none")

  })

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
        onClick={() => { login(); setClicked(true); setPopUp(true) }}
      >
        <div className={css.buttonInInner}>
          <div><MySvg/></div>
          <div id={`buttonGL`} className={css.test}>
            { // paginateAmount === 45 ?
                /* userData.email && shown ?
                `  Signed in as ${userData.email}` :
                userData.email && !shown ?
                ` ✔️` :
                !userData.email && shown ?
                `  Sign in with Google` :
                ` ❌` */

                userData.email && shown && paginateAmount === 45 ?
                `  ${userData.email}` :
                userData.email && shown && paginateAmount === 90 ?
                `  Signed in as ${userData.email}` :
                userData.email && !shown ?
                ` ✔️` :
                !userData.email && shown ?
                `  Sign in with Google` :
                ` ❌`

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


