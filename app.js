// Application Data
const AppData = {
    books: [
        {
            id: "1",
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            isbn: "978-0262033848",
            genre: "Computer Science",
            publication_year: 2009,
            description: "A comprehensive textbook on computer algorithms covering design and analysis.",
            status: "available",
            type: "both",
            pdf_url: "#",
            copies_total: 3,
            copies_available: 2,
            rating: 4.5,
            cover_image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop"
        },
        {
            id: "2", 
            title: "Clean Code",
            author: "Robert C. Martin",
            isbn: "978-0132350884",
            genre: "Computer Science",
            publication_year: 2008,
            description: "A handbook of agile software craftsmanship focusing on writing clean, readable code.",
            status: "issued",
            type: "both",
            pdf_url: "#",
            copies_total: 2,
            copies_available: 0,
            rating: 4.7,
            cover_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=300&fit=crop"
        },
        {
            id: "3",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald", 
            isbn: "978-0743273565",
            genre: "Literature",
            publication_year: 1925,
            description: "A classic American novel set in the Jazz Age, exploring themes of wealth and love.",
            status: "available",
            type: "physical",
            pdf_url: null,
            copies_total: 5,
            copies_available: 4,
            rating: 4.2,
            cover_image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop"
        },
        {
            id: "4",
            title: "Calculus: Early Transcendentals",
            author: "James Stewart",
            isbn: "978-1285741550", 
            genre: "Mathematics",
            publication_year: 2015,
            description: "Comprehensive calculus textbook covering limits, derivatives, and integrals.",
            status: "available",
            type: "digital",
            pdf_url: "#",
            copies_total: 0,
            copies_available: 0,
            rating: 4.3,
            cover_image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=200&h=300&fit=crop"
        },
        {
            id: "5",
            title: "Artificial Intelligence: A Modern Approach",
            author: "Stuart Russell",
            isbn: "978-0136042594",
            genre: "Computer Science", 
            publication_year: 2020,
            description: "Leading textbook on artificial intelligence covering machine learning and robotics.",
            status: "available",
            type: "both",
            pdf_url: "#",
            copies_total: 4,
            copies_available: 3,
            rating: 4.6,
            cover_image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&h=300&fit=crop"
        },
        {
            id: "6",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            isbn: "978-0141439518",
            genre: "Literature",
            publication_year: 1813,
            description: "Classic romance novel about Elizabeth Bennet and Mr. Darcy in Georgian England.",
            status: "available", 
            type: "both",
            pdf_url: "#",
            copies_total: 3,
            copies_available: 3,
            rating: 4.4,
            cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
        },
        {
            id: "7",
            title: "Principles of Economics",
            author: "N. Gregory Mankiw",
            isbn: "978-1305585126",
            genre: "Economics",
            publication_year: 2017,
            description: "Introduction to economic principles covering microeconomics and macroeconomics.",
            status: "issued",
            type: "physical",
            pdf_url: null,
            copies_total: 2,
            copies_available: 0,
            rating: 4.1,
            cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=300&fit=crop"
        },
        {
            id: "8",
            title: "Organic Chemistry",
            author: "Paula Y. Bruice",
            isbn: "978-0134042282",
            genre: "Chemistry",
            publication_year: 2016,
            description: "Comprehensive organic chemistry textbook with detailed reaction mechanisms.",
            status: "available",
            type: "both",
            pdf_url: "#",
            copies_total: 3,
            copies_available: 2,
            rating: 4.2,
            cover_image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=300&fit=crop"
        }
    ],
    users: [
        {
            id: "1",
            name: "John Student",
            email: "john.student@iem.edu",
            password: "student123",
            role: "student",
            registration_date: "2024-01-15",
            books_issued: ["2"],
            reading_history: ["1", "5"],
            preferences: ["Computer Science", "Mathematics"]
        },
        {
            id: "2", 
            name: "Dr. Sarah Faculty",
            email: "sarah.faculty@iem.edu",
            password: "faculty123",
            role: "faculty",
            registration_date: "2020-08-10",
            books_issued: [],
            reading_history: ["3", "6", "4"],
            preferences: ["Literature", "Mathematics"]
        },
        {
            id: "3",
            name: "Mike Librarian", 
            email: "mike.librarian@iem.edu",
            password: "librarian123",
            role: "librarian",
            registration_date: "2019-03-20",
            books_issued: [],
            reading_history: [],
            preferences: []
        }
    ],
    transactions: [
        {
            id: "1",
            user_id: "1",
            book_id: "2", 
            issue_date: "2024-10-01",
            due_date: "2024-10-15",
            return_date: null,
            status: "issued",
            fine: 0
        },
        {
            id: "2",
            user_id: "2",
            book_id: "7",
            issue_date: "2024-09-20", 
            due_date: "2024-10-04",
            return_date: null,
            status: "overdue",
            fine: 5
        }
    ],
    requests: [
        {
            id: "1",
            user_id: "1",
            book_id: "3",
            request_date: "2024-10-05",
            status: "pending",
            librarian_notes: ""
        }
    ],
    chatbot_responses: {
        search: [
            "I found several books matching your search. Would you like me to show you the most popular ones?",
            "Here are some great options based on your query. I can also recommend similar books if you'd like!",
            "I've located those books in our catalog. Would you like to see their availability status?"
        ],
        recommendation: [
            "Based on your reading history, I recommend checking out these titles in Computer Science and Mathematics.",
            "Since you enjoyed previous books in this genre, you might also like these similar works.",
            "I notice you read algorithms books before. Here are some advanced topics you might find interesting."
        ],
        help: [
            "I can help you search for books, check availability, or provide recommendations. What would you like to do?",
            "Feel free to ask me about any book in our library, or let me suggest something based on your interests!",
            "I'm here to assist with book searches, recommendations, or general library questions. How can I help?"
        ]
    }
};

