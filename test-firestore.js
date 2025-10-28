// Test script for Firestore functions
// Note: This test is designed for browser environment. For Node.js testing, use firebase-admin SDK.

console.log('Firestore test script loaded.');
console.log('Note: This test requires Firebase SDK to be loaded in a browser environment.');
console.log('To run tests, open index.html in a browser and check the console.');
console.log('The test functions are available as: window.testFirestore()');
console.log('');

// Export test functions for browser use
if (typeof window !== 'undefined') {
  window.testFirestore = async function() {
    console.log('Starting Firestore tests...');

    try {
      // Import functions dynamically
      const { addBook, getAllBooks, updateBook, deleteBook } = await import('./firestore.js');

      // Test 1: Add a book
      console.log('\n--- Test 1: Adding a book ---');
      const bookId = await addBook({ title: 'Test Book', author: 'Test Author', available: true });
      console.log('Book added with ID:', bookId);

      // Test 2: Get all books
      console.log('\n--- Test 2: Fetching all books ---');
      const books = await getAllBooks();
      console.log('Books fetched:', books.length);

      // Test 3: Update the book
      console.log('\n--- Test 3: Updating the book ---');
      await updateBook(bookId, { title: 'Updated Test Book', available: false });
      console.log('Book updated');

      // Test 4: Delete the book
      console.log('\n--- Test 4: Deleting the book ---');
      await deleteBook(bookId);
      console.log('Book deleted');

      console.log('\nAll tests completed successfully!');

    } catch (error) {
      console.error('Test failed:', error);
    }
  };
} else {
  console.log('Running in Node.js environment. Tests are designed for browser use.');
  console.log('To test Firestore functions, use the browser console after loading the app.');
}
