const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { ERRORS } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization = "" } = req.headers;
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: ERRORS.UNAUTHORIZED });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { _id: '...' }
    return next();
  } catch (e) {
    return res.status(401).send({ message: ERRORS.UNAUTHORIZED });
  }
};
