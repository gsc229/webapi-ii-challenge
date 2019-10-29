const router = require('express').Router();
const Posts = require('../data/db');
module.exports = router;
router.get('/', (req, res) => {

  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving posts'
      });
    })



});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving posts'
      });
    })
});

router.post('/', (req, res) => {
  Posts.insert(req.body)
    .then(newPost => {

      res.status(200).json(newPost)

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong with your post" })
    })
})