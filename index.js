require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./Dbconnect");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/viewtodos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

app.post("/addtodos", (req, res) => {
  const { text } = req.body;
  db.query(
    "INSERT INTO todos (text) VALUES (?)",
    [text],
    (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ id: result.insertId, text });
    }
  );
});

app.delete("/deletetodos/:id", (req, res) => {
  db.query(
    "DELETE FROM todos WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log("DELETE ERROR:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Todo deleted" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
