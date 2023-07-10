const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const {randomBytes} = require('crypto');
const app = express();
const cors = require('cors');

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(6).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id : commentId, content,status: 'pending'});

    commentsByPostId[req.params.id] = comments;
    console.log('CommentCreated')
    await axios.post('http://localhost:4005/events', {
        type : 'CommentCreated',
        data : {
         id:commentId,
         content,
         postId : req.params.id,
         status : 'pending'
        }
      }).catch((error) => {
        console.log(error.message);
      });

    res.status(200).send(comments);
});

app.post('/events',async (req,res) => {

    const {type,data} = req.body;
    if(type === 'CommentModerated'){
        console.log('CommentModerated')
        const {postId,id,status,content} = data;
        console.log(data)
       
        const comments = commentsByPostId[postId];
        const comment  = comments.find(c => {
            return c.id == id;
        })
        comment.status = status;

    await axios.post('http://localhost:4005', {
        type : 'CommentUpdated',
        data : {
            id,
            status:status,
            postId,
            content
        }
    }).catch((error) => {
        console.log(error.message);
    });

    }
    console.log('Received Event', req.body.type);
    res.send({});
});

app.get('/posts/:id/comments',(req,res)=>{
    const comments = commentsByPostId[req.params.id] || [];
    res.status(200).send(comments);
});


app.listen(4001,()=>{
    console.log('Comment Service Listening on 4001');
})