import express from "express";
import blogsController from "./controllers/blogs-controller";
import commentsController from "./controllers/blogs/comments-controller";
import likesController from "./controllers/blogs/likes-controller";

const app = express();
const port = 3000;

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
