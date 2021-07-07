require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
//1
const postsRouter = require('./posts/posts-router');

const server = express();
const db = require('./data/db');
server.use(helmet());
server.use(express.json());
const cors = require('cors');
server.use(cors());


//2
server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
  res.send(`HELLO I'M WORKING`);
})

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port}***\n`);
});