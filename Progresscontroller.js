const Progress = require("../models/Progress");

exports.markComplete = async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    const exists = await Progress.findOne({
      user: userId,
      lesson: lessonId
    });

    if (exists) {
      return res.json({ message: "Already completed" });
    }

    await Progress.create({
      user: userId,
      lesson: lessonId
    });

    res.json({ message: "Lesson completed" });

  } catch {
    res.status(500).json({ message: "Failed to save progress" });
  }
};
