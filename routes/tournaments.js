const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const roleCheck = require("../middlewares/roleCheck");

const {
  createTournament,
  getAllTournaments,
  getTournamentById,
} = require("../controllers/tournamentController");

// PUBLIC
router.get("/", getAllTournaments);
router.get("/:id", getTournamentById);

// DIRECTOR-ONLY
router.post("/", auth, roleCheck("director"), createTournament);

module.exports = router;
