// crudService.js
import { db } from '../utils/firebase-config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Create a new document
export const createDocument = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), data);
    console.log("Document created successfully.");
  } catch (error) {
    console.error("Error creating document:", error.message);
  }
};

// Read documents
export const readDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error("Error reading documents:", error.message);
  }
};

// Update a document
export const updateDocument = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    console.log("Document updated successfully.");
  } catch (error) {
    console.error("Error updating document:", error.message);
  }
};

// Delete a document
export const deleteDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log("Document deleted successfully.");
  } catch (error) {
    console.error("Error deleting document:", error.message);
  }
};
