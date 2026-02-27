import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import pool from '../../server/pool.mjs'
import { createTokens } from '../../authFunctions/createToken.mjs'

dotenv.config()

export const registerUser = async (req, res) => {
    // grab the data from the request body
    const { name, username, password } = req.body

    // if anything is missing then reject the request
    // 422 - unproccessable entity
    if( !username || !password ) {
        return res.status(422).send('Must fill out Username & Password fields')
    }

    // check to see if username exists
    const user = await pool.query('SELECT username FROM users WHERE username = $1', [username])

    // check length of result, if result is not 0 then username is already in use
    if(user.rows.length > 0) {
        return res.status(409).send('Username already in use') // 409 - conflict
    }

    const hashPassword = await bcrypt.hash(password, 15)

    // Handle optional name - use null if not provided or convert to lowercase if provided
    const finalName = name ? name.toLowerCase() : username;

    await pool.query(
        'INSERT INTO users (name, username, password, access) VALUES ($1, $2, $3, $4)', 
        [finalName, username.toLowerCase(), hashPassword, 'user']
    );

    return res.status(201).send('User registered successfully')
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(422).send('Must fill out Username & Password fields')
    }

    const user = await pool.query(
        'SELECT id, name, username, password, access FROM users WHERE username = $1',
        [username.toLowerCase()]
    )

    if(user.rows.length === 0) {
        return res.status(401).send('Invalid username or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password)

    if(!passwordMatch) {
        return res.status(401).send('Invalid username or password')
    }
    // creates the access and refresh tokens and returns user data + tokens
    createTokens(user, req, res)
}

export const getMe = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, username, access FROM users WHERE id = $1',
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getMyCards = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM cards WHERE owner_id = $1 ORDER BY category ASC, id ASC',
            [req.user.userId]
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}