
CREATE TABLE userCards (
    id SERIAL PRIMARY KEY,
    question VARCHAR(1000) NOT NULL,
    answer VARCHAR(1000) NOT NULL,
    category VARCHAR(255) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);