import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import pool from '../server/pool.mjs'
import { createTokens } from '../../authFunctions/createToken.mjs'

dotenv.config()

export const registerUser = async (req, res) => {
    // grab the data from the request body
    const { email, firstName, lastName, password, access = 1 } = req.body

    // if anything is missing then reject the request
    // 422 - unproccessable entity
    if(!email || !firstName || !lastName || !password ) {
        return res.status(422).send('Fill out all fields')
    }

    // check to see if email exists
    const user = await pool.query('SELECT email FROM users WHERE email = $1', [email])

    // check length of result, if result is not 0 then email is already in use
    if(user.rows.length > 0) {
        return res.status(409).send('Email already in use') // 409 - conflict
    }

    const hashPassword = await bcrypt.hash(password, 15)

    await pool.query(
        'INSERT INTO users (email, firstName, lastName, password, access) VALUES ($1, $2, $3, $4, $5)', [email.toLowerCase(), firstName.toLowerCase(), lastName.toLowerCase(), hashPassword, access]);

    return res.status(201).send('User registered successfully')
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(422).send('Fill in all fields')
    }

    const user = await pool.query('SELECT email FROM users WHERE email = $1', [email])

    if(user.length === 0) {
        return res.status(401).send('Invalid email or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password)

    if(!passwordMatch) {
        return res.status(401).send('Invalid email or password')
    }
    // creates the access and refresh tokens, inserts refresh token into the refresh_token table of the database and returns user id, email, and token in json format
    createTokens(user, req, res)
}