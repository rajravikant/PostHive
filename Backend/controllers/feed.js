const { mongo, default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

//async code can throw error but only by calling next(error)
// sync code can throw by throw new error()

exports.getPosts = async (req, res, next) => {
  const { category, page } = req.query;
  const limit = 4;
  

  if (category) {
    Post.find({ category })
      .exec()
      .then((posts) => {
        if (posts.length > 0) {
          return res.status(200).json({
            posts: posts,
          });
        }
        res.status(404).json({ message: "No post found" });
      })
      .catch((err) => next(err));
  } 
  else if (page) {
    Post.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creator")
      .then((posts) => {
        if (!posts) {
          return next(createHttpError(404, "No posts found"));
        }
        Post.countDocuments().then((cnt) => {
          res.status(200).json({
            posts: posts,
            totalDocs: Math.ceil(cnt / limit),
          });
        });
      })
      .catch((error) => {
        next(createHttpError(error.status, error.message));
      });
 
  }
  
  else {
    Post.find()
      .populate("creator")
      .then((posts) => {
        if (!posts) {
          return next(createHttpError(404, "No posts found"));
        }
          res.status(200).json({posts: posts});
      })
      .catch((error) => {
        next(createHttpError(error.status, error.message));
      });
 
  }
};

exports.putPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.filename;
  const category = req.body.category.toLowerCase();

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    category: category,
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
      });
    })
    .catch((err) => {
      next(createHttpError(404, err.message));
    });
};

exports.postComment = (req, res, next) => {
  const comment = req.body.comment;
  const user = req.userId;
  const postId = req.params.postID;

  const data = {
    user,
    comment,
    commentedAt: mongoose.now(),
  };

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return next(createHttpError(404, "No post found"));
      }
      post.comments.push(data);
      return post
        .save()
        .then((result) => res.status(201).json({ comment: result.comments }));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.body.cmtId;
  const postId = req.params.postID;
  let cmts = [];

  // post.comments.filter((comment) => comment._id.toString() !== commentId.toString());
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return next(createHttpError(404, "No post Found"));
      }
      return post;
    })
    .then((ps) => {
      cmts = ps.comments;
      let temp = cmts.filter(
        (cmt) => cmt._id.toString() !== commentId.toString()
      );

      return Post.findByIdAndUpdate(postId, { comments: temp });
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted Successfully", result });
    })
    .catch((err) => next(err));
};

exports.getSinglePost = (req, res, next) => {
  const postId = req.params.postID;
  Post.findById(postId)
    .populate(["creator", "comments.user"])
    .then((result) => {
      if (!result) {
        return next(createHttpError(404, "Post not found"));
      }
      res.status(200).json({ post: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postID;
  const title = req.body.title;
  const content = req.body.content;
  const category = req.body.category;

  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = req.file.filename;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return next(
          createHttpError(404, "No related post found with given id")
        );
      }
      if (post.creator.toString() !== req.userId) {
        return next(createHttpError(404, "Error Authentication"));
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      post.category = category;
      return post.save().then((result) => {
        res
          .status(201)
          .json({ post: result, message: "Updated Succesfully !" });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postID;
  const userId = req.Post.findById(postId)
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
      next(err);
    });
};

exports.getUsersPost = (req, res, next) => {
  const userId = req.params.userId;
  Post.find({ creator: userId })
    .populate("creator")
    .then((result) => {
      if (!result) {
        return next(createHttpError(404, "No posts found  for this user"));
      }
      res.status(200).json({ posts: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getLatestPosts = (req, res, next) => {
  Post.find().sort('-createdAt').limit(2).then(posts =>{
    if (!posts) {
      return next(createHttpError(404, "No posts found "));
    }
    res.status(200).json({posts,});
  }).catch(err => next(err))
    // res.status(200).json({message : 'Oh fuck'});
};
