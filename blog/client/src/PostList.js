import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    console.log(res);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPost = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "40%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <div className="card-body">
            <h4> {post.title}</h4>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPost}
    </div>
  );
};

export default PostList;
