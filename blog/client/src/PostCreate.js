import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
 const [title,setTitle] =  useState('');

 const submitHandler = async(e) => {
   e.preventDefault();
   let payLoad = { 'title' : title}
   await axios.post('http://localhost:4000/posts',payLoad);
   setTitle('');

 }
  return (
    <div>
        <form onSubmit={submitHandler}>
       
            <div className='form-group'>
                <label>Title</label>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} className='form-control' />
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default PostCreate