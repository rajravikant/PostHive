const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        const error = new Error("Not authenticated");
        next(error) 
    }
  const token = header.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretforever");
  } catch (error) {
    next(createHttpError(404, error.message+' login again'));
  }
  if (!decodedToken) {
   next(createHttpError(401, "Session expired please login again"));
  }
  req.userId = decodedToken.userId;
  next();
};
