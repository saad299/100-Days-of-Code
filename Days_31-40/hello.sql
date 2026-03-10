-- SQL
-- Create table
-- CREATE TABLE users (
--   id    INT PRIMARY KEY IDENTITY(1,1),
--   name  VARCHAR(100) NOT NULL,
--   email VARCHAR(255) UNIQUE,
--   age   INT
-- );

-- -- Insert data
-- INSERT INTO users (name, email, age)
-- VALUES ('Alice', 'alice@email.com', 28);
-- VALUES ('Saad', 'saad@email.com', 28);
-- VALUES ('John', 'john@email.com', 28);
-- VALUES ('Joe', 'joe@email.com', 30);

-- Reading data
SELECT TOP 10
  name, email
FROM users
WHERE age > 25
ORDER BY name ASC

SELECT 'Hello from Computer B!' AS Message