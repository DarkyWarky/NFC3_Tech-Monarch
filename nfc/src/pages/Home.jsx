import React from 'react'
import { signOutUser } from '../services/auth';

const Home = () => {
  function signout() {
    signOutUser();
  }
  return (
    <div>
      <button onClick={signout}>signout</button>
    </div>
  )
}

export default Home