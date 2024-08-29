import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../utils/firebase-config'; // Ensure this file properly exports the Firestore instance

// Create: Add a new document to a collection
export async function createDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return document ID if needed
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Re-throw error for higher-level handling
  }
}

// Read: Get all documents from a collection
export async function readDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot; // Return the querySnapshot for processing
  } catch (error) {
    console.error("Error reading documents: ", error);
    throw error; // Re-throw error for higher-level handling
  }
}

// Update: Update a specific document by ID
export async function updateDocument(collectionName, docId, updatedData) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID: ", docId);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// Delete: Delete a specific document by ID
export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", docId);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

// Add a new user to Firestore
export async function addUserToFirestore(data) {
  try {
    await createDocument("users", data); // Use the correct collection name
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}
