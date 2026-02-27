import dotenv from 'dotenv'
import pool from '../../server/pool.mjs'

dotenv.config()

export const getAllCards = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cards ORDER BY id ASC");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fuzzySearch = async (req, res) => {
    const { search } = req.params;
    
    try {
        const result = await pool.query(
            "SELECT * FROM cards WHERE question ILIKE $1 OR category ILIKE $1 OR answer ILIKE $1",
            [`%${search}%`]
        );
        res.status(200).json(result.rows);    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const createCard = async (req, res) => {
    const { question, answer, category } = req.body;
    const ownerId = req.user?.userId;

    if (!question || !answer || !category) {
        return res.status(400).json({ error: "Please complete all fields" });
    }

    let newCategory = category.toLowerCase();

    if (!['javascript', 'react', 'express'].includes(newCategory)) {
        return res.status(400).json({ error: 'Category not recognized' });
    }

    try {
        const result = await pool.query(
            "INSERT INTO cards (question, answer, category, owner_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [question, answer, newCategory, ownerId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        const cardResult = await pool.query(
            "SELECT id, owner_id FROM cards WHERE id = $1",
            [id]
        );

        if (cardResult.rows.length === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        const card = cardResult.rows[0];
        const isAdmin = req.user?.access === 'admin';
        const isOwner = card.owner_id === req.user?.userId;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ error: "Access denied" });
        }

        const result = await pool.query(
            "DELETE FROM cards WHERE id = $1 RETURNING *",
            [id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editCard = async (req, res) => {
    const { id } = req.params;
    const { question, answer, category } = req.body;

    if (!question || !answer || !category) {
        return res.status(400).json({ error: "Please complete all fields" });
    }

    if (!id) {
        return res.status(400).json({ error: "Card ID is required" });
    }

    let newCategory = category.toLowerCase();

    if (!['javascript', 'react', 'express'].includes(newCategory)) {
        return res.status(400).json({ error: 'Category not recognized' });
    }

    try {
        // Check if the card exists first
        const cardExists = await pool.query("SELECT id, owner_id FROM cards WHERE id = $1", [id]);
        
        if (cardExists.rows.length === 0) {
            return res.status(404).json({ error: "Card not found" });
        }

        const card = cardExists.rows[0];
        const isAdmin = req.user?.access === 'admin';
        const isOwner = card.owner_id === req.user?.userId;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ error: "Access denied" });
        }

        // Update the card
        const result = await pool.query(
            "UPDATE cards SET question = $1, answer = $2, category = $3 WHERE id = $4 RETURNING *",
            [question, answer, newCategory, id]
        );
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}