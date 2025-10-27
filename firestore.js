import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1RimsOkdnZmjq1X3WJTro_Ngpryc08Tw",
  authDomain: "binni-40b9f.firebaseapp.com",
  projectId: "binni-40b9f",
  storageBucket: "binni-40b9f.firebasestorage.app",
  messagingSenderId: "47848859639",
  appId: "1:47848859639:web:aa1b87fb896b684d5c30f2",
  measurementId: "G-04J3Q4XY9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore functions
export async function addBook(title, author, available) {
  try {
    const docRef = await addDoc(collection(db, 'books'), {
      title: title,
      author: author,
      available: available,
      createdAt: new Date()
    });
    console.log('Book added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
}

export async function getAllBooks() {
  try {
    const querySnapshot = await getDocs(collection(db, 'books'));
    const books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    console.log('Books fetched:', books.length);
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function updateBook(bookId, updates) {
  try {
    const bookRef = doc(db, 'books', bookId);
    await updateDoc(bookRef, updates);
    console.log('Book updated');
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
}

export async function deleteBook(bookId) {
  try {
    await deleteDoc(doc(db, 'books', bookId));
    console.log('Book deleted');
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
}
