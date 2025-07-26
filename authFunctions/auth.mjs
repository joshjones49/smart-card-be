// file holds middleware functions for AUTHENTICATION & AUTHORIZATION

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import pool from '../server/pool.mjs'

dotenv.config()

// ensures user is authenticated to hit caertain routes
export const authentication = async (req, res, next) => {
    const accessToken = req.headers.authorization

    if(!accessToken) {
        return res.status(401).send('Token not found')
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.a_token);
        req.user = decodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(200).json({ message: 'Access Token Expired', code: 'AccessTokenExpired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Access Token Invalid', code: 'AcccessTokenInvalid' });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
}

// middleware to ensure user has the correct access level for certain routes
export const authorization = (access = []) => {
    return async (req, res, next) => {
        let user = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.userId]);
        user = user.rows[0];

        if (!user || !access.includes(user.access)) {
            return res.status(403).send('Access Denied')
        }
        next();
    }
}