const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default : 'Created Today',
    },
    bio: {
      type: String,
      required : false
    },
    avatar: {
      type: String,
      required : false
    },
 
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
