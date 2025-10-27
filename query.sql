/* ============================================================
   📚 LIBRARY MANAGEMENT SYSTEM - QUERIES
   Author: Romil
   Database: PostgreSQL
   ============================================================ */

/* ============================================================
   🧑‍💼 1. LIBRARIAN QUERIES
   ============================================================ */

/* 1.1 Librarian Login */
-- Authenticate a librarian using email and password
SELECT * 
FROM librarians 
WHERE email = $1 AND password = $2;


/* 1.2 Check Book Availability (before issuing) */
SELECT available_quantity 
FROM books 
WHERE book_id = $1;


/* 1.3 Issue a Book */
-- (Use in Node.js transaction)
-- Step 1: Insert issue record
INSERT INTO issues (book_id, member_id, due_date)
VALUES ($1, $2, $3);

-- Step 2: Reduce available quantity
UPDATE books
SET available_quantity = available_quantity - 1
WHERE book_id = $1;


/* 1.4 Return a Book */
-- (Use in Node.js transaction)
-- Step 1: Increase available quantity
UPDATE books
SET available_quantity = available_quantity + 1
WHERE book_id = (
  SELECT book_id FROM issues WHERE book_id = $1 AND status = 'Issued'
);

-- Step 2: Update issue status
UPDATE issues
SET return_date = CURRENT_DATE, status = 'Returned'
WHERE book_id = $1 AND status = 'Issued';


/* 1.5 View All Issued or Overdue Books */
SELECT 
  i.issue_id,
  b.title AS book_title,
  m.name AS member_name,
  m.role AS member_role,
  i.issue_date,
  i.due_date,
  i.return_date,
  i.status
FROM issues i
JOIN books b ON i.book_id = b.book_id
JOIN members m ON i.member_id = m.member_id
WHERE i.status IN ('Issued', 'Overdue')
ORDER BY i.due_date;


/* 1.6 View All Books in Library Catalog */
SELECT 
  b.book_id,
  b.title,
  a.name AS author,
  c.category_name AS category,
  b.total_quantity,
  b.available_quantity,
  b.pdf_link
FROM books b
JOIN authors a ON b.author_id = a.author_id
JOIN categories c ON b.category_id = c.category_id
ORDER BY b.title;


/* 1.7 Add a New Book */
INSERT INTO books 
(title, author_id, category_id, isbn, publisher, year_published, total_quantity, available_quantity, pdf_link)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);


/* 1.8 Add a New Member */
INSERT INTO members 
(member_id, password, name, email, phone, address, role)
VALUES ($1, $2, $3, $4, $5, $6, $7);


/* 1.9 Add a New Librarian */
INSERT INTO librarians 
(librarian_id, name, email, password, phone)
VALUES ($1, $2, $3, $4, $5);



/* ============================================================
   👩‍🎓 2. USER (STUDENT/FACULTY) QUERIES
   ============================================================ */

/* 2.1 User Login */
SELECT *
FROM members
WHERE email = $1 AND password = $2;


/* 2.2 View Profile + Borrowed Books */
SELECT 
  m.member_id,
  m.name,
  m.email,
  m.phone,
  m.role,
  b.title AS book_title,
  i.issue_date,
  i.due_date,
  i.return_date,
  i.status
FROM members m
LEFT JOIN issues i ON m.member_id = i.member_id
LEFT JOIN books b ON i.book_id = b.book_id
WHERE m.member_id = $1
ORDER BY i.issue_date DESC;


/* 2.3 View Due (Not Returned) Books */
SELECT 
  b.title,
  i.due_date,
  i.status
FROM issues i
JOIN books b ON i.book_id = b.book_id
WHERE i.member_id = $1 AND i.status IN ('Issued','Overdue')
ORDER BY i.due_date;


/* 2.4 View Library Book List */
SELECT 
  b.book_id,
  b.title,
  a.name AS author,
  c.category_name AS category,
  b.total_quantity,
  b.available_quantity,
  b.pdf_link
FROM books b
JOIN authors a ON b.author_id = a.author_id
JOIN categories c ON b.category_id = c.category_id
ORDER BY b.title;


/* 2.5 Count of Borrowed Books (Dashboard) */
SELECT 
  COUNT(*) AS borrowed_books_count
FROM issues
WHERE member_id = $1 AND status IN ('Issued','Overdue');



/* ============================================================
   ⚙️ 3. ADMIN / DASHBOARD QUERIES
   ============================================================ */

/* 3.1 Overdue Books Alert */
SELECT 
  i.issue_id,
  b.title,
  m.name AS borrower,
  i.due_date,
  CURRENT_DATE - i.due_date AS days_overdue
FROM issues i
JOIN books b ON i.book_id = b.book_id
JOIN members m ON i.member_id = m.member_id
WHERE i.status = 'Issued' AND i.due_date < CURRENT_DATE
ORDER BY i.due_date;


/* 3.2 Get Full Member Details (with total books issued) */
SELECT 
  m.member_id,
  m.name,
  m.email,
  m.phone,
  COUNT(i.issue_id) AS total_issued
FROM members m
LEFT JOIN issues i ON m.member_id = i.member_id
WHERE m.member_id = $1
GROUP BY m.member_id, m.name, m.email, m.phone;


/* 3.3 Update Book Quantity Manually (if needed) */
UPDATE books
SET total_quantity = $1, available_quantity = $2
WHERE book_id = $3;


/* 3.4 Delete Book (Admin only) */
DELETE FROM books
WHERE book_id = $1;

