const express = require("express");
const router = express.Router();
const isAuth = require("../middlerware/is-Auth");
const Post = require("../models/Post");
const User = require("../models/User");
const { upload } = require("../utils/multer");

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
      return res.status(404).json({ message: "User id not found" });
    }
    const file = req.file.filename;
    User.findByIdAndUpdate(id, { avatar: file })
      .then((result) => {
        return res.status(201).json({message : 'Avatar updated succesfully'})
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.get("/getAvatar", isAuth, (req, res, next) => {
  const id = req.userId;
  User.findById(id)
    .then((user) => {
      if (!user || !user.avatar) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.sendFile(path.join(__dirname, `../uploads/${user.avatar}`));
    })
    .catch((e) => {});
});

module.exports = router;
