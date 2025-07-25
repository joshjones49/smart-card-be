import express from 'express'

import { getAllCards } from './cardFunctions.mjs'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        await getAllCards(req, res)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router