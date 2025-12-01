const PlayerCard = require("../models/PlayerCard");

exports.uploadPlayerCard = async (req, res) => {
  try {
    const { ownerEmail, ownerName, ownerRole, playerName, birthYear, jerseyNumber, fileUrl } =
      req.body;

    const card = await PlayerCard.create({
      ownerEmail,
      ownerName,
      ownerRole,
      playerName,
      birthYear,
      jerseyNumber,
      fileUrl,
    });

    res.status(201).json({ card });
  } catch (err) {
    res.status(500).json({ message: "Error uploading player card" });
  }
};

exports.shareCardWithCoach = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { coachEmail } = req.body;

    const card = await PlayerCard.findById(cardId);
    card.sharedWith.push(coachEmail);
    await card.save();

    res.json({ message: "Card shared with coach", card });
  } catch (err) {
    res.status(500).json({ message: "Error sharing card" });
  }
};
