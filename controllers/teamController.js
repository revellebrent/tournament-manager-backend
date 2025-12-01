const Team = require("../models/Team");
const TeamApplication = require("../models/TeamApplication");

exports.createTeam = async (req, res) => {
  try {
    const coachId = req.user._id;

    const { teamName, clubName, ageGroup, gender } = req.body;

    const team = await Team.create({
      teamName,
      clubName,
      ageGroup,
      gender,
      coach: coachId,
    });

    res.status(201).json({ team });
  } catch (err) {
    res.status(500).json({ message: "Error creating team" });
  }
};

exports.applyToTournament = async (req, res) => {
  try {
    const { teamId, tournamentId, requestedAgeGroup, requestedGender, requestedTier, coachNotes } =
      req.body;

    const application = await TeamApplication.create({
      team: teamId,
      tournament: tournamentId,
      requestedAgeGroup,
      requestedGender,
      requestedTier,
      coachNotes,
      status: "pending",
    });

    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ message: "Error applying to tournament" });
  }
};

exports.assignBracket = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { bracketId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.bracket = bracketId;
    await team.save();

    res.json({ message: "Team assigned to bracket", team });
  } catch (err) {
    res.status(500).json({ message: "Error assigning bracket" });
  }
};
