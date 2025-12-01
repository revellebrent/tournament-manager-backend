const Pool = require("../models/Pool");
const Team = require("../models/Team");

exports.assignTeamToPool = async (req, res) => {
  try {
    const { poolId } = req.params;
    const { teamId } = req.body;

    const pool = await Pool.findById(poolId);
    const team = await Team.findById(teamId);

    if (!pool || !team) {
      return res.status(404).json({ message: "Pool or Team not found" });
    }

    // Add to pool
    pool.teams.push(teamId);
    await pool.save();

    // Update team
    team.pool = poolId;
    await team.save();

    res.json({ message: "Team assigned to pool", pool, team });
  } catch (err) {
    res.status(500).json({ message: "Error assigning team to pool" });
  }
};
