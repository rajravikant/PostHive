const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

//async code can throw error but only by calling next(error)
// sync code can throw by throw new error()

exports.getPosts = (req, res, next) => {
  Post.find()
    .populate("creator")
    .then((posts) => {
      if (posts.length <= 0) {
        return res(404).json({message : "No posts found"})
      }
      res.status(200).json({
        posts: posts,
      });
    })
    .catch((err) => {
      const error = new Error("NO POST FOUND");
      error.statusCode = 404;
      return next(error);
    });
};

exports.putPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  let creator;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });

  post
    .save()
    .then((resu) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      if (user) {
        creator = user;
        user.posts.push(post);
        return user.save();
      }
    })
    .then((response) => {
      res.status(201).json({
        message: "Post Created Succesfully",
        posts: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      const error = new Error("Server Error");
      error.statusCode = 404;
      return next(error);
    });
};

exports.getSinglePost = (req, res, next) => {
  const postId = req.params.postID;
  Post.findById(postId)
    .populate("creator")
    .then((result) => {
      if (!result) {
        // const error = new Error("Could not find related post");
        // error.statusCode = 404;
        return res.status(404).json({ error: "Could not find related post" });
      }
      res.status(200).json({ post: result });
    })
    .catch((err) => {
      // console.error(err);
      return res.status(404).json({ error: err });
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postID;
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const imageUrl = req.body.imageUrl.trim();

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error();
        error.message = "No Post Found";
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error();
        error.message = "Error Authentication";
        return res.status(404).json({ error: error });
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;

      return post.save().then((result) => {
        res
          .status(201)
          .json({ post: result, message: "Updated Succesfully !" });
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postID;
  Post.findById(postId)
    .then((result) => {
      if (result) {
        return Post.findByIdAndDelete(postId);
      }
    })
    .then((fin) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
    })
    .then((data) => {
      res.status(200).json({ message: "Deleted Succesfully !", post: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUsersPost = (req, res, next) => {
  const userId = req.params.userId;
  Post.find({ creator: userId })
    .populate("creator")
    .then((result) => {
      if (result.length <= 0) {
        return res
          .status(400)
          .json({ result: "Not post found by user", msg: result });
      }
      res.status(200).json({ result: "Found", posts: result });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

exports.getUser = (req,res,next) =>{
  const id = req.userId;
  if (!id) {
    return res.json(404).json({message : 'No User'})
  }
  User.findById(id).populate('posts').then((user)=>{
    if (!user) {
      return res.json(404).json({message : 'No User'})
    }
    res.status(200).json({user : user})
  }).catch(err =>{
    throw new Error(err);
  })
}


exports.updateUser = (req,res,next) =>{
  const id = req.userId;
  const updateData = req.body.data;
  // User.findByIdAndUpdate(id,{}).then((updatedUser))
}
