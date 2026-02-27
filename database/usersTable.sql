DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    access VARCHAR(255) NOT NULL DEFAULT 'user' CHECK (access IN ('guest', 'user', 'admin'))
);
