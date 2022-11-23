import '../styles/LandingPage.css';
import { useDispatch } from 'react-redux';
import { setShowMain } from '../actions';

function LandingPage() {
  const dispatch = useDispatch()

  return (
    <div >
      <div className='bgImageLanding'></div>
      <div className='landingContainer'>
        <h1 className='welcomeText'>Welcome to Foodify !</h1>
        <button className='welcomeButton' id="welcomeButton" onClick={() => dispatch(setShowMain(true))} >ENTER</button>
      </div>
    </div>
  );
}

export default LandingPage;