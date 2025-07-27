import jwt from 'jsonwebtoken'

import pool from '../server/pool.mjs'

export const createTokens = async (userInfo, req, res) => {
    const user = userInfo.rows[0]

    // create access token for user on login
    const accessToken = jwt.sign(
        {userId: user.id},
        process.env.a_token,
        {subject: 'Access', expiresIn: '2h'}
    )

    const refreshToken = jwt.sign(
        {userId: user.id},
        process.env.r_token,
        {subject: 'Access', expiresIn: '30d'}
    )

    await pool.query('INSERT INTO refresh_tokens (token, owner_id) VALUES ($1, $2)', [
        refreshToken,
        user.id
    ])

    return res.status(200).json({
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken
    })
}