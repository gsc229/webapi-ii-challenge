const router = require('express').Router();
const Posts = require('../data/db');
module.exports = router;


router.get('/', (req, res) => {
  //returns all posts
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
  //findById() takes an id, returns the post corresponding to the id, or empty array
  const id = req.params.id;
  Posts.findById(id)
    .then(post => {
      if (post[0]) {
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
  //insert(postObjy) takes a post obj. adds it to database and returns an object w/id of insertd post {id:123}
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide both a title and contents for the post" })
  } else
    Posts.insert(req.body)
      .then(posts => {
        if (posts) {
          Posts.find()
            .then(posts => {
              res.status(201).json(posts);
            })
        }



      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong with your post" })
      })
})

router.put('/:id', (req, res) => {

  const id = req.params.id;
  const changes = req.body;
  //update(id, changes) returns the count of updated records. if the count is 1 that means the record was updated correctly. 
  Posts.update(id, changes)
    .then(updated => {
      if (updated) {
        Posts.find()
          .then(posts => {
            res.status(200).json(posts);
          })
      } else {
        res.status(404).json({ message: "Looks like that post id doesn't exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong with your post" })
    })

})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  //remove(id) returns the number of records deleted. 
  Posts.remove(id)
    .then(removed => {
      if (removed) {
        Posts.find()
          .then(posts => {
            res.status(200).json(posts);
          })
      } else {
        res.status(404).json({ message: "We don't have that post id" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong while deleting your post" })
    })
})


router.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  Posts.removeComment(id)
    .then(removed => {
      if (removed) {
        Posts.find()
          .then(posts => {
            res.status(200).json(posts);
          })
      } else {
        res.status(404).json({ message: `That id wasn't found` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong while deleting the comment" })
    })
})


router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "We didn't find any posts by that user" })
      }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong retreiving comments" })
    })
})

router.get('/comments/:id', (req, res) => {
  const id = req.params.id;

  Posts.findCommentById(id)
    .then(comment => {
      if (comment) {

        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "Looks like there's no comments" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Looks like something went wrong with query" });
    })
})



router.post('/:id/comments', (req, res) => {
  const postId = req.params.id;
  const comment = req.body;

  Posts.insertComment(comment)
    .then(newId => {
      if (newId) {
        Posts.find()
          .then(posts =>
            res.status(200).json(posts)
          )

      } else {
        res.status(404).json({ message: "There's no post with that id" })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Looks like something went wrong with your post" });
    })

})