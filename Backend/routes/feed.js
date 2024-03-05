const express = require('express');
const router = express.Router();
const isAuth = require('../middlerware/is-Auth')
const feedController = require('../controllers/feed');
const {check,body} = require('express-validator')


router.get('/posts',feedController.getPosts);
router.get('/posts/:userId',feedController.getUsersPost)
router.get('/post/:postID',feedController.getSinglePost)
router.post('/post',isAuth,feedController.putPost);
router.put('/post/:postID',isAuth,feedController.updatePost)
router.delete('/post/:postID',isAuth,feedController.deletePost)
router.get('/user',isAuth,feedController.getUser)
router.patch('/user',isAuth,feedController.updateUser)
module.exports = router;