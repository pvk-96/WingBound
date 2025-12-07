export function validateRecommendRequest(req, res, next) {
  const { interests, skills, branch, year, goal } = req.body;

  const missing = [];

  if (!interests) missing.push("interests");
  if (!skills) missing.push("skills");
  if (!branch) missing.push("branch");
  if (!year) missing.push("year");
  if (!goal) missing.push("goal");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields: missing
    });
  }

  // Normalize interests and skills strings to arrays
  if (typeof req.body.interests === "string") {
    req.body.interests = req.body.interests
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (typeof req.body.skills === "string") {
    req.body.skills = req.body.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  next();
}

