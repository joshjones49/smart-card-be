import dotenv from 'dotenv'
import pool from '../pool.mjs';

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