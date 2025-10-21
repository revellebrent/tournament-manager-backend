const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  signupValidator,
  signinValidator,
} = require("../middlewares/validators");
const { createUser, login } = require("../controllers/users");
const usersRouter = require("./users");
const cardsRouter = require("./playerCards");
const { AppError } = require("../middlewares/errors");
const { ERRORS } = require("../utils/constants");

// Public
router.get("/health", (req, res) => res.send({ status: "ok" }));
router.post("/signup", signupValidator, createUser);
router.post("/signin", signinValidator, login);

// Protected
router.use(auth);
router.use("/users", usersRouter);
router.use("/player-cards", cardsRouter);

// 404
router.use("*", (req, res, next) => next(new AppError(404, ERRORS.NOT_FOUND)));

module.exports = router;