// Application State
const AppState = {
    currentUser: null,
    currentSection: 'home',
    filteredBooks: [],
    searchQuery: '',
    selectedGenre: ''
};

// Utility Functions
const Utils = {
    formatDate: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },
    
    calculateDaysOverdue: (dueDate) => {
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = today - due;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    
    generateId: () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    },
    
    getRandomResponse: (category) => {
        const responses = AppData.chatbot_responses[category] || AppData.chatbot_responses.help;
        return responses[Math.floor(Math.random() * responses.length)];
    }
};

// Authentication Module
const Auth = {
    login: (email, password) => {
        const user = AppData.users.find(u => u.email === email && u.password === password);
        if (user) {
            AppState.currentUser = user;
            return true;
        }
        return false;
    },
    
    logout: () => {
        AppState.currentUser = null;
        UI.showPage('landing-page');
        UI.resetDashboard();
    },
    
    getCurrentUser: () => AppState.currentUser,
    
    hasPermission: (permission) => {
        if (!AppState.currentUser) return false;
        
        const permissions = {
            'upload': ['faculty', 'librarian'],
            'admin': ['librarian'],
            'issue': ['student', 'faculty'],
            'manage': ['librarian']
        };
        
        return permissions[permission]?.includes(AppState.currentUser.role) || false;
    }
};

