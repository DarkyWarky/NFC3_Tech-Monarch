import React from 'react'
import AboutUs from '../components/AboutUs'
import Tournament from './Tournament'
import { signOutUser } from '../services/auth';
import Notifications from '../components/Notifications';

const Home = () => {
  function signout() {
    signOutUser();
  }
  return (
    <div>
      {/* <AboutUs/> */}
      <Tournament/>
      <button onClick={signout}>signout</button>
      <Notifications/>
    </div>
  )
}

export default Home