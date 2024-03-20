const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

exports.postSignUp = (req, res, next) => {
  const { name, email, password } = req.body;
  const valiResult = validationResult(req);
  if (!valiResult.isEmpty()) {
    return next(createHttpError(416, valiResult.array()[0].msg));
  }
  User.findOne({ email: email })
    .then((found) => {
      if (found) {
        return next(createHttpError(409, "Email already in use"));
      }
      return bycrypt.hash(password, 12).then((hasedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hasedPassword,
        });
        return user.save().then((result) => {
          res.status(201).json({
            message: "user created succesfully you may login",
            userId: result._id,
          });
        });
      });
    })
    .catch((err) => next(err));
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const valiResult = validationResult(req);
  if (!valiResult.isEmpty()) {
    return next(createHttpError(406, valiResult.array()[0].msg));
  }
  User.findOne({ email: email })
    .select("+password +email")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "No account exits!" });
      }
      bycrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            "secretforever",
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            token: token,
            userId: user._id.toString(),
          });
        } else {
          return next(createHttpError(401, "wrong password"));
        }
      });
    })
    .catch((err) => {
      next(err);
    });
};

// if (password === found.password) {
//   //adding tokens for authorizing user for the session
//   const token = jwt.sign(
//     { email: found.email, userId: found._id.toString() },
//     "secretforever",
//     { expiresIn: "1h" }
//   );
//   res.status(200).json({ token: token, userId: found._id.toString() });
// } else {
//   return next(createHttpError(401, "wrong password"));
// }
