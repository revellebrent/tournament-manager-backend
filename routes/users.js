const express = require("express");
const router = express.Router();

const { login, register, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);

module.exports = router;


