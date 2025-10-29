import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import pool from '../../server/pool.mjs'
import { createTokens } from '../../authFunctions/createToken.mjs'

dotenv.config()

export const registerUser = async (req, res) => {
    // grab the data from the request body
    const { name, username, password, access = 1 } = req.body

    // if anything is missing then reject the request
    // 422 - unproccessable entity
    if( !username || !password ) {
        return res.status(422).send('Must fill out Username & Password fields')
    }

    // check to see if email exists
    const user = await pool.query('SELECT email FROM users WHERE email = $1', [email])

    // check length of result, if result is not 0 then email is already in use
    if(user.rows.length > 0) {
        return res.status(409).send('Email already in use') // 409 - conflict
    }

    const hashPassword = await bcrypt.hash(password, 15)

    await pool.query(
        'INSERT INTO users (name, username, password, access) VALUES ($1, $2, $3, $4)', [name.toLowerCase(), username.toLowerCase(), hashPassword, access]);

    return res.status(201).send('User registered successfully')
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(422).send('Must fill out Username & Password fields')
    }

    const user = await pool.query('SELECT id, username, password FROM users WHERE email = $1', [username])

    if(user.rows.length === 0) {
        return res.status(401).send('Invalid email or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password)

    if(!passwordMatch) {
        return res.status(401).send('Invalid email or password')
    }
    // creates the access and refresh tokens, inserts refresh token into the refresh_token table of the database and returns user id, email, and token in json format
    createTokens(user, req, res)
}

export const createUserCard = async (req, res) => {
    // get user input from the request body
    const { question, answer, category } = req.body

    if(!question || !answer || !category) {
        return res.status(400).json({ error: error.message })
    }
    
    try {
        const result = await pool.query(
            "INSERT INTO cards (question, answer, category) VALUES ($1, $2, $3) RETURNING *",
            [question, answer, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserCards = async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query(
            'SELECT * FROM userCards WHERE owner_id = $1', [id]
        )
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}