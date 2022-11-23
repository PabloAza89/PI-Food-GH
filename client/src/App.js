import React from 'react';
import MainPage from './components/MainPage';
import { useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';

export default function App() {

  const showMain = useSelector( state => state.showMain )
  return (
    <div className='main'>
      {/* { showMain ? <MainPage /> : <MainPage /> } */}
      { showMain ? <MainPage /> : <LandingPage />}
    </div>
  )
}