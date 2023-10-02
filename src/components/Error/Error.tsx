import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import comm from '../../styles/commons.module.css';
import { useSelector } from 'react-redux';
import error from '../../images/error.gif';
import * as s from './ErrorSX';
import css from './ErrorCSS.module.css';
import loadingImage from '../../images/loadingImage.png';

function Error() {

  const english = useSelector((state: {english:boolean}) => state.english)
  const smaPort = useSelector((state: {smaPort:boolean}) => state.smaPort)
  const smaLand = useSelector((state: {smaLand:boolean}) => state.smaLand)
  const medPort = useSelector((state: {medPort:boolean}) => state.medPort)
  const medLand = useSelector((state: {medLand:boolean}) => state.medLand)
  const viewPort = useSelector((state: {viewPort: string}) => state.viewPort)

  console.log("viewPort", viewPort)

  const [loaded, setLoaded] = useState<boolean>(false)
  /* className={`${css.selectsAndButtons} ${comm.rtrtrt}`} */

  return (
    <div className={css.background} style={{ minHeight: (viewPort === 'smaPort' || viewPort === 'smaLand') ? 'none' : '530px' }}>
      <div className={css.leftRightHelper} style={{ minWidth: (viewPort === 'smaPort' || viewPort === 'smaLand') ? 'none' : '30px' }} />
      <div className={css.mainContainer} style={{ width: viewPort === 'smaPort' ? '90vw' : viewPort === 'smaLand' ? '40vw' : (viewPort === 'medPort' || viewPort === 'medLand') ? '430px' : '500px' }}>
        <div>
          <img
            src={error}
            onLoad={() => setLoaded(true)}
            sx={s.errorGif({ loaded, smaPort, smaLand, medPort, medLand })}
          />
          <img
            src={loadingImage}
            sx={s.placeholderAnimation({ loaded, smaPort, smaLand, medPort, medLand })}
          />
        </div>
        <div sx={s.message({ smaPort, smaLand, medPort, medLand })}>
          { english ? `This page does not exist.` : `Esta página no existe.` }
        </div>
      </div>
      <div className={css.leftRightHelper} style={{ minWidth: (viewPort === 'smaPort' || viewPort === 'smaLand') ? 'none' : '30px' }} />
    </div>
  )
}

export default Error;