import express from 'express'

import { getAllCards, fuzzySearch, createCard, deleteCard } from './cardFunctions.mjs'

const router = express.Router()

router.get('/', async (req, res) => {
        await getAllCards(req, res)
});

router.get('/:search', async (req, res) => {
        await fuzzySearch(req, res)
});

router.post('/', async (req, res) => {
    await createCard(req, res)
})

router.delete('/delete/:id', async (req, res) => {
    await deleteCard(req, res)
})

export default router