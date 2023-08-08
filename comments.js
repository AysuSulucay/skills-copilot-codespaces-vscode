// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

// parse json data in body of http request
app.use(bodyParser.json());
app.use(cors());

// store comments in memory
const commentsByPostId = {};

// get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// create new comment
app.post('/posts/:id/comments', async (req, res) => {
  // create random id for comment
  const commentId = randomBytes(4).toString('hex');
  // get comment data from body of request
  const { content } = req.body;
  // get comments for post
  const comments = commentsByPostId[req.params.id] || [];
  // add new comment to comments array
  comments.push({ id: commentId, content, status: 'pending' });
  // set comments for post
  commentsByPostId[req.params.id] = comments;
  // emit event to event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' },
  });
  // send response
  res.status(201).send(comments);
});

// receive event from event bus
app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: { id, postId, status, content },
    });
  }
  res.send({});
});

// listen for incoming requests
app.listen(4001, () => {
  console.log('Listening on 4001');
});