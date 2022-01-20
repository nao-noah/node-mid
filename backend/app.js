const express = require("express");
const blogsController = require("./controllers/blogs-controller");
const commentsController = require("./controllers/blogs/comments-controller");
const likesController = require("./controllers/blogs/likes-controller");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/blogs/:blogId/comments", commentsController);
app.use("/blogs/:blogId/likes", likesController);
app.use("/blogs", blogsController);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
