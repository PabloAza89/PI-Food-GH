import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import error from '../../images/error.gif';
import * as s from '../../styles/ErrorSX';
import loadingImage from '../../images/loadingImage.png';

function Error() {

  const english = useSelector((state: {english:boolean}) => state.english)
  const minPort = useSelector((state: {minPort:boolean}) => state.minPort)
  const minLand = useSelector((state: {minLand:boolean}) => state.minLand)
  const medPort = useSelector((state: {medPort:boolean}) => state.medPort)
  const medLand = useSelector((state: {medLand:boolean}) => state.medLand)

  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <Box sx={s.background({ minPort, minLand })}>
      <Box sx={s.leftRightHelper({ minPort, minLand })} />
      <Box sx={s.mainContainer({ minPort, minLand, medPort, medLand })}>
        <Box>
          <Box
            component="img"
            src={error}
            onLoad={() => setLoaded(true)}
            sx={s.errorGif({ loaded, minPort, minLand, medPort, medLand })}
          />
          <Box
            component="img"
            src={loadingImage}
            sx={s.placeholderAnimation({ loaded, minPort, minLand, medPort, medLand })}
          />
        </Box>
        <Typography sx={s.message({ minPort, minLand, medPort, medLand })}>
          { english ? `This page does not exist.` : `Esta página no existe.` }
        </Typography>
      </Box>
      <Box sx={s.leftRightHelper({ minPort, minLand })} />
    </Box>
  )
}

export default Error;