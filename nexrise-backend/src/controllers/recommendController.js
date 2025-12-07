// src/controllers/recommendController.js
import { generateRecommendations } from "../services/recommendationService.js";

export async function recommendController(req, res, next) {
  try {
    console.log("Received recommendation request");
    const { interests, skills, branch, year, goal, experience } = req.body;

    // Validate required fields are present
    if (!interests || !skills || !branch || !year || !goal) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Please provide all required fields: interests, skills, branch, year, and goal"
      });
    }

    console.log("Generating recommendations...");
    const result = await generateRecommendations({
      interests,
      skills,
      branch,
      year,
      goal,
      experience
    });

    console.log("Recommendations generated successfully");

    // Ensure all core keys exist (fallback to empty arrays if missing)
    const safe = {
      career_paths: Array.isArray(result.career_paths) ? result.career_paths : [],
      skills_to_learn: Array.isArray(result.skills_to_learn) ? result.skills_to_learn : [],
      current_skills: Array.isArray(result.current_skills) ? result.current_skills : [],
      roadmap: Array.isArray(result.roadmap) ? result.roadmap : [],
      projects: Array.isArray(result.projects) ? result.projects : [],
      courses: Array.isArray(result.courses) ? result.courses : [],
      internships: Array.isArray(result.internships) ? result.internships : [],
      confusion_matrix: Array.isArray(result.confusion_matrix) ? result.confusion_matrix : []
    };

    return res.status(200).json(safe);
  } catch (err) {
    console.error("Error in recommendController:", err);
    // Ensure error has a statusCode for proper HTTP response
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
