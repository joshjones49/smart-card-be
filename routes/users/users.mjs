import express from 'express'

import { createUserCard, getUserCards, loginUser, registerUser } from './usersFunctions.mjs'
import { authentication } from '../../authFunctions/auth.mjs'

const router = express.Router()

router.post('/register', async (req, res) => {
    await registerUser(req, res)
})

router.post('/login', async (req, res) => {
    await loginUser(req, res)
})

router.post('/create', authentication, async (req, res) => {
    await createUserCard(req, res)
})

router.get('/cards/:id', authentication, async (req, res) => {
    await getUserCards(req, res)
})

export default router