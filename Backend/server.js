const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require('path')

const mongoose = require("mongoose");
require("dotenv").config();

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user');
app.use(express.json());
app.use(cors());

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use(userRoutes)

app.use('/images',express.static(path.join(__dirname, "uploads")))



app.use((error, req, res, next) => {
  res
    .status(error.statusCode)
    .json({ message: error.message || "server error" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App Runnig at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
