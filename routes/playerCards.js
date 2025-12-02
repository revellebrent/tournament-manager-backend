const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  uploadPlayerCard,
  shareCardWithCoach,
} = require("../controllers/playerCardController");

// Parent or Coach uploads card
router.post("/", auth, uploadPlayerCard);

// Parent shares card with coach
router.patch("/:cardId/share", auth, shareCardWithCoach);

module.exports = router;

