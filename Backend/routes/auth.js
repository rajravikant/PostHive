const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
router.put(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter a valid email"),
    body("password", "Minimum length should be 8")
      .isLength({ min: 8, max: 16 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match");
      }
      return true;
    }),
  ],

  authController.postSignUp
);
router.post(
  "/login",check("email").isEmail().withMessage("Please enter a valid email"),
  authController.postLogin
);

module.exports = router;
