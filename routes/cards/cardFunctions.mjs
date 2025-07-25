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

    if (!question || !answer || !category) {
        return res.status(400).json({ error: "Please complete all fields" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO cards (question, answer, category) VALUES ($1, $2, $3) RETURNING *",
            [question, answer, category]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM cards WHERE id = $1", [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}