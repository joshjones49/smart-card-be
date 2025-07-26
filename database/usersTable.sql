DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    access VARCHAR(255)
);

INSERT INTO users (email, password, firstName, lastName, access) VALUES
('johndoe@email.com', '123456', 'John', 'Doe', '1');