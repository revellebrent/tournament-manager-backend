const Bracket = require("../models/Bracket");
const Pool = require("../models/Pool");

exports.createPool = async (req, res) => {
  try {
    const { bracketId } = req.params;
    const { name, tournamentId } = req.body; // "A", "B", "C"

    const pool = await Pool.create({
      name,
      bracket: bracketId,
      tournament: tournamentId,
    });

    // Add pool to bracket
    const bracket = await Bracket.findById(bracketId);
    bracket.pools.push(pool._id);
    await bracket.save();

    res.status(201).json({ pool });
  } catch (err) {
    res.status(500).json({ message: "Error creating pool" });
  }
};
