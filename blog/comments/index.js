const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post('/posts/:id/comments',(req,res) =>{    
    const id = randomBytes(4).toString('hex');
    const {content} = req.body;
    const commentPost = commentsByPostId[req.params.id] || [];
    commentPost.push({
        "id" : id,
        "comment" : content
    });
    commentsByPostId[req.params.id] = commentPost;
    res.status(201).send(commentsByPostId);
});

app.get('/posts/:id/comments',(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.get('/posts/:id/test',(req,res) => {
    res.send({"message": "Hello I am up and running"});
})
app.listen(4001,()=>{
    console.log(`Listening on port 4001`)
})