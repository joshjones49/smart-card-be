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