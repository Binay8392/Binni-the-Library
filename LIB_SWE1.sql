CREATE TABLE authors(
	author_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	bio TEXT
);

CREATE TABLE categories(
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL
);

CREATE TABLE librarians (
    librarian_id BIGINT PRIMARY KEY,        
    name VARCHAR(100) NOT NULL,            -- Librarian's full name
    email VARCHAR(100) UNIQUE NOT NULL,    -- Login email, must be unique
    password VARCHAR(20) NOT NULL,        -- Hashed password for security
    phone VARCHAR(15),                      -- Optional phone number
    join_date DATE DEFAULT CURRENT_DATE     -- Date the librarian joined
);


CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author_id INT REFERENCES authors(author_id) NOT NULL,
  category_id INT REFERENCES categories(category_id) NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  publisher VARCHAR(100),
  year_published INT,
  total_quantity INT DEFAULT 1,
  available_quantity INT DEFAULT 1,
  pdf_link VARCHAR(500),

  CHECK (available_quantity <= total_quantity),
  CHECK (year_published > 0)
);

CREATE TABLE members (
  member_id BIGINT PRIMARY KEY,
  password VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  address VARCHAR(200),
  join_date DATE DEFAULT CURRENT_DATE,
  role VARCHAR(10),

  CHECK(role IN('Student','Faculty'))
);

CREATE TABLE issues (
  issue_id SERIAL PRIMARY KEY,
  book_id INT REFERENCES books(book_id),
  member_id BIGINT REFERENCES members(member_id),
  issue_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  return_date DATE,
  status VARCHAR(20) DEFAULT 'Issued',

  CHECK (status IN ('Issued', 'Returned', 'Overdue')),
  CHECK (return_date IS NULL OR return_date >= issue_date)

)