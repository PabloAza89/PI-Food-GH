import css from './GoUpCSS.module.css';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material/';
import $ from 'jquery';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import ForwardIcon from '@mui/icons-material/Forward';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';

const GoUp = () =>  {

  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)

  return (
    <Button
      variant="contained"
      onClick={() => $(window).scrollTop(0)}
      className={css.button}
      style={{ display: scrollPosition >= 270 ? 'flex' : 'none' }}
    >
      <TransitEnterexitIcon
        className={css.icon}
        sx={{ fontSize: 32 }}
      />
    </Button>
  );
}

export default GoUp;