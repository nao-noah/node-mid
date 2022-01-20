import express from "express";
import db from "../../db";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    query: { blogId },
    body: { content },
  } = req;

  const sql = `
    INSERT INTO blogs (blogId, content) VALUES (?, ?)
  `;

  db.query(sql, [blogId, content], (err, result) => {
    res.status(201);
  });
});

module.exports = router;
