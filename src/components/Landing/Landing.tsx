import css from './LandingCSS.module.css';
//import './LandingPageCSS.css';
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { landingShown } from '../../actions';

const LandingPage = () => {

  const dispatch = useDispatch()
  const landingShownState = useSelector((state: { landingShown: boolean }) => state.landingShown)

  return (
    <div
      style={{
        display: landingShownState ? 'flex' : 'none'
      }}
      className={css.background}
    >
      <div className={css.bgImageLanding}></div>
      <div className={css.landingContainer}>
        <h1 className={css.welcomeText}>Welcome to Foodify !</h1>
        <Button
          className={css.welcomeButton}
          /* id={css.welcomeButton} */
          onClick={() => {
            console.log("WWW", 'clicked')
            dispatch(landingShown(false))}}
        >LOGIN WITH GOOGLE</Button>
        <Button
          className={css.welcomeButton}
          /* id={css.welcomeButton} */
          onClick={() => {
            console.log("WWW", 'clicked')
            dispatch(landingShown(false))}}
        >LOGIN AS GUEST</Button>
      </div>
    </div>
  );
}

export default LandingPage;