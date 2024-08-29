import React from 'react'
import AboutUs from '../components/AboutUs'
import Tournament from './Tournament'
import { signOutUser } from '../services/auth';

const Home = () => {
  function signout() {
    signOutUser();
  }
  return (
    <div>
      {/* <AboutUs/> */}
      <Tournament/>
      <button onClick={signout}>signout</button>
    </div>
  )
}

export default Home