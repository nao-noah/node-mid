const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const sql = `
    SELECT * FROM blogs
  `;

  db.query(sql, (err, result) => {
    res.status(200).json({ blogs: result });
  });
});

router.post("/", async (req, res) => {
  const {
    body: { content },
  } = req;

  const sql = `
    INSERT INTO blogs (content) VALUES (?)
  `;

  db.query(sql, [content], (err, result) => {
    res.status(201);
  });
});

router.patch("/:id", async (req, res) => {
  const {
    query: { id },
    body: { content },
  } = req;

  const sql = `
    UPDATE blogs
    SET content = ?
    WHERE id = ?
  `;

  db.query(sql, [content, id], (err, result) => {
    res.status(200);
  });
});

router.delete("/:id", async (req, res) => {
  const {
    query: { id },
  } = req;

  const sql = `
    DELETE FROM blogs
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    res.status(204);
  });
});

module.exports = router;
