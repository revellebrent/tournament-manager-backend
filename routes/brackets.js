const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const roleCheck = require("../middlewares/roleCheck");

const { createPool } = require("../controllers/bracketController");

// ------------------------------
// DIRECTOR: Create a Pool inside a Bracket
// ------------------------------
router.post("/:bracketId/pools", auth, roleCheck("director"), createPool);

module.exports = router;
