const express = require("express");
const router = express.Router();
const isAuth = require("../middlerware/is-Auth");
const feedController = require("../controllers/feed");
const { check, body } = require("express-validator");
const { upload } = require("../utils/multer");

router.get("/posts", feedController.getPosts);
router.get("/posts/latest", feedController.getLatestPosts);
router.get("/posts/:userId", feedController.getUsersPost);
router.post("/post/:postID/comment",isAuth,upload.none(),feedController.postComment)
router.get("/post/:postID", feedController.getSinglePost);
router.delete("/post/:postID", isAuth, feedController.deletePost);
router.patch('/post/:postID/comment/delete',isAuth,feedController.deleteComment)
router.post("/post", isAuth, upload.single("imageUrl"), feedController.putPost);
router.patch("/post/:postID", isAuth, upload.single("imageUrl") ,feedController.updatePost);

module.exports = router;
