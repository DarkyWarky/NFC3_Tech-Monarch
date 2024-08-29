// authService.js
import { auth, db } from '../utils/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Firebase Storage
const storage = getStorage();

// Sign up function with additional fields
export const signUp = async (username, email, password, imageFile) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload image if provided
    let imageUrl = "";
    if (imageFile) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Update profile with display name and photo URL
    await updateProfile(user, {
      displayName: username,
      photoURL: imageUrl || null,
    });

    // Save additional user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      imageUrl,
    });

    console.log("User signed up successfully with additional info.");
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in successfully.");
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
