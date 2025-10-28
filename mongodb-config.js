// MongoDB configuration and service
class MongoDBService {
    constructor() {
        // Initialize connection state
        this._isConnected = false;
        this._db = null;
        this._client = null;
        this._connectionMonitor = null;
    }

    async connect() {
        if (this._isConnected) {
            console.log('MongoDB already connected');
            return true;
        }

        try {
            // Show connecting status
            this._showStatus('connecting');

            // Connect to MongoDB Atlas
            const response = await fetch('/.netlify/functions/db-connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to connect to database');
            }

            const data = await response.json();
            
            if (data.success) {
                this._isConnected = true;
                this._showStatus('connected');
                console.log('MongoDB connected successfully');
                
                // Start connection monitoring
                this._startConnectionMonitoring();
                return true;
            } else {
                throw new Error(data.error || 'Connection failed');
            }
        } catch (error) {
            console.error('MongoDB connection error:', error);
            this._showStatus('error', error.message);
            return false;
        }
    }

    _startConnectionMonitoring() {
        // Clear any existing monitor
        if (this._connectionMonitor) {
            clearInterval(this._connectionMonitor);
        }

        // Check connection every 30 seconds
        this._connectionMonitor = setInterval(async () => {
            try {
                const response = await fetch('/.netlify/functions/db-health');
                if (!response.ok) {
                    throw new Error('Health check failed');
                }
                const data = await response.json();
                
                if (!data.healthy) {
                    throw new Error('Database connection unhealthy');
                }

                if (!this._isConnected) {
                    this._isConnected = true;
                    this._showStatus('connected');
                }
            } catch (error) {
                console.warn('MongoDB health check failed:', error);
                this._isConnected = false;
                this._showStatus('error', 'Connection lost. Attempting to reconnect...');
                this.retryConnection();
            }
        }, 30000);
    }

    async retryConnection() {
        console.log('Attempting to reconnect to MongoDB...');
        this._showStatus('connecting');

        try {
            const connected = await this.connect();
            if (!connected) {
                throw new Error('Reconnection failed');
            }
        } catch (error) {
            console.error('MongoDB reconnection failed:', error);
            this._showStatus('error', 'Reconnection failed. Will retry automatically...');
            
            // Schedule another retry in 5 seconds
            setTimeout(() => this.retryConnection(), 5000);
        }
    }

    _showStatus(status, message = '') {
        // Remove any existing status messages
        document.querySelectorAll('.db-status-message').forEach(el => el.remove());

        const statusDiv = document.createElement('div');
        statusDiv.className = 'db-status-message';

        switch (status) {
            case 'connecting':
                statusDiv.innerHTML = `
                    <div style="background: #cce5ff; color: #004085; padding: 12px; border-radius: 4px; margin: 10px;">
                        <strong>↻ Connecting:</strong> Establishing database connection...
                    </div>
                `;
                break;

            case 'connected':
                statusDiv.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin: 10px;">
                        <strong>✓ Connected:</strong> Database connection established.
                    </div>
                `;
                // Remove success message after 3 seconds
                setTimeout(() => statusDiv.remove(), 3000);
                break;

            case 'error':
                statusDiv.innerHTML = `
                    <div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 4px; margin: 10px;">
                        <strong>Database Error:</strong> ${message}
                        <button onclick="MongoDBService.instance.retryConnection()" style="margin-left: 10px; padding: 4px 8px;">
                            🔄 Retry Connection
                        </button>
                    </div>
                `;
                break;
        }

        document.body.insertBefore(statusDiv, document.body.firstChild);
    }

    // Database operations
    async getAllBooks(includeDeleted = false) {
        try {
            const response = await fetch('/.netlify/functions/get-books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ includeDeleted })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();
            return data.books;
        } catch (error) {
            console.error('Error fetching books:', error);
            this._showStatus('error', 'Failed to fetch books. Please try again.');
            throw error;
        }
    }

    async addBook(bookData) {
        try {
            const response = await fetch('/.netlify/functions/add-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            const data = await response.json();
            return data.bookId;
        } catch (error) {
            console.error('Error adding book:', error);
            this._showStatus('error', 'Failed to add book. Please try again.');
            throw error;
        }
    }

    async updateBook(bookId, updates) {
        try {
            const response = await fetch('/.netlify/functions/update-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookId, updates })
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            return true;
        } catch (error) {
            console.error('Error updating book:', error);
            this._showStatus('error', 'Failed to update book. Please try again.');
            throw error;
        }
    }

    async deleteBook(bookId, hardDelete = false) {
        try {
            const response = await fetch('/.netlify/functions/delete-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookId, hardDelete })
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            return true;
        } catch (error) {
            console.error('Error deleting book:', error);
            this._showStatus('error', 'Failed to delete book. Please try again.');
            throw error;
        }
    }
}

// Create and export singleton instance
MongoDBService.instance = new MongoDBService();
window.MongoDBService = MongoDBService.instance;