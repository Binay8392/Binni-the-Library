// Firestore service module

// Firestore functions with retry logic and better error handling
const FirestoreService = {
    db: null,
    _connectionMonitor: null,
    _connectionState: false,

    async init() {
        // Get db reference from global Firebase service
        this.db = window.FirebaseAuth?.db;
        if (!this.db) {
            throw new Error('Firestore not initialized. Please ensure Firebase is initialized first.');
        }

        // Setup connection state monitoring
        await this._setupConnectionMonitoring();
    },

    async _setupConnectionMonitoring() {
        if (!this.db) return;

        try {
            // Create a special collection for connection monitoring
            const connRef = this.db.collection('__status').doc('connection');
            
            // Set up real-time connection monitoring
            this._connectionMonitor = this.db.enableNetwork().then(() => {
                return connRef.onSnapshot(
                    () => {
                        // Connection is active
                        if (!this._connectionState) {
                            this._connectionState = true;
                            this._handleConnectionChange(true);
                        }
                    },
                    (error) => {
                        // Connection error occurred
                        console.warn('Connection monitor error:', error);
                        this._connectionState = false;
                        this._handleConnectionChange(false, error);
                    }
                );
            });

            // Initial connection check
            await this.checkConnection();
        } catch (error) {
            console.error('Failed to setup connection monitoring:', error);
            this._handleConnectionChange(false, error);
        }
    },

    async checkConnection() {
        if (!this.db || !this.rtdb) return false;

        try {
            // Check both Firestore and Realtime Database connections
            const timestamp = Date.now();
            
            // Check Firestore connection
            await this.db.collection('__status').doc('ping').set({ timestamp });
            
            // Check Realtime Database connection
            const connRef = this.rtdb.ref('.info/connected');
            const isRtdbConnected = await new Promise((resolve) => {
                connRef.once('value', (snap) => {
                    resolve(snap.val() === true);
                });
            });
            
            if (!isRtdbConnected) {
                throw new Error('Realtime Database connection lost');
            }
            
            return true;
        } catch (error) {
            console.warn('Connection check failed:', error);
            return false;
        }
    },

    _handleConnectionChange(isConnected, error = null) {
        if (isConnected) {
            // Clear any existing error messages
            document.querySelectorAll('.firebase-error').forEach(el => el.remove());
            
            // Show brief success message
            const successMsg = document.createElement('div');
            successMsg.className = 'firebase-success';
            successMsg.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin: 10px;">
                    <strong>✓ Connected:</strong> Database connection restored.
                </div>
            `;
            document.body.insertBefore(successMsg, document.body.firstChild);
            setTimeout(() => successMsg.remove(), 3000);
        } else {
            // Show error message with retry option
            const errorMsg = document.createElement('div');
            errorMsg.className = 'firebase-error';
            errorMsg.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 4px; margin: 10px;">
                    <strong>Database Error:</strong> Connection not available.
                    ${error ? `<br><small>${error.message}</small>` : ''}
                    <button onclick="FirestoreService.retryConnection()" style="margin-left: 10px; padding: 4px 8px;">
                        🔄 Retry Connection
                    </button>
                </div>
            `;
            document.body.insertBefore(errorMsg, document.body.firstChild);
        }
    },

    async retryConnection() {
        if (!this.db) {
            this.init();
            return;
        }

        try {
            // Show attempting reconnect message
            const status = document.createElement('div');
            status.className = 'firebase-status';
            status.innerHTML = `
                <div style="background: #cce5ff; color: #004085; padding: 12px; border-radius: 4px; margin: 10px;">
                    <strong>↻ Reconnecting:</strong> Attempting to restore database connection...
                </div>
            `;
            document.body.insertBefore(status, document.body.firstChild);

            // Try to re-enable network and check connection
            await this.db.enableNetwork();
            const connected = await this.checkConnection();

            // Remove status message
            status.remove();

            if (!connected) {
                throw new Error('Unable to establish database connection');
            }
        } catch (error) {
            console.error('Connection retry failed:', error);
            this._handleConnectionChange(false, error);
        }
    },

    async addBook(bookData, maxRetries = 3) {
        if (!this.db) this.init();
        
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                // Add server timestamp
                const dataWithTimestamp = {
                    ...bookData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                const docRef = await this.db.collection('books').add(dataWithTimestamp);
                console.log('Book added with ID:', docRef.id);
                return docRef.id;
            } catch (error) {
                attempt++;
                console.error(`Error adding book (attempt ${attempt}/${maxRetries}):`, error);
                
                if (attempt === maxRetries) {
                    throw new Error('Failed to add book after multiple attempts. Please check your connection.');
                }
                
                // Wait before retrying with exponential backoff
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
    },

    async getAllBooks(includeDeleted = false) {
        if (!this.db) await this.init();
        
        try {
            // Verify connection first
            const isConnected = await this.checkConnection();
            if (!isConnected) {
                throw new Error('Database connection not available');
            }

            let query = this.db.collection('books');
            if (!includeDeleted) {
                query = query.where('deleted', '!=', true);
            }
            
            const querySnapshot = await query.get();
            const books = [];
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Convert timestamps to dates
                const book = {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate()
                };
                books.push(book);
            });
            
            console.log('Books fetched:', books.length);
            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            this._handleConnectionChange(false, error);
            throw new Error('Failed to fetch books. Please check your connection.');
        }
    },

    async updateBook(bookId, updates) {
        if (!this.db) this.init();
        
        try {
            const bookRef = this.db.collection('books').doc(bookId);
            
            // Add update timestamp
            const updatedData = {
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await bookRef.update(updatedData);
            console.log('Book updated successfully');
        } catch (error) {
            console.error('Error updating book:', error);
            throw new Error('Failed to update book. Please check your connection.');
        }
    },

    async deleteBook(bookId, hardDelete = false) {
        if (!this.db) this.init();
        
        try {
            const bookRef = this.db.collection('books').doc(bookId);
            
            if (hardDelete) {
                await bookRef.delete();
                console.log('Book permanently deleted');
            } else {
                // Soft delete
                await bookRef.update({
                    deleted: true,
                    deletedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log('Book marked as deleted');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            throw new Error('Failed to delete book. Please check your connection.');
        }
    },

    // Batch operations for better performance
    async addBooksInBatch(books) {
        if (!this.db) this.init();
        
        try {
            const batch = this.db.batch();
            const booksRef = this.db.collection('books');
            
            books.forEach(book => {
                const newBookRef = booksRef.doc();
                batch.set(newBookRef, {
                    ...book,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
            
            await batch.commit();
            console.log('Batch book addition successful');
        } catch (error) {
            console.error('Error in batch operation:', error);
            throw new Error('Failed to add books in batch. Please check your connection.');
        }
    },

    // Realtime listeners
    subscribeToBooks(callback, error) {
        if (!this.db) this.init();
        
        return this.db.collection('books')
            .where('deleted', '!=', true)
            .onSnapshot(snapshot => {
                const books = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    books.push({
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate(),
                        updatedAt: data.updatedAt?.toDate()
                    });
                });
                callback(books);
            }, error);
    }
};

// Export service singleton (only in browser)
if (typeof window !== 'undefined') {
    window.FirestoreService = FirestoreService;
}

// Named exports for ES modules
export const addBook = FirestoreService.addBook.bind(FirestoreService);
export const getAllBooks = FirestoreService.getAllBooks.bind(FirestoreService);
export const updateBook = FirestoreService.updateBook.bind(FirestoreService);
export const deleteBook = FirestoreService.deleteBook.bind(FirestoreService);
