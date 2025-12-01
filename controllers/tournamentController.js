const Tournament = require("../models/Tournament");
const Bracket = require("../models/Bracket");

exports.createTournament = async (req, res) => {
  try {
    const directorId = req.user._id; // from auth middleware
    const { name, location, startDate, endDate, ageBrackets } = req.body;

    const tournament = await Tournament.create({
      name,
      location,
      startDate,
      endDate,
      director: directorId,
      ageBrackets,
    });

    // Auto-create bracket documents for each age/gender pair
    const bracketDocs = await Promise.all(
      ageBrackets.map((b) =>
        Bracket.create({
          ageGroup: b.ageGroup,
          gender: b.gender,
          tournament: tournament._id,
        })
      )
    );

    // Attach bracket IDs to the tournament
    tournament.brackets = bracketDocs.map((b) => b._id);
    await tournament.save();

    res.status(201).json({ tournament });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating tournament" });
  }
};

exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("brackets");
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tournaments" });
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate({
        path: "brackets",
        populate: { path: "pools" },
      });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tournament" });
  }
};