// UI Module
const UI = {
    showPage: (pageId) => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');
    },
    
    showSection: (sectionId) => {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionId}-section`).classList.add('active');
        
        AppState.currentSection = sectionId;
    },
    
    showModal: (modalId) => {
        document.getElementById(modalId).classList.remove('hidden');
    },
    
    hideModal: (modalId) => {
        document.getElementById(modalId).classList.add('hidden');
    },
    
    showError: (elementId, message) => {
        const errorEl = document.getElementById(elementId);
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    },
    
    hideError: (elementId) => {
        document.getElementById(elementId).classList.add('hidden');
    },
    
    resetDashboard: () => {
        AppState.currentSection = 'home';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('[data-section="home"]').classList.add('active');
        
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('home-section').classList.add('active');
    }
};

// Books Module
const Books = {
    getAll: () => AppData.books,
    
    getById: (id) => AppData.books.find(book => book.id === id),
    
    search: (query, genre = '') => {
        let filtered = AppData.books;
        
        if (query) {
            const searchTerm = query.toLowerCase();
            filtered = filtered.filter(book => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.isbn.includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm)
            );
        }
        
        if (genre) {
            filtered = filtered.filter(book => book.genre === genre);
        }
        
        AppState.filteredBooks = filtered;
        return filtered;
    },
    
    getByGenre: (genre) => {
        return AppData.books.filter(book => book.genre === genre);
    },
    
    getIssuedBooks: (userId) => {
        const user = AppData.users.find(u => u.id === userId);
        if (!user) return [];
        
        return user.books_issued.map(bookId => {
            const book = Books.getById(bookId);
            const transaction = AppData.transactions.find(t => 
                t.user_id === userId && t.book_id === bookId && t.status === 'issued'
            );
            return { ...book, transaction };
        }).filter(Boolean);
    },
    
    getReadingHistory: (userId) => {
        const user = AppData.users.find(u => u.id === userId);
        if (!user) return [];
        
        return user.reading_history.map(bookId => Books.getById(bookId)).filter(Boolean);
    },
    
    getRecommendations: (userId) => {
        const user = AppData.users.find(u => u.id === userId);
        if (!user) return AppData.books.slice(0, 3);
        
        // Simple recommendation based on preferences and reading history
        const userGenres = user.preferences;
        const readBooks = new Set(user.reading_history);
        
        return AppData.books
            .filter(book => !readBooks.has(book.id))
            .filter(book => userGenres.includes(book.genre))
            .slice(0, 3);
    },
    
    add: (bookData) => {
        const newBook = {
            id: Utils.generateId(),
            ...bookData,
            status: 'available',
            copies_available: parseInt(bookData.copies_total) || 0,
            rating: 0,
            cover_image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop"
        };
        
        AppData.books.push(newBook);
        return newBook;
    },
    
    requestIssue: (userId, bookId) => {
        const request = {
            id: Utils.generateId(),
            user_id: userId,
            book_id: bookId,
            request_date: new Date().toISOString().split('T')[0],
            status: 'pending',
            librarian_notes: ''
        };
        
        AppData.requests.push(request);
        return request;
    }
};

// Dashboard Module
const Dashboard = {
    initForRole: (role) => {
        // Show/hide navigation items based on role
        const myBooksNav = document.getElementById('my-books-nav');
        const uploadNav = document.getElementById('upload-nav');
        const adminNav = document.getElementById('admin-nav');
        
        myBooksNav.style.display = role === 'librarian' ? 'none' : 'flex';
        uploadNav.style.display = Auth.hasPermission('upload') ? 'flex' : 'none';
        adminNav.style.display = Auth.hasPermission('admin') ? 'flex' : 'none';
        
        // Update user name
        document.getElementById('user-name').textContent = AppState.currentUser.name;
        
        // Update dashboard subtitle
        const subtitles = {
            student: 'Discover and access your favorite books',
            faculty: 'Manage resources and access digital library',
            librarian: 'Oversee library operations and analytics'
        };
        document.getElementById('dashboard-subtitle').textContent = subtitles[role];
        
        // Load dashboard data
        Dashboard.updateStats();
        Dashboard.loadRecentBooks();
        Dashboard.loadRecommendations();
    },
    
    updateStats: () => {
        const totalBooks = AppData.books.length;
        const digitalBooks = AppData.books.filter(book => book.type === 'digital' || book.type === 'both').length;
        const issuedBooks = AppData.transactions.filter(t => t.status === 'issued').length;
        const pendingRequests = AppData.requests.filter(r => r.status === 'pending').length;
        
        document.getElementById('total-books').textContent = totalBooks;
        document.getElementById('digital-books').textContent = digitalBooks;
        document.getElementById('issued-books').textContent = issuedBooks;
        document.getElementById('pending-requests').textContent = pendingRequests;
    },
    
    loadRecentBooks: () => {
        const recentBooks = AppData.books.slice(0, 3);
        const container = document.getElementById('recent-books');
        
        container.innerHTML = recentBooks.map(book => `
            <div class="book-item">
                <div class="item-info">
                    <h4 class="item-title">${book.title}</h4>
                    <p class="item-subtitle">by ${book.author}</p>
                </div>
                <div class="item-actions">
                    ${book.pdf_url ? `<button class="btn btn--sm btn--primary" onclick="Books.viewPDF('${book.id}')">View PDF</button>` : ''}
                </div>
            </div>
        `).join('');
    },
    
    loadRecommendations: () => {
        const recommendations = Books.getRecommendations(AppState.currentUser?.id);
        const container = document.getElementById('recommendations');
        
        container.innerHTML = recommendations.map(book => `
            <div class="book-item">
                <div class="item-info">
                    <h4 class="item-title">${book.title}</h4>
                    <p class="item-subtitle">by ${book.author} • ${book.genre}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn--sm btn--outline" onclick="BooksUI.showBookDetails('${book.id}')">View</button>
                </div>
            </div>
        `).join('');
    }
};

// Books UI Module
const BooksUI = {
    loadBooks: (books = null) => {
        const booksToShow = books || AppData.books;
        const container = document.getElementById('books-grid');
        
        container.innerHTML = booksToShow.map(book => {
            const statusClass = book.status === 'available' ? 'available' : 
                               book.status === 'issued' ? 'issued' : 'digital-only';
            const statusText = book.status === 'available' ? 'Available' :
                              book.status === 'issued' ? 'Issued' : 'Digital Only';
            
            return `
                <div class="book-card">
                    <div class="book-cover">
                        <img src="${book.cover_image}" alt="${book.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="book-cover-placeholder" style="display: none;">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="book-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">by ${book.author}</p>
                        <span class="book-genre">${book.genre}</span>
                        <div class="book-actions">
                            ${book.pdf_url ? `<button class="btn btn--primary" onclick="BooksUI.viewPDF('${book.id}')">View PDF</button>` : ''}
                            ${Auth.hasPermission('issue') && book.copies_available > 0 ? 
                                `<button class="btn btn--outline" onclick="BooksUI.requestBook('${book.id}')">Request</button>` : ''
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    viewPDF: (bookId) => {
        const book = Books.getById(bookId);
        if (book && book.pdf_url) {
            document.getElementById('pdf-title').textContent = book.title;
            UI.showModal('pdf-modal');
        }
    },
    
    requestBook: (bookId) => {
        if (!Auth.getCurrentUser()) {
            alert('Please log in to request books');
            return;
        }
        
        const request = Books.requestIssue(Auth.getCurrentUser().id, bookId);
        if (request) {
            alert('Book request submitted successfully!');
            Dashboard.updateStats();
        }
    },
    
    searchBooks: () => {
        const query = document.getElementById('book-search').value;
        const genre = document.getElementById('genre-filter').value;
        
        AppState.searchQuery = query;
        AppState.selectedGenre = genre;
        
        const results = Books.search(query, genre);
        BooksUI.loadBooks(results);
    }
};

