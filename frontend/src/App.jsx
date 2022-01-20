import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([
    { id: 0, content: "Hello", like: true, comments: [{ content: "Hey" }] },
  ]);
  const [newBlog, setNewBlog] = useState("");
  const [editBlog, setEditBlog] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(`http://localhost:8080/blogs`);
    setBlogs(res.data.blogs);
  };

  const postBlog = async (comment) => {
    await axios.post(`http://localhost:8080/blogs`, { content: comment });
    getBlogs();
  };

  const patchBlog = async (id) => {
    await axios.patch(`http://localhost:8080/blogs/${id}`, {
      content: editBlog,
    });
    getBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.patch(`http://localhost:8080/blogs/${id}`);
    getBlogs();
  };

  const postComment = async (blogId, comment) => {
    await axios.post(`http://localhost:8080/blogs/${blogId}/comments`, {
      content: comment,
    });
    getBlogs();
  };

  const postLike = async (blogId) => {
    await axios.post(`http://localhost:8080/blogs/${blogId}/likes`);
    getBlogs();
  };

  const deleteLike = async (blogId) => {
    await axios.delete(`http://localhost:8080/blogs/${blogId}/likes`);
    getBlogs();
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
          <button onClick={() => postBlog(newBlog)}>SAVE</button>
        </div>
      </div>
      <div>
        {blogs?.map((blog) => (
          <div>
            <h1>Blog: {blog.content}</h1>
            <button onClick={() => deleteBlog(blog.id)}>
              Delete this blog
            </button>
            <div>
              <input
                type="text"
                value={editBlog}
                onChange={(e) => setEditBlog(e.target.value)}
              />
              <button
                onClick={() => {
                  patchBlog(blog.id);
                }}
              >
                UPDATE
              </button>
            </div>
            <div
              onClick={() =>
                setBlogs((prev) => {
                  const newBlogs = [];
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

                  return newBlogs;
                })
              }
            >
              {blog.like ? "★" : "☆"}
            </div>
            <div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={() => {
                  postComment(blog.id);
                }}
              >
                CREATE
              </button>
            </div>
            <div>
              Comments:
              {blog.comments?.map((comment) => (
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
