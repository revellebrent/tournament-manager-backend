const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config");
const { AppError } = require("../middlewares/errors");
const { ERRORS } = require("../utils/constants");

const createUser = async (req, res, next) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");
    const name = String(req.body.name || "");
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    return res
      .status(201)
      .send({ email: user.email, name: user.name, _id: user._id });
  } catch (e) {
    return next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").toLowerCase();
    const password = String(req.body.password || "");
    console.log("[signin] body:", { email, havePassword: !!password });

    const user = await User.findOne({ email }).select("+password");
    console.log("[signin] user found?", !!user);

    if (!user) throw new AppError(401, ERRORS.UNAUTHORIZED);

    const ok = await bcrypt.compare(password, user.password);
    console.log("[signin] password matches?", ok);

    if (!ok) throw new AppError(401, ERRORS.UNAUTHORIZED);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.send({ token });
  } catch (e) {
    return next(e);
  }
};

const getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id).select("email name");
    if (!me) throw new AppError(404, ERRORS.NOT_FOUND);
    return res.send(me);
  } catch (e) {
    return next(e);
  }
};

module.exports = { createUser, login, getMe };
