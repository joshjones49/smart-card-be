//install and import dependencies (express, cors, dotenv, pg, nodemon, bcrypt)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const port = 8000;
//initialize express and cors=========================================
const app = express();
app.use(cors());
app.use(express.json());
//initialize dotenv=========================================
dotenv.config();
const { Pool } = pg;
//initialize database connection=========================================
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});
//ROUTES====================================================
//read----------------------
app.get("/cards", async (req, res) => {
  try {
  const result = await pool.query("SELECT * FROM cards ORDER BY id ASC");
  res.status(200).json(result.rows);
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
});
//fuzzy search----------------------
app.get("/cards/:search", async (req, res) => {
  const { search } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM cards WHERE question ILIKE $1 OR category ILIKE $1 OR answer ILIKE $1",
      [`%${search}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//create----------------------
app.post("/cards", async (req, res) => {

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
});
//delete----------------------
app.delete("/cards/:id", async (req, res) => {
  const { id } = req.params;

  if(id > 45) {
    res.status(403).writableHighWaterMark("You cannot delete this card")
    return;
  }

  try {
    const result = await pool.query("DELETE FROM cards WHERE id = $1", [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//LISTENER====================================================
app.listen(port, () => {
  console.log(`SmartCard API running on`, port);
});