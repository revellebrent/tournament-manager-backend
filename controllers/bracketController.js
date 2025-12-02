const Pool = require("../models/Pool");
const Bracket = require("../models/Bracket");

exports.createPool = async (req, res) => {
  try {
    const { bracketId } = req.params;
    const { name, tournament } = req.body;

    // Create the pool
    const pool = await Pool.create({
      name,
      bracket: bracketId,
      tournament,
    });

    // Find and update the bracket
    const bracket = await Bracket.findById(bracketId);
    if (!bracket) {
      return res.status(404).json({ message: "Bracket not found" });
    }

    bracket.pools.push(pool._id);
    await bracket.save();

    return res.status(201).json({ pool });
  } catch (err) {
    console.error("POOL ERROR:", err.message);
    return res.status(500).json({
      message: "Error creating pool",
      error: err.message,
    });
  }
};
