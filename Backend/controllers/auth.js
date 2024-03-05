const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator')


exports.postSignUp = (req, res, next) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const valiResult = validationResult(req);
  if (!valiResult.isEmpty()) {
    return res.status(422).json({error : valiResult.array()[0].msg})
  }
  User.findOne({ email: email })
    .then((found) => {
      if (found) {
        return res
          .status(422)
          .json({ error: "Email already exist"});
      }
      const user = new User({
        name: name,
        email: email,
        password: password,
      });
      return user.save().then((result) => {
        res
          .status(201)
          .json({ message: "user created succesfully you may login", userId: result._id });
      });
    })

    .catch((err) => {
      console.error(err);
    });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  User.findOne({ email: email })
    .then((found) => {
      if (found) {
        if (password === found.password) {
          //adding tokens for authorizing user for the session
          const token = jwt.sign(
            { email: found.email, userId: found._id.toString() },
            "<'your secret code here>",
            { expiresIn: "1h" }
          );
          res.status(200).json({token : token,userId : found._id.toString()})
        } else {
          return res.status(401).json({ message: "Wrong Password" });
        }
      } else {
        return res.status(401).json({ message: "No account exist create one" });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
