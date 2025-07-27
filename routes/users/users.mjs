import express from 'express'

import { loginUser, registerUser } from './usersFunctions.mjs'

const router = express.Router()

router.post('/register', async (req, res) => {
    await registerUser(req, res)
})

router.post('/login', async (req, res) => {
    await loginUser(req, res)
})

export default router