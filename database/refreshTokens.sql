DROP TABLE IF EXISTS refresh_tokens;

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    token TEXT,
    owner_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
