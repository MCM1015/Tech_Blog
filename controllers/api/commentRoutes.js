const router = require('express').Router();
const { Comment } = require('../../models');

//get route
router.get('/', async (req, res) => {
    try {
      const commentData= await Comment.findAll();
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//Comment route
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        //user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//put route
router.put('/:id', async (req, res) => {
    try {
      const updateComment = await Comment.update(req.body, {
        where: {
            id: req.params.id
            //user_id: req.session.user_id,
        }
      });
      res.status(200).json(updateComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//delete route
router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          //user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No Comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
