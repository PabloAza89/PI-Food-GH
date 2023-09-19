import { useState, useEffect } from "react";
import * as s from '../../styles/ServerStatusSX';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { easings } from '../../styles/CommonsSX';
import $ from 'jquery';
import { serverStatusI } from '../../interfaces/interfaces';

const ServerStatus = () =>  {

  easings() // Jquery easings..

  const serverStatus = useSelector((state: { serverStatus: serverStatusI }) => state.serverStatus)

  //const [ show, setShow ] = useState<boolean>(false)
  const [ show, setShow ] = useState<boolean>(true)

  useEffect(() => {
    $(function() {
      if (show) { // show -> hidden
        $(`.buttonShow`)
          .stop()
          .css("left", "auto")
          .css("right", "0px")
        $(`.flags`)
          .css("left", "auto")
          .css("right", "250px")
        $(`#buttonShow`).on("click", function() {
          $(`#buttonShow`)
            .stop()
            .css(`animationName`,`none`)
            .css(`animationDuration`,`0s`)
            .css(`animationDelay`,`0s`)
            .css(`animationIterationCount`,`none`)
          $(`.flags`)
            .stop()
            .animate( { right: '-60px' }, { queue: false, easing: 'easeOutCubic', duration: 800 }) // INITIAL POSITION
        })
      }
      else if (!show) { // hidden -> show
        $(`.buttonShow`)
          .stop()
          .css("left", "auto")
          .css("right", "0px")
        $(`.flags`)
          .css("left", "auto")
          .css("right", "-60px")
        $(`#buttonShow`).on("click", function() {
          $(`#buttonShow`)
            .stop()
            .css(`animationName`,`none`)
            .css(`animationDuration`,`0s`)
            .css(`animationDelay`,`0s`)
            .css(`animationIterationCount`,`none`)
          $(`.flags`)
            .stop()
            .animate( { right: '250px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
        })
      }
    })
  },[show])

  console.log("SHOW", show)

  return (
    <Box sx={s.background}>
      <Button
        className={`buttonShow`}
        id={`buttonShow`}
        sx={s.button}
        onClick={() => { setShow(!show) }}
      >
        <Typography sx={s.buttonTypo}>
          { `SERVER STATUS` }
        </Typography>
      </Button>
      <Box
        sx={s.sliderBox}
        className={`flags`}
        id={`flags`}
      >
        {/* <Typography>CONNECTION STATUS</Typography> */}
        <Box sx={s.eachRow}>
          <Box sx={s.circleBig({ online: serverStatus.online })}></Box>
          <Typography> Server Status: { serverStatus.online ? `Online` : `Offline`}</Typography>
        </Box>
        <Box sx={s.eachRow}>
          <Box sx={s.circleBig({ online: serverStatus.online })}></Box>
          <Typography> User Repices: { serverStatus.online ? `Available` : `Not Available`}</Typography>
        </Box>
        <Box sx={s.eachRow}>
          <Box sx={s.circleBig({ online: serverStatus.validKey })}></Box>
          <Typography> Base Recipes Mode: { (!serverStatus.validKey && serverStatus.try === 5) || !serverStatus.online ? `Offline` : `Online`}</Typography>
        </Box>
        { serverStatus.online ? Array.from({length: 5}, (e,i) => ({ key: i + 1 })).map((el, idx) => {
          return (
            <Box key={idx} sx={s.eachRowSmall}>
              <Box sx={s.circleSmall({ red: el.key < serverStatus.try || (el.key === serverStatus.try && !serverStatus.validKey) ? true : false, blue: el.key > serverStatus.try ? true : false })}></Box>
              <Typography> Key {el.key} {
                el.key < serverStatus.try || (el.key === serverStatus.try && !serverStatus.validKey) ?
                `- Rate limited :(` :
                el.key === serverStatus.try && serverStatus.validKey ?
                `- Currently in use !` :
                el.key > serverStatus.try ?
                `- Not checked yet..` :
                `as`
              }</Typography>
            </Box>
          )
        }) : null }
        <Box sx={s.eachRow}>
          <Typography><b>Info:</b> {
            serverStatus.online && serverStatus.validKey ?
            `Server is online and currently its using the Key Nº ${serverStatus.try} for access third-part API Database (Base Recipes). User Recipes are also available.` :
            serverStatus.online && !serverStatus.validKey ?
            `Server is online and User Recipes are also available. But all Keys for access third-part API request are rate-limited so then you are seeing an offline copy of Base Recipes Database.` :
            `You currently are viewing an offline version of the site, because the server is actually offline. User Recipes are not available and you are viewing an offline copy of Base Recipes Database. You cannot save your recipes until the server is back online.`
          }</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ServerStatus;