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
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();

// Function to determine user role based on email
function getUserRole(email) {
  const lowerEmail = email.toLowerCase();
  if (lowerEmail.includes('student')) {
    return 'student';
  } else if (lowerEmail.includes('faculty')) {
    return 'faculty';
  } else if (lowerEmail.includes('librarian')) {
    return 'librarian';
  }
  return 'student'; // default to student
}

// Export for use in other files
window.FirebaseAuth = { auth, getUserRole };
