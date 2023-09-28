import { useEffect, useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material/';
import { ReactComponent as MySvg } from '../../images/googleLogo.svg';
import * as s from "../../styles/GoogleAuthSX";
import Swal from 'sweetalert2';
import $ from 'jquery';

const GoogleAuth = ({ retrieveLogin, userData }: any) => {

  //console.log("userData", userData)

  const hasScroll = useSelector((state: {hasScroll:boolean}) => state.hasScroll)
  const scrollWidth = useSelector((state: {scrollWidth:number}) => state.scrollWidth)

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

  const [ shown, setShown ] = useState<boolean>(false)

  let qq = $(`.bgIn`).width()
 
    $(`.bgIn`) // when hover image, extra pixels helper on right
    .on( "mouseenter", function(){
      
      
      $(`.bgIn`)
        .css("transition", "all 1s ease-in-out")
        //.width(`600px`)
        //.width(`${qq}`)
        .width(`290px`)
        setShown(true)
        //.css('height', 'fit-content');
        //.css('width', 'fit-content');
        //.css('min-width', 'fit-content')
        
        //.width( minPort || minLand ? `calc((${array.map(e => e.media).flat().length} * 414px) + 3px)` : `calc((${array.map(e => e.media).flat().length} * 564px) + 3px)` )
      //$(`.extraPXCenterStripe`)
       // .css("transition", "all .2s ease-in-out")
        //.width( minPort || minLand ? `calc((${array.map(e => e.media).flat().length} * 414px) + 3px)` : `calc((${array.map(e => e.media).flat().length} * 564px) + 3px)` )
    })
    .on( "mouseleave", function(){
      $(`.bgIn`)
        .css("transition", "all 1s ease-in-out")
        .width(`50px`)
        setTimeout(() => {
          setShown(false)
        }, 1000)
        
        //.width( minPort || minLand ? `calc(${array.map(e => e.media).flat().length} * 414px)` : `calc(${array.map(e => e.media).flat().length} * 564px)` )
      //$(`.extraPXCenterStripe`)
        //.width( minPort || minLand ? `calc(${array.map(e => e.media).flat().length} * 414px)` : `calc(${array.map(e => e.media).flat().length} * 564px)` )
    })
    //$(`.extraPXSolid`)
      //.width( minPort || minLand ? `calc(${array.map(e => e.media).flat().length} * 414px)` : `calc(${array.map(e => e.media).flat().length} * 564px)` )
    //$(`.extraPXCenterStripe`)
      //.width( minPort || minLand ? `calc(${array.map(e => e.media).flat().length} * 414px)` : `calc(${array.map(e => e.media).flat().length} * 564px)` )
  

  return (
    <Box sx={s.background({ hasScroll, scrollWidth })}>
      <Button className={`bgIn`} variant="contained" sx={s.bgIn} onClick={() => login()} >
        
        <Box sx={{ background: 'yellow', width: '60px', textWrap: 'nowrap',
    overflow: 'hidden',
    justifyContent: 'flex-start', }}>
        <MySvg/>
        {
          userData.email && shown ?
          `  Signed in as ${userData.email}` :
          userData.email && !shown ?
          `  Signed in as ${userData.email}` :
          //`  ✔` :
          !userData.email && shown ?
          `  Sign in with Google` :
          `  ❌`
          
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


