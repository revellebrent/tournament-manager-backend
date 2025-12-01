const router = require("express").Router();
const { listMyCards, createCard, deleteCard } = require("../controllers/cards");
const {
  createCardValidator,
  idParamValidator,
} = require("../middlewares/validators");

router.get("/", listMyCards);
router.post("/", createCardValidator, createCard);
router.delete("/:id", idParamValidator, deleteCard);

module.exports = router;
