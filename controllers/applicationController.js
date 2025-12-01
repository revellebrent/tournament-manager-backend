const TeamApplication = require("../models/TeamApplication");

exports.getApplicationsForDirector = async (req, res) => {
  try {
    const directorId = req.user._id;

    const apps = await TeamApplication.find()
      .populate("team")
      .populate("tournament");

    // Filter apps to only tournaments owned by director
    const filtered = apps.filter(
      (app) => app.tournament.director.toString() === directorId.toString()
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await TeamApplication.findById(id).populate("team");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "approved";
    await application.save();

    res.json({ message: "Application approved", application });
  } catch (err) {
    res.status(500).json({ message: "Error approving application" });
  }
};
