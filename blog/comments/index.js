const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post('/posts/:id/comments',async (req,res) =>{    
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const postId = req.params.id;
    const commentPost = commentsByPostId[postId] || [];
    commentPost.push({
        id : commentId,
        content
    });
    commentsByPostId[req.params.id] = commentPost;
    const payLoad =  {
        id :commentId,
        content,
        postId
    };
    console.log('in comment');
    console.log(payLoad);
    
    await axios.post('http://localhost:4005/events',{
        type : 'CommentCreated',
        data : payLoad
    }).catch((err) => {
        console.log(err.message);
    });

    res.status(201).send(commentsByPostId);
});

app.get('/posts/:id/comments',(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/events',(req,res) => {
    console.log(`${req.body.type} event received`);
    console.log(req.body.data);
    res.send({});
  })
  
app.listen(4001,()=>{
    console.log(`Listening on port 4001`)
})