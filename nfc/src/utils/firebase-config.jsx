
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAQSnvp1dkyvNCBDQpeRfrbN6H9yNGqEtY",
  authDomain: "nfc-firebase-9a73c.firebaseapp.com",
  projectId: "nfc-firebase-9a73c",
  storageBucket: "nfc-firebase-9a73c.appspot.com",
  messagingSenderId: "125122960930",
  appId: "1:125122960930:web:8c9918c0c3fca18dd2f47b",
  measurementId: "G-WGDEL4FDJR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };