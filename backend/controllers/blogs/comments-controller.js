const express = require("express");
const db = require("../../db");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    params: { blogId },
    body: { content },
  } = req;

  const sql = `
    INSERT INTO blogs (blogId, content) VALUES (?, ?)
  `;

  db.query(sql, [blogId, content], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(201).send();
  });
});

module.exports = router;
