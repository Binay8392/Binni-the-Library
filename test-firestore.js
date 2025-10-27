// Test script for Firestore functions
import { addBook, getAllBooks, updateBook, deleteBook } from './firestore.js';

async function runTests() {
  console.log('Starting Firestore tests...');

  try {
    // Test 1: Add a book
    console.log('\n--- Test 1: Adding a book ---');
    const bookId = await addBook('Test Book', 'Test Author', true);
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
}

// Run tests when script loads
runTests();
