import { useState, useEffect } from "react";
import css from "./ServerStatusCSS.module.css";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import $ from 'jquery';
import { serverStatusI } from '../../interfaces/interfaces';

const ServerStatus = () =>  {

  easings() // Jquery easings..

  const serverStatus = useSelector((state: { serverStatus: serverStatusI }) => state.serverStatus)

  const [ show, setShow ] = useState<boolean>(false)

  useEffect(() => {
    $(function() {
      if (show) { // show -> hidden
        $(`.buttonShow`)
          .stop()
          .css("left", "auto")
          .css("right", "0px")
          .on("click", function() {
            $(this)
              .stop()
              .css(`animationName`,`none`)
              .css(`animationDuration`,`0s`)
              .css(`animationDelay`,`0s`)
              .css(`animationIterationCount`,`none`)
          $(`#sliderBox`)
            .stop()
            .animate( { right: '-60px' }, { queue: false, easing: 'easeOutCubic', duration: 800 }) // INITIAL POSITION
        })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "310px")
      }
      else if (!show) { // hidden -> show
        $(`.buttonShow`)
          .stop()
          .css("left", "auto")
          .css("right", "0px")
          .on("click", function() {
            $(this)
              .stop()
              .css(`animationName`,`none`)
              .css(`animationDuration`,`0s`)
              .css(`animationDelay`,`0s`)
              .css(`animationIterationCount`,`none`)
            $(`#sliderBox`)
              .stop()
              .animate( { right: '310px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "-60px")
      }
    })
  },[show])

  return (
    <div className={css.background}>
      <Button
        className={`buttonShow`}
        id={css.button}
        onClick={() => { setShow(!show) }}
      >
        <div className={css.buttonTypo}>
          { `SERVER STATUS` }
        </div>
      </Button>
      <div
        className={css.sliderBox}
        id={`sliderBox`}
      >
        <div className={css.eachRow}>
          <div className={css.circleBig} style={{ background: serverStatus.online ? 'green' : 'red' }} />
          <div className={css.title}> Server Status: { serverStatus.online ? `Online` : `Offline`}</div>
        </div>
        <div className={css.eachRow}>
          <div className={css.circleBig} style={{ background: serverStatus.online ? 'green' : 'red' }} />
          <div className={css.title}> User Repices: { serverStatus.online ? `Available` : `Not Available`}</div>
        </div>
        <div className={css.eachRow}>
          <div className={css.circleBig} style={{ background: serverStatus.validKey ? 'green' : 'red' }} />
          <div className={css.title}> Base Recipes Mode: { (!serverStatus.validKey && serverStatus.try === 5) || !serverStatus.online ? `Offline` : `Online`}</div>
        </div>
        { serverStatus.online ? Array.from({length: 5}, (e,i) => ({ key: i + 1 })).map((el, idx) => {
          return (
            <div key={idx} className={css.eachRowSmall}>
              <div className={css.circleSmall} style={{ background: el.key < serverStatus.try || (el.key === serverStatus.try && !serverStatus.validKey) ? 'red' : el.key > serverStatus.try ? 'blue' : 'green' }}/>
              <div className={css.title}> Key {el.key} {
                el.key < serverStatus.try || (el.key === serverStatus.try && !serverStatus.validKey) ?
                `- Rate limited :(` :
                el.key === serverStatus.try && serverStatus.validKey ?
                `- Currently in use !` :
                el.key > serverStatus.try ?
                `- Not checked yet..` :
                `as`
              }</div>
            </div>
          )
        }) : null }
        <div className={css.eachRow}>
          <div className={css.title}><b>Info:</b> {
            serverStatus.online && serverStatus.validKey ?
            `Server is online and currently its using the Key Nº ${serverStatus.try} for access third-part API Database (Base Recipes). User Recipes are also available.` :
            serverStatus.online && !serverStatus.validKey ?
            `Server is online and User Recipes are also available. But all Keys for access third-part API request are rate-limited so then you are seeing an offline copy of Base Recipes Database.` :
            `You currently are viewing an offline version of the site, because the server is actually offline. User Recipes are not available and you are viewing an offline copy of Base Recipes Database. You cannot save your recipes until the server is back online.`
          }</div>
        </div>
      </div>
    </div>
  );
}

export default ServerStatus;