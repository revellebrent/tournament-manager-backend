const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/tournaments", require("./tournaments"));
router.use("/brackets", require("./brackets"));
router.use("/pools", require("./pools"));
router.use("/teams", require("./teams"));
router.use("/playercards", require("./playercards"));
router.use("/applications", require("./applications"));

module.exports = router;

