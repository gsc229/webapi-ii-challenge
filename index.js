const express = require('express');
//1
const postsRouter = require('./posts/posts-router');

const server = express();
const db = require('./data/db');
server.use(express.json());
const cors = require('cors');
server.use(cors());


//2
server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
  res.send(`HELLO I'M WORKING`);
})



server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});