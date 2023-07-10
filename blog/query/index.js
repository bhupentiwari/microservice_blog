const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const posts = {};
app.get("/posts", (req, res) => {
  //console.log(`${req.body.type} event received`);
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    let { id, content, postId } = data;
    console.log(data);
    postId =  postId.substring(1, postId.length);
    console.log(`post id : ${postId}`);
    const post =posts[postId];
    console.log(post);
    post.comments.push({ id, content });
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening on port 4002");
});
