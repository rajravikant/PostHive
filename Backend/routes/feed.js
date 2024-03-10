const express = require('express');
const router = express.Router();
const isAuth = require('../middlerware/is-Auth')
const feedController = require('../controllers/feed');


router.get('/posts',feedController.getPosts);
router.get('/posts/:userId',feedController.getUsersPost)
router.get('/post/:postID',feedController.getSinglePost)
router.post('/post',isAuth,feedController.putPost);
router.patch('/post/:postID',isAuth,feedController.updatePost)
router.delete('/post/:postID',isAuth,feedController.deletePost)

module.exports = router;