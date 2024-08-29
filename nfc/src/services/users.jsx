import { createDocument } from './database';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../utils/firebase-config';

// Function to register a new user
export const registerNewUser = async (userData) => {
    const { email, password, ...profileData } = userData; 
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log('User authenticated successfully.');
      await createDocument('users', {
        uid: user.uid, // Store the user ID for reference
        ...profileData, // Store other user details
      });
  
      console.log('User registered successfully and profile data saved.');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  export const loginUser = async (userData) => {
    const { email, password } = userData;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log('User logged in successfully:', user);
  
      // You can add additional logic here, such as redirecting the user
      // or fetching user profile data from your database, if needed.
  
    } catch (error) {
      console.error('Error logging in user:', error.message);
    }
  };