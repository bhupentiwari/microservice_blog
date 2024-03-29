import React,{useState} from 'react'
import axios from 'axios';

const CommentCreate = ({postId}) => {

  const [comment, setComment] = useState();

  const commentSubmitHandler = async(e) =>{
    e.preventDefault();
    const res = await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
        'content': comment
    });
    setComment('');
  }

  return (
    <div>
        <form onSubmit={commentSubmitHandler}>
        <div className='form-group'>
                <label>New Comment</label>
                <input value={comment} onChange={(e) => setComment(e.target.value)} className='form-control' />
            </div>
            <button className='btn btn-primary' >Add Comment</button>
        </form>
    </div>
  )
}

export default CommentCreate