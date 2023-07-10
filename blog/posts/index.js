const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const {randomBytes} = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts',(req,res) => {
  res.send(posts);
});


app.post('/posts', async (req,res) => {
  const id = randomBytes(5).toString('hex');
  const {title} = req.body;
  posts[id] = {
    id,title
  };

  await axios.post('http://localhost:4005/events', {
    type : 'PostCreated',
    data : {
      id,title
    }
  }).catch((error) => {
    console.log(error.message);
  });

  res.status(200).send(posts[id]);
});

app.post('/events',(req,res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});


app.listen(4000, ()=>{
  console.log('Post Service Listening on 4000');
})