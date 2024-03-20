const express = require("express");
const cors = require("cors");

const path = require("path");

const createHttpError = require ("http-errors")
const isHttpError = createHttpError.isHttpError;
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(express.json());

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use(userRoutes);

app.use("/images", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App Runnig at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));

app.use((req,res,next)=>{
  next(createHttpError(404,'End Points Not Found'));
})

app.use((error, req, res, next) => {
  let errorMessage = 'Internal Server Error';
  let statusCode = 500;
  if (isHttpError(error) ||error instanceof Error ) {
    statusCode = error.status;
    errorMessage = error.message
  }
  res.status(statusCode).json({ error : errorMessage});
});
