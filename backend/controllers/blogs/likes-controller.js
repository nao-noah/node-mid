const express = require("express");
const db = require("../../db");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const {
    params: { blogId },
  } = req;

  const sql = `
    UPDATE blogs
    SET likes = 1
    WHERE id = ?
  `;

  db.query(sql, [parseInt(blogId)], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(201).send();
  });
});

router.delete("/", async (req, res) => {
  const {
    params: { blogId },
  } = req;

  const sql = `
  UPDATE blogs
  SET likes = 0
  WHERE id = ?
  `;

  db.query(sql, [blogId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(204).send();
  });
});

module.exports = router;
