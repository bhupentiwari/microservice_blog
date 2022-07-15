import React, { useState, useEffect } from "react";
import axios from "axios";
import { CommentCreate } from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    var postRes = await axios.get("http://localhost:4000/posts");
    //console.log(postRes.data);
    setPosts(postRes.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const renderPost = Object.values(posts).map((item) => {
    console.log(item);
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={item.id}
      >
        <div className="card-body">
          <h3>{item.title}</h3>
          <CommentList postId = {item.id} />
          <CommentCreate  postId = {item.id}/>
        </div>
      
      
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPost}
    </div>
  );
};

export default PostList;
