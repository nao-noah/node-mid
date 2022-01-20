const express = require("express");
const db = require("../../db");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    query: { blogId },
  } = req;

  const sql = `
    INSERT INTO likes (blog_id) VALUES (?)
  `;

  db.query(sql, [blogId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(201);
  });
});

router.delete("/", async (req, res) => {
  const {
    query: { blogId },
  } = req;

  const sql = `
    DELETE FROM blogs
    WHERE blogId = ?
  `;

  db.query(sql, [blogId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(204);
  });
});

module.exports = router;
