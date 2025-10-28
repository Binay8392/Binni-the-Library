// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1RimsOkdnZmjq1X3WJTro_Ngpryc08Tw",
    authDomain: "binni-40b9f.firebaseapp.com",
    databaseURL: "https://binni-40b9f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "binni-40b9f",
    storageBucket: "binni-40b9f.firebasestorage.app",
    messagingSenderId: "47848859639",
    appId: "1:47848859639:web:aa1b87fb896b684d5c30f2",
    measurementId: "G-04J3Q4XY9Z"
};

// Create Firebase service singleton
const createFirebaseService = () => {
    let instance = {
    app: null,
    auth: null,
    storage: null,
    db: null,
    rtdb: null,
    isInitialized: false,
    
    async initialize() {
        if (this.isInitialized && this.db && this.rtdb) {
            console.log('Firebase already initialized');
            return true;
        }

        try {
            console.log('Starting Firebase initialization...');
            
            // Clear any existing error messages
            document.querySelectorAll('.firebase-error, .firebase-warning, .firebase-status')
                .forEach(el => el.remove());
            
            // Check if Firebase SDK is available
            if (!window.firebase || !window.firebase.app || !window.firebase.auth || !window.firebase.firestore) {
                throw new Error('Firebase SDK not fully loaded. Please refresh the page.');
            }
            
            // Initialize Firebase app if not already initialized
            if (!firebase.apps.length) {
                this.app = firebase.initializeApp(firebaseConfig);
            } else {
                this.app = firebase.app();
            }
            
            // Configure Firestore settings first
            const db = firebase.firestore();
            const settings = {
                cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
                experimentalForceLongPolling: true, // Add long polling for better connection stability
                merge: true // Enable automatic merge of offline changes
            };
            db.settings(settings);
            
            // Initialize services after settings with timeout protection
            const initializeWithTimeout = async (operation, timeoutMs = 10000) => {
                return Promise.race([
                    operation(),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
                    )
                ]);
            };
            
            this.auth = await initializeWithTimeout(() => firebase.auth());
            this.storage = await initializeWithTimeout(() => firebase.storage());
            this.db = db;
            
            // Initialize Realtime Database with persistence
            try {
                this.rtdb = firebase.database();
                await this.rtdb.goOnline();
                await this.rtdb.ref('.info/connected').once('value', (snapshot) => {
                    if (snapshot.val() === true) {
                        console.log('Connected to Realtime Database');
                    }
                });
                console.log('Realtime Database initialized');
            } catch (error) {
                console.error('Realtime Database initialization error:', error);
                throw error;
            }
            
            // Enable offline persistence with retry mechanism
            let persistenceEnabled = false;
            const maxPersistenceRetries = 3;
            
            for (let i = 0; i < maxPersistenceRetries && !persistenceEnabled; i++) {
                try {
                    await this.db.enablePersistence({
                        synchronizeTabs: true
                    });
                    persistenceEnabled = true;
                    console.log('Offline persistence enabled');
                } catch (err) {
                    if (err.code === 'failed-precondition') {
                        console.warn('Multiple tabs open, persistence enabled in first tab only');
                        this.showOfflineWarning('Offline features are limited to one tab at a time');
                        break; // Don't retry for this error
                    } else if (err.code === 'unimplemented') {
                        console.warn('Browser does not support persistence');
                        this.showOfflineWarning('Your browser does not support offline features');
                        break; // Don't retry for this error
                    } else {
                        console.warn(`Persistence retry ${i + 1}/${maxPersistenceRetries} failed:`, err);
                        if (i < maxPersistenceRetries - 1) {
                            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
                        }
                    }
                }
            }
            
            // Set up connection state monitoring with enhanced retry mechanism
            let networkEnabled = false;
            let networkRetryCount = 0;
            const maxNetworkRetries = 5;
            
            const enableNetwork = async () => {
                try {
                    await this.db.enableNetwork();
                    networkEnabled = true;
                    networkRetryCount = 0; // Reset retry count on success
                    console.log('Firestore network enabled');
                    // Remove any existing connection error messages
                    document.querySelectorAll('.firebase-error').forEach(el => el.remove());
                    
                    // Show success message briefly
                    const successMsg = document.createElement('div');
                    successMsg.className = 'firebase-success';
                    successMsg.innerHTML = `
                        <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin: 10px;">
                            <strong>✓ Connected:</strong> Firebase connection established.
                        </div>
                    `;
                    document.body.insertBefore(successMsg, document.body.firstChild);
                    setTimeout(() => successMsg.remove(), 3000);
                } catch (error) {
                    console.warn(`Network enable attempt ${networkRetryCount + 1}/${maxNetworkRetries} failed:`, error);
                    
                    if (!networkEnabled && networkRetryCount < maxNetworkRetries) {
                        networkRetryCount++;
                        const delay = Math.min(1000 * Math.pow(2, networkRetryCount), 10000);
                        this.showConnectionError(`Retrying in ${delay/1000} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        return enableNetwork(); // Retry with exponential backoff
                    } else if (!networkEnabled) {
                        this.showConnectionError('Unable to establish connection. Please check your internet connection.');
                    }
                }
            };
            
            await enableNetwork();
            
            // Monitor online/offline state with error handling
            const unsubscribe = this.db.collection('__health').doc('__connection')
                .onSnapshot(
                    () => {
                        console.log('Connection is active');
                        // Remove any existing error messages
                        document.querySelectorAll('.firebase-error').forEach(el => el.remove());
                    },
                    (error) => {
                        console.warn('Connection error:', error);
                        if (!document.querySelector('.firebase-error')) {
                            this.showConnectionError();
                        }
                    }
                );
            
            // Store unsubscribe function for cleanup
            this._connectionUnsubscribe = unsubscribe;
            
            this.isInitialized = true;
            console.log('Firebase services initialized successfully');
            return true;
        } catch (error) {
            console.error('Firebase initialization error:', error);
            this.showInitializationError(error);
            return false;
        }
    },
    
    showOfflineWarning(message = 'Some features may not work offline') {
        // Remove any existing offline warnings
        document.querySelectorAll('.firebase-warning').forEach(el => el.remove());
        
        const warning = document.createElement('div');
        warning.className = 'firebase-warning';
        warning.innerHTML = `
            <div style="background: #fff3cd; color: #856404; padding: 12px; border-radius: 4px; margin: 10px;">
                <strong>⚠️ Offline Mode Limited:</strong> ${message}
            </div>
        `;
        document.body.insertBefore(warning, document.body.firstChild);
        
        // Auto-remove warning after 10 seconds
        setTimeout(() => warning.remove(), 10000);
    },
    
    showConnectionError(additionalInfo = '') {
        // Remove any existing connection errors
        document.querySelectorAll('.firebase-error').forEach(el => el.remove());
        
        const error = document.createElement('div');
        error.className = 'firebase-error';
        error.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 4px; margin: 10px;">
                <strong>🔄 Connection Lost:</strong> Trying to reconnect automatically...
                ${additionalInfo ? `<br><small>${additionalInfo}</small>` : ''}
                <button onclick="FirebaseService.retryConnection(true)" style="margin-left: 10px; padding: 4px 8px;">
                    Try Now
                </button>
            </div>
        `;
        document.body.insertBefore(error, document.body.firstChild);
    },
    
    showInitializationError(error) {
        // Remove any existing initialization errors
        document.querySelectorAll('.firebase-error').forEach(el => el.remove());
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'firebase-error';
        errorDiv.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 4px; margin: 10px;">
                <strong>❌ Firebase Error:</strong> ${error.message}
                <br>
                <button onclick="FirebaseService.retryInitialization()" style="margin-top: 8px; padding: 4px 8px;">
                    🔄 Try Again
                </button>
            </div>
        `;
        document.body.insertBefore(errorDiv, document.body.firstChild);
    },

    async retryConnection(manual = false) {
        try {
            if (!this.db) {
                throw new Error('Firebase not initialized');
            }
            
            // Show attempting reconnect message
            const status = document.createElement('div');
            status.className = 'firebase-status';
            status.innerHTML = `
                <div style="background: #cce5ff; color: #004085; padding: 12px; border-radius: 4px; margin: 10px;">
                    <strong>↻ Reconnecting:</strong> Attempting to restore connection...
                </div>
            `;
            document.body.insertBefore(status, document.body.firstChild);
            
            // Try to enable network
            await this.db.enableNetwork();
            console.log('Network connection restored');
            
            // Remove error messages
            document.querySelectorAll('.firebase-error, .firebase-status').forEach(el => el.remove());
            
            // Show success message
            const success = document.createElement('div');
            success.className = 'firebase-success';
            success.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin: 10px;">
                    <strong>✓ Connected:</strong> Connection restored successfully.
                </div>
            `;
            document.body.insertBefore(success, document.body.firstChild);
            
            // Remove success message after 3 seconds
            setTimeout(() => success.remove(), 3000);
        } catch (error) {
            console.error('Failed to restore connection:', error);
            
            // If manual retry, show error message
            if (manual) {
                this.showConnectionError();
            }
            
            // Remove status message
            document.querySelectorAll('.firebase-status').forEach(el => el.remove());
            
            // Schedule automatic retry
            setTimeout(() => this.retryConnection(), 5000);
        }
    },
    
    async retryInitialization() {
        // Clear any existing error messages
        document.querySelectorAll('.firebase-error, .firebase-warning, .firebase-status').forEach(el => el.remove());
        
        // Reset initialization state
        this.isInitialized = false;
        
        // Cleanup existing connection
        if (this._connectionUnsubscribe) {
            this._connectionUnsubscribe();
        }
        
        // Try to initialize again
        try {
            await this.initialize();
            
            // Show success message
            const success = document.createElement('div');
            success.className = 'firebase-success';
            success.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin: 10px;">
                    <strong>✓ Initialized:</strong> Firebase services are ready.
                </div>
            `;
            document.body.insertBefore(success, document.body.firstChild);
            
            // Remove success message after 3 seconds
            setTimeout(() => success.remove(), 3000);
        } catch (error) {
            console.error('Retry initialization failed:', error);
            this.showInitializationError(error);
        }
    },

    cleanup() {
        // Unsubscribe from connection monitoring
        if (this._connectionUnsubscribe) {
            this._connectionUnsubscribe();
            this._connectionUnsubscribe = null;
        }
        
        // Reset state
        this.isInitialized = false;
        this.app = null;
        this.auth = null;
        this.storage = null;
        this.db = null;
        
        // Remove any Firebase-related messages
        document.querySelectorAll('.firebase-error, .firebase-warning, .firebase-status, .firebase-success')
            .forEach(el => el.remove());
    },
    
    getUserRole(email) {
        const lowerEmail = email.toLowerCase();
        if (lowerEmail.includes('student')) return 'student';
        if (lowerEmail.includes('faculty')) return 'faculty';
        if (lowerEmail.includes('librarian')) return 'librarian';
        return 'student'; // default to student
    }
};

    return instance;
};

// Create Firebase service singleton with lazy initialization
const FirebaseServiceInstance = createFirebaseService();

// Export the Firebase service singleton
window.FirebaseService = new Proxy(FirebaseServiceInstance, {
    get: function(target, prop) {
        // Ensure we have required Firebase SDK components before any operation
        if (!window.firebase || !window.firebase.app || !window.firebase.auth || !window.firebase.firestore) {
            throw new Error('Firebase SDK not fully loaded. Please wait...');
        }
        return target[prop];
    }
});

// Initialize Firebase services on demand
window.initializeFirebase = async function() {
    try {
        const initialized = await FirebaseServiceInstance.initialize();
        if (initialized) {
            // Export services only after successful initialization
            window.FirebaseAuth = {
                auth: FirebaseServiceInstance.auth,
                storage: FirebaseServiceInstance.storage,
                db: FirebaseServiceInstance.db,
                getUserRole: FirebaseServiceInstance.getUserRole.bind(FirebaseServiceInstance),
                retryConnection: FirebaseServiceInstance.retryConnection.bind(FirebaseServiceInstance)
            };
            return true;
        }
        return false;
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        FirebaseServiceInstance.showInitializationError(error);
        return false;
    }
};
