import React, { useState } from "react";
import axios from "axios";

export const CommentCreate = (props) => {
  const [comment, setComment] = useState('');

  console.log(props);
  const submitHandler = async (e) => {
    e.preventDefault();
    let payLoad = { content: comment };
    await axios.post(
      `http://localhost:4001/posts/:${props.postId}/comments`,
      payLoad
    );
    setComment('');
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary btn-sm">Submit</button>
      </form>
    </div>
  );
};
