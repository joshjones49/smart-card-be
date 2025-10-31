import express from 'express'

import { getAllCards, fuzzySearch, createCard, deleteCard, editCard } from './cardFunctions.mjs'

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

router.put('/edit/:id', async (req, res) => {
    await editCard(req, res)
})

export default router