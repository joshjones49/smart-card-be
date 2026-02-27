BEGIN;

-- Normalize existing role values to guest/user/admin strings.
UPDATE users
SET access = CASE
    WHEN access IS NULL OR btrim(access) = '' THEN 'user'
    WHEN lower(access) IN ('0', 'guest') THEN 'guest'
    WHEN lower(access) IN ('1', 'user') THEN 'user'
    WHEN lower(access) IN ('2', 'admin') THEN 'admin'
    ELSE 'user'
END;

ALTER TABLE users
ALTER COLUMN access SET DEFAULT 'user';

ALTER TABLE users
ALTER COLUMN access SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'users_access_check'
    ) THEN
        ALTER TABLE users
        ADD CONSTRAINT users_access_check
        CHECK (access IN ('guest', 'user', 'admin'));
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'users_username_key'
    ) THEN
        ALTER TABLE users
        ADD CONSTRAINT users_username_key UNIQUE (username);
    END IF;
END $$;

ALTER TABLE cards
ADD COLUMN IF NOT EXISTS owner_id INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'cards_owner_id_fkey'
    ) THEN
        ALTER TABLE cards
        ADD CONSTRAINT cards_owner_id_fkey
        FOREIGN KEY (owner_id) REFERENCES users(id);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_cards_owner_id ON cards(owner_id);

COMMIT;
