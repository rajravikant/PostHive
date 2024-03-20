const express = require("express");
const router = express.Router();
const isAuth = require("../middlerware/is-Auth");
const path = require( "path" );
const User = require("../models/User");
const { upload } = require("../utils/multer");
const createHttpError = require("http-errors");

router.get("/user", isAuth, (req, res, next) => {
  const id = req.userId;
  if (!id) {
    return res.json(404).json({ message: "No User" });
  }
  User.findById(id)
    .populate("posts")
    .then((user) => {
      if (!user) {
        return res.json(404).json({ message: "No User" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/user/:userId',(req,res,next)=>{
    const userId=req.params.userId;
    User.findById(userId).then(user => {
      if (!user) {
        next(createHttpError(404,'User not found'));
      }
      return user.populate('posts')
    }).then(user => {
      res.status(200).json(user)
    }).catch(err => next(err))
})

router.get("/allUsers",(req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        next(createHttpError(404, "Not Found"));
      }
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      next(err);
    });
});

router.patch("/user/updateProfile", isAuth, (req, res, next) => {
  const id = req.userId;
  const bio = req.body.about;
  const status = req.body.status;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      user.bio = bio;
      user.status = status;

      return user.save().then(() => {
        return res.status(201).json({ message: "profile updated" });
      });
    })
    .catch((err) => console.log(err));
});

router.patch(
  "/user/upload/avatar",
  isAuth,
  upload.single("avatar"),
  (req, res, next) => {
    const id = req.userId;
    if (!id) {
      return next(createHttpError(404, "User not logged in"));
    }
    const file = req.file.filename;
    User.findByIdAndUpdate(id, { avatar: file })
      .then((result) => {
        return res.status(201).json({message : 'Avatar updated succesfully'})
      })
      .catch((err) => {
       next(err)
      });
  }
);




module.exports = router;
