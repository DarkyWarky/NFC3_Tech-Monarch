import React from 'react'
import { signOutUser } from '../services/auth';
import Notifications from '../components/Notifications';

const Home = () => {
  function signout() {
    signOutUser();
  }
  return (
    <div>
      <button onClick={signout}>signout</button>
      <Notifications/>
    </div>
  )
}

export default Home