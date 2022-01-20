const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  let blogs = [];
  let comments = [];

  const sql = `
    SELECT * FROM blogs
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    blogs = result;

    const sql2 = `
    SELECT * FROM comments
  `;

    db.query(sql2, (err, result) => {
      if (err) {
        console.error(err);
        res.status(422);
      }
      comments = result;

      const _blogs = blogs.map((blog) => {
        const _blog = { ...blog };
        _blog.comments = [];

        comments.map((comment) => {
          if (comment.blog_id === blog.id) {
            _blog.comments.push(comment);
          }
        });

        return _blog;
      });

      const resp = { blogs: _blogs };
      console.log("resp", resp);
      res.status(200).json(resp);
    });
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
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(201);
  });
});

router.patch("/:id", async (req, res) => {
  const {
    params: { id },
    body: { content },
  } = req;

  const sql = `
    UPDATE blogs
    SET content = ?
    WHERE id = ?
  `;

  db.query(sql, [content, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(200);
  });
});

router.delete("/:id", async (req, res) => {
  console.log("delete");

  const {
    params: { id },
  } = req;

  const sql = `
    DELETE FROM blogs
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(422);
    }
    res.status(204);
  });
});

module.exports = router;