// My Books UI Module
const MyBooksUI = {
    init: () => {
        MyBooksUI.loadIssuedBooks();
        MyBooksUI.loadReadingHistory();
        MyBooksUI.loadMyRequests();
    },
    
    loadIssuedBooks: () => {
        const issuedBooks = Books.getIssuedBooks(Auth.getCurrentUser().id);
        const container = document.getElementById('issued-books-list');
        
        if (issuedBooks.length === 0) {
            container.innerHTML = '<p class="text-center">No books currently issued.</p>';
            return;
        }
        
        container.innerHTML = issuedBooks.map(book => `
            <div class="book-item">
                <div class="item-info">
                    <h4 class="item-title">${book.title}</h4>
                    <p class="item-subtitle">Due: ${Utils.formatDate(book.transaction.due_date)}</p>
                </div>
                <div class="item-actions">
                    ${book.pdf_url ? `<button class="btn btn--sm btn--primary" onclick="BooksUI.viewPDF('${book.id}')">View PDF</button>` : ''}
                    <button class="btn btn--sm btn--outline" onclick="MyBooksUI.renewBook('${book.id}')">Renew</button>
                </div>
            </div>
        `).join('');
    },
    
    loadReadingHistory: () => {
        const history = Books.getReadingHistory(Auth.getCurrentUser().id);
        const container = document.getElementById('reading-history-list');
        
        if (history.length === 0) {
            container.innerHTML = '<p class="text-center">No reading history available.</p>';
            return;
        }
        
        container.innerHTML = history.map(book => `
            <div class="book-item">
                <div class="item-info">
                    <h4 class="item-title">${book.title}</h4>
                    <p class="item-subtitle">by ${book.author} • ${book.genre}</p>
                </div>
                <div class="item-actions">
                    ${book.pdf_url ? `<button class="btn btn--sm btn--primary" onclick="BooksUI.viewPDF('${book.id}')">View PDF</button>` : ''}
                </div>
            </div>
        `).join('');
    },
    
    loadMyRequests: () => {
        const requests = AppData.requests.filter(r => r.user_id === Auth.getCurrentUser().id);
        const container = document.getElementById('my-requests-list');
        
        if (requests.length === 0) {
            container.innerHTML = '<p class="text-center">No requests submitted.</p>';
            return;
        }
        
        container.innerHTML = requests.map(request => {
            const book = Books.getById(request.book_id);
            const statusClass = request.status === 'pending' ? 'warning' : 
                               request.status === 'approved' ? 'success' : 'error';
            
            return `
                <div class="request-item">
                    <div class="item-info">
                        <h4 class="item-title">${book.title}</h4>
                        <p class="item-subtitle">Requested: ${Utils.formatDate(request.request_date)}</p>
                    </div>
                    <div class="item-actions">
                        <span class="status status--${statusClass}">${request.status}</span>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    renewBook: (bookId) => {
        alert('Book renewal request submitted!');
    }
};

// Admin UI Module
const AdminUI = {
    init: () => {
        AdminUI.loadPendingRequests();
        AdminUI.loadOverdueBooks();
        AdminUI.loadUsers();
        AdminUI.initAnalytics();
    },
    
    loadPendingRequests: () => {
        const requests = AppData.requests.filter(r => r.status === 'pending');
        const container = document.getElementById('pending-requests-list');
        
        if (requests.length === 0) {
            container.innerHTML = '<p class="text-center">No pending requests.</p>';
            return;
        }
        
        container.innerHTML = requests.map(request => {
            const book = Books.getById(request.book_id);
            const user = AppData.users.find(u => u.id === request.user_id);
            
            return `
                <div class="request-item">
                    <div class="item-info">
                        <h4 class="item-title">${book.title}</h4>
                        <p class="item-subtitle">Requested by: ${user.name} on ${Utils.formatDate(request.request_date)}</p>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn--sm btn--primary" onclick="AdminUI.approveRequest('${request.id}')">Approve</button>
                        <button class="btn btn--sm btn--outline" onclick="AdminUI.denyRequest('${request.id}')">Deny</button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    loadOverdueBooks: () => {
        const overdueTransactions = AppData.transactions.filter(t => t.status === 'overdue');
        const container = document.getElementById('overdue-books-list');
        
        if (overdueTransactions.length === 0) {
            container.innerHTML = '<p class="text-center">No overdue books.</p>';
            return;
        }
        
        container.innerHTML = overdueTransactions.map(transaction => {
            const book = Books.getById(transaction.book_id);
            const user = AppData.users.find(u => u.id === transaction.user_id);
            const daysOverdue = Utils.calculateDaysOverdue(transaction.due_date);
            
            return `
                <div class="overdue-item">
                    <div class="item-info">
                        <h4 class="item-title">${book.title}</h4>
                        <p class="item-subtitle">${user.name} • ${daysOverdue} days overdue • Fine: $${transaction.fine}</p>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn--sm btn--primary" onclick="AdminUI.sendReminder('${transaction.id}')">Send Reminder</button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    loadUsers: () => {
        const container = document.getElementById('users-list');
        
        container.innerHTML = AppData.users.map(user => `
            <div class="user-item">
                <div class="item-info">
                    <h4 class="item-title">${user.name}</h4>
                    <p class="item-subtitle">${user.email} • ${user.role} • Joined: ${Utils.formatDate(user.registration_date)}</p>
                </div>
                <div class="item-actions">
                    <span class="status status--info">${user.books_issued.length} books issued</span>
                </div>
            </div>
        `).join('');
    },
    
    initAnalytics: () => {
        // Genre Chart
        const genreData = {};
        AppData.books.forEach(book => {
            genreData[book.genre] = (genreData[book.genre] || 0) + 1;
        });
        
        const genreCtx = document.querySelector('#genre-chart canvas').getContext('2d');
        new Chart(genreCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(genreData),
                datasets: [{
                    data: Object.values(genreData),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        
        // Monthly Issues Chart
        const monthlyCtx = document.querySelector('#monthly-chart canvas').getContext('2d');
        new Chart(monthlyCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Books Issued',
                    data: [12, 19, 15, 25, 22, 18],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },
    
    approveRequest: (requestId) => {
        const request = AppData.requests.find(r => r.id === requestId);
        if (request) {
            request.status = 'approved';
            
            // Create transaction
            const transaction = {
                id: Utils.generateId(),
                user_id: request.user_id,
                book_id: request.book_id,
                issue_date: new Date().toISOString().split('T')[0],
                due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                return_date: null,
                status: 'issued',
                fine: 0
            };
            AppData.transactions.push(transaction);
            
            // Update user's issued books
            const user = AppData.users.find(u => u.id === request.user_id);
            user.books_issued.push(request.book_id);
            
            // Update book availability
            const book = Books.getById(request.book_id);
            book.copies_available--;
            if (book.copies_available === 0) {
                book.status = 'issued';
            }
            
            AdminUI.loadPendingRequests();
            Dashboard.updateStats();
            alert('Request approved successfully!');
        }
    },
    
    denyRequest: (requestId) => {
        const request = AppData.requests.find(r => r.id === requestId);
        if (request) {
            request.status = 'denied';
            AdminUI.loadPendingRequests();
            Dashboard.updateStats();
            alert('Request denied.');
        }
    },
    
    sendReminder: (transactionId) => {
        alert('Reminder sent to user!');
    }
};

// Chatbot Module
const Chatbot = {
    init: () => {
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input-field');
        const toggle = document.getElementById('chatbot-toggle');
        const chatbot = document.getElementById('chatbot');
        
        sendBtn.addEventListener('click', Chatbot.sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                Chatbot.sendMessage();
            }
        });
        
        toggle.addEventListener('click', () => {
            chatbot.classList.toggle('minimized');
            const icon = toggle.querySelector('i');
            icon.className = chatbot.classList.contains('minimized') ? 'fas fa-plus' : 'fas fa-minus';
        });
    },
    
    sendMessage: async () => {
        const input = document.getElementById('chatbot-input-field');
        const message = input.value.trim();

        if (!message) return;

        Chatbot.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        const typingMessage = document.createElement('div');
        typingMessage.className = 'bot-message typing';
        typingMessage.innerHTML = `
            <i class="fas fa-robot"></i>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        document.getElementById('chatbot-messages').appendChild(typingMessage);

        try {
            const response = await Chatbot.generateResponse(message);
            // Remove typing indicator
            typingMessage.remove();
            Chatbot.addMessage(response, 'bot');
        } catch (error) {
            // Remove typing indicator
            typingMessage.remove();
            Chatbot.addMessage('Sorry, I\'m having trouble responding right now. Please try again.', 'bot');
        }
    },
    
    addMessage: (text, sender) => {
        const container = document.getElementById('chatbot-messages');
        const messageEl = document.createElement('div');
        messageEl.className = `${sender}-message`;
        
        if (sender === 'bot') {
            messageEl.innerHTML = `
                <i class="fas fa-robot"></i>
                <div class="message-content">${text}</div>
            `;
        } else {
            messageEl.innerHTML = `
                <div class="message-content">${text}</div>
            `;
        }
        
        container.appendChild(messageEl);
        container.scrollTop = container.scrollHeight;
    },
    
    generateResponse: async (message) => {
        try {
            // Get current user context
            const currentUser = Auth.getCurrentUser();
            let context = '';

            if (currentUser) {
                context = `Current user: ${currentUser.name} (${currentUser.role}). `;
                context += `Library has ${AppData.books.length} total books, ${AppData.books.filter(b => b.status === 'available').length} currently available. `;

                if (currentUser.role === 'student' || currentUser.role === 'faculty') {
                    const issuedBooks = Books.getIssuedBooks(currentUser.id);
                    context += `User has ${issuedBooks.length} books issued. `;
                }
            }

            // Call OpenAI API
            const response = await window.OpenAIConfig.callOpenAI(message, context);
            return response;
        } catch (error) {
            console.error('OpenAI API error:', error);
            // Fallback to static responses if API fails
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('book')) {
                return Utils.getRandomResponse('search');
            } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
                return Utils.getRandomResponse('recommendation');
            } else {
                return Utils.getRandomResponse('help');
            }
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Landing page role selection
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', () => {
            const role = card.dataset.role;
            document.getElementById('login-title').textContent = `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
            UI.showModal('login-modal');
        });
    });
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (Auth.login(email, password)) {
            UI.hideModal('login-modal');
            UI.showPage('dashboard-page');
            Dashboard.initForRole(Auth.getCurrentUser().role);
            BooksUI.loadBooks();
        } else {
            UI.showError('login-error', 'Invalid email or password');
        }
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.classList.add('hidden');
        });
    });
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const section = link.dataset.section;
            UI.showSection(section);
            
            // Load section-specific data
            if (section === 'books') {
                BooksUI.loadBooks();
            } else if (section === 'my-books') {
                MyBooksUI.init();
            } else if (section === 'admin') {
                AdminUI.init();
            }
        });
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', Auth.logout);
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', BooksUI.searchBooks);
    document.getElementById('book-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            BooksUI.searchBooks();
        }
    });
    document.getElementById('genre-filter').addEventListener('change', BooksUI.searchBooks);
    
    // Upload form
    document.getElementById('upload-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const pdfFile = document.getElementById('book-pdf').files[0];

        let pdfUrl = null;
        if (pdfFile) {
            try {
                // Upload PDF to Firebase Storage
                const storageRef = window.FirebaseAuth.storage.ref();
                const pdfRef = storageRef.child(`books/${Date.now()}_${pdfFile.name}`);
                const uploadTask = await pdfRef.put(pdfFile);
                pdfUrl = await uploadTask.ref.getDownloadURL();
            } catch (error) {
                console.error('Error uploading PDF:', error);
                alert('Error uploading PDF. Please try again.');
                return;
            }
        }

        const bookData = {
            title: formData.get('title') || document.getElementById('book-title').value,
            author: formData.get('author') || document.getElementById('book-author').value,
            isbn: formData.get('isbn') || document.getElementById('book-isbn').value,
            genre: formData.get('genre') || document.getElementById('book-genre').value,
            publication_year: parseInt(formData.get('year') || document.getElementById('book-year').value),
            description: formData.get('description') || document.getElementById('book-description').value,
            copies_total: parseInt(formData.get('copies') || document.getElementById('book-copies').value),
            type: pdfUrl ? 'both' : 'physical',
            pdf_url: pdfUrl
        };

        Books.add(bookData);
        alert('Book uploaded successfully!');
        e.target.reset();
        Dashboard.updateStats();
    });
    
    // Tab switching
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tab = e.target.dataset.tab;
            
            // Update tab buttons
            e.target.parentElement.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update tab content
            const container = e.target.closest('.my-books-tabs').parentElement;
            container.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            container.querySelector(`#${tab}-tab`).classList.add('active');
        }
        
        if (e.target.classList.contains('admin-tab-btn')) {
            const tab = e.target.dataset.tab;
            
            // Update tab buttons
            e.target.parentElement.querySelectorAll('.admin-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update tab content
            document.querySelectorAll('.admin-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`#admin-${tab}`).classList.add('active');
        }
    });
    
    // Initialize chatbot
    Chatbot.init();
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });
});