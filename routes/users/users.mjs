import express from 'express'

import { getMe, getMyCards, loginUser, registerUser } from './usersFunctions.mjs'
import { authentication } from '../../authFunctions/auth.mjs'

const router = express.Router()

router.post('/register', async (req, res) => {
    await registerUser(req, res)
})

router.post('/login', async (req, res) => {
    await loginUser(req, res)
})

router.get('/me', authentication, async (req, res) => {
    await getMe(req, res)
})

router.get('/me/cards', authentication, async (req, res) => {
    await getMyCards(req, res)
})

export default router