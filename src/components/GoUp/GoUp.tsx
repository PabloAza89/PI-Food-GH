import * as s from '../../styles/GoUpSX';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material/';
import $ from 'jquery';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';

const GoUp = () =>  {

  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)

  return (
    <Button
      variant="contained"
      onClick={() => $(window).scrollTop(0)}
      sx={s.button({ scrollPosition })}
    >
      <TurnLeftIcon sx={{ fontSize: 35 }} />
    </Button>
  );
}

export default GoUp;