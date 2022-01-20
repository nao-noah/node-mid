import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([
    { id: 0, content: "Hello", like: true, comments: [{ content: "Hey" }] },
  ]);
  const [newBlog, setNewBlog] = useState("");
  const [newComment, setComment] = useState("");

  useEffect(async () => {
    const res = await axios.get(`http://localhost:8080/blogs`);
    // setBlogs(res.data.blogs);
  }, []);

  const postBlog = (comment) => {
    axios.post(`http://localhost:8080/blogs`, { content: comment });
  };

  const patchBlog = (id) => {
    axios.patch(`http://localhost:8080/blogs/${id}`, {
      content: newBlog,
    });
  };

  const deleteBlog = (id) => {
    axios.patch(`http://localhost:8080/blogs/${id}`);
  };

  const postComment = (blogId, comment) => {
    axios.post(`http://localhost:8080/blogs/${blogId}/comments`, {
      content: comment,
    });
  };

  const postLike = (blogId) => {
    axios.post(`http://localhost:8080/blogs/${blogId}/likes`);
  };

  const deleteLike = (blogId) => {
    axios.delete(`http://localhost:8080/blogs/${blogId}/likes`);
  };

  return (
    <div className="App">
      <div>
        <div>+ Create a new blog</div>
        <div>
          <input
            type="text"
            value={newBlog}
            onChange={(e) => setNewBlog(e.target.value)}
          />
        </div>
      </div>
      <div>
        {blogs.map((blog) => (
          <div>
            <div>Blog Content: {blog.content}</div>
            <div
              onClick={() =>
                setBlogs((prev) => {
                  const newBlogs = [...prev];
                  prev.forEach((_blog) => {
                    if (_blog.id === blog.id) {
                      const c_blog = { ..._blog };
                      c_blog.like = !c_blog.like;
                      newBlogs.push(c_blog);
                      if (c_blog.like) {
                        postLike(c_blog.id);
                      } else {
                        deleteLike(c_blog.id);
                      }
                    } else {
                      newBlogs.push(_blog);
                    }
                  });
                })
              }
            >
              {blog.like ? "★" : "☆"}
            </div>
            <div>
              Comments:
              {blog.comments.map((comment) => (
                <div>{comment.content}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
