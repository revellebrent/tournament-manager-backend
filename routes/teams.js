const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const roleCheck = require("../middlewares/roleCheck");

const {
  createTeam,
  applyToTournament,
  assignBracket,
} = require("../controllers/teamController");

// COACH creates teams
router.post("/", auth, roleCheck("coach"), createTeam);

// COACH applies to tournaments
router.post("/apply", auth, roleCheck("coach"), applyToTournament);

// DIRECTOR assigns bracket
router.patch("/:teamId/assign-bracket", auth, roleCheck("director"), assignBracket);

module.exports = router;
