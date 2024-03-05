const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        const error = new Error("Not authenticated");
        error.message = "Header not found";
        throw error; 
    }
  const token = header.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretforever");
  } catch (error) {
    console.error(error);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated : Server error");
    error.message = "401";
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
