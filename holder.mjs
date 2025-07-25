
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

    if (id > 45) {
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