-- SQL
-- Create table
CREATE TABLE users (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  age   INT
);

-- Insert data
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@email.com', 28);

-- Reading data
SELECT name, email FROM users WHERE age > 25 ORDER BY name ASC LIMIT 10;