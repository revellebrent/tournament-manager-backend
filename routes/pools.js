const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const roleCheck = require("../middlewares/roleCheck");

const { assignTeamToPool } = require("../controllers/poolController");

// Director assigns team to pool
router.patch("/:poolId/assign-team", auth, roleCheck("director"), assignTeamToPool);

module.exports = router;
