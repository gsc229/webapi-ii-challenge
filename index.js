const express = require('express');
//1
const postsRouter = require('./posts/posts-router');
const server = express();
server.use(express.json());
const db = require('./data/db');

//2
server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
  res.send(`HELLO I'M WORKING`);
})



server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});