const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const roleCheck = require("../middlewares/roleCheck");

const {
  getApplicationsForDirector,
  approveApplication,
} = require("../controllers/applicationController");

// Director sees all applications for their tournaments
router.get("/", auth, roleCheck("director"), getApplicationsForDirector);

// Director approves application
router.patch("/:id/approve", auth, roleCheck("director"), approveApplication);

module.exports = router;
