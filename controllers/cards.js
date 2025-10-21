const PlayerCard = require("../models/playerCard");
const { AppError } = require("../middlewares/errors");
const { ERRORS } = require("../utils/constants");

const listMyCards = async (req, res, next) => {
  try {
    const items = await PlayerCard.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();
    return res.send(items);
  } catch (e) {
    return next(e);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, mime, dataUrl } = req.body;
    const item = await PlayerCard.create({
      name,
      mime,
      dataUrl,
      owner: req.user._id,
    });
    return res.status(201).send(item);
  } catch (e) {
    return next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await PlayerCard.findById(id).select("+owner");
    if (!doc) throw new AppError(404, ERRORS.NOT_FOUND);
    if (!doc.owner.equals(req.user._id)) {
      throw new AppError(403, ERRORS.FORBIDDEN);
    }
    await doc.deleteOne();
    return res.send({ message: "Deleted" });
  } catch (e) {
    return next(e);
  }
};

module.exports = { listMyCards, createCard, deleteCard };
