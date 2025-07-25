import express from 'express'

import { getAllCards, fuzzySearch } from './cardFunctions.mjs'

const router = express.Router()

router.get('/', async (req, res) => {
        await getAllCards(req, res)
});

router.get('/:search', async (req, res) => {
        await fuzzySearch(req, res)
});

export default router