import { buildCareerPrompt } from "../utils/buildPrompt.js";
import { callGemini } from "./geminiService.js";

function cleanJsonText(text) {
  let cleaned = text.trim();

  // Remove ```json or ``` fences if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/^```\s*/i, "");
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace(/```$/, "").trim();
  }

  return cleaned;
}

export async function generateRecommendations(payload) {
  try {
    console.log("Building prompt for Gemini...");
    const prompt = buildCareerPrompt(payload);
    
    console.log("Calling Gemini API...");
    const raw = await callGemini(prompt);
    
    if (!raw || raw.trim().length === 0) {
      throw new Error("Empty response from Gemini API");
    }

    console.log("Cleaning JSON response...");
    const cleaned = cleanJsonText(raw);

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini. Raw response:", cleaned.substring(0, 500));
      const err = new Error("Failed to parse AI response as JSON. The AI may have returned invalid JSON.");
      err.statusCode = 502;
      throw err;
    }

    if (!parsed.career_paths || !Array.isArray(parsed.career_paths)) {
      console.error("Invalid response structure. Parsed data:", JSON.stringify(parsed, null, 2));
      const err = new Error('AI response missing "career_paths" array');
      err.statusCode = 502;
      throw err;
    }

    console.log("Successfully parsed recommendations");
    return parsed;
  } catch (error) {
    console.error("Error in generateRecommendations:", error.message);
    // Re-throw with statusCode if it doesn't have one
    if (error.statusCode) {
      throw error;
    }
    const err = new Error(`Failed to generate recommendations: ${error.message}`);
    err.statusCode = error.statusCode || 500;
    throw err;
  }
}

