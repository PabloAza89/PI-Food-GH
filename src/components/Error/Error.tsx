import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import error from '../../images/error.gif';
import * as s from '../../styles/ErrorSX';
import loadingImage from '../../images/loadingImage.png';

function Error() {

  const english = useSelector((state: {english:boolean}) => state.english)
  const smaPort = useSelector((state: {smaPort:boolean}) => state.smaPort)
  const smaLand = useSelector((state: {smaLand:boolean}) => state.smaLand)
  const medPort = useSelector((state: {medPort:boolean}) => state.medPort)
  const medLand = useSelector((state: {medLand:boolean}) => state.medLand)

  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <Box sx={s.background({ smaPort, smaLand })}>
      <Box sx={s.leftRightHelper({ smaPort, smaLand })} />
      <Box sx={s.mainContainer({ smaPort, smaLand, medPort, medLand })}>
        <Box>
          <Box
            component="img"
            src={error}
            onLoad={() => setLoaded(true)}
            sx={s.errorGif({ loaded, smaPort, smaLand, medPort, medLand })}
          />
          <Box
            component="img"
            src={loadingImage}
            sx={s.placeholderAnimation({ loaded, smaPort, smaLand, medPort, medLand })}
          />
        </Box>
        <Typography sx={s.message({ smaPort, smaLand, medPort, medLand })}>
          { english ? `This page does not exist.` : `Esta página no existe.` }
        </Typography>
      </Box>
      <Box sx={s.leftRightHelper({ smaPort, smaLand })} />
    </Box>
  )
}

export default Error;