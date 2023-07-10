import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    let resp = await axios.get(
      `http://localhost:4001/posts/:${props.postId}/comments`
    );
    // console.log(resp.data);
    setComments(resp.data);
    //console.log(comments)

    comments.map(x=> {
        console.log(x);
    })
  };

  useEffect(() => {
    fetchComments();
  }, []);

  let renderComment = Object.values(comments).map((item,index) => {
    console.log(item);
    return <li key={index}  >{item.content}</li>
  });

  return <ul>{renderComment}</ul>;
};

export default CommentList;
