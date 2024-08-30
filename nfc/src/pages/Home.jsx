import React from 'react'
import AboutUs from '../components/AboutUs'
// import { signOutUser } from '../services/auth';
// import Notifications from '../components/Notifications';
import Videopage from '../components/Videopage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Videopage/>
      <AboutUs/>
      <Footer/>
    </div>
  )
}

export default Home