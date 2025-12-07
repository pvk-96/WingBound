import { getGeminiModel } from "../config/geminiConfig.js";

// Timeout for Gemini API calls (60 seconds)
const GEMINI_TIMEOUT = 60000;

// Helper function to create a timeout promise
function createTimeoutPromise(timeout) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Gemini API request timeout: The request took too long to complete"));
    }, timeout);
  });
}

export async function callGemini(prompt) {
  try {
    const model = getGeminiModel();
    
    // Race between the API call and timeout
    const result = await Promise.race([
      model.generateContent(prompt),
      createTimeoutPromise(GEMINI_TIMEOUT)
    ]);

    if (!result || !result.response) {
      throw new Error("Invalid response from Gemini API");
    }

    const response = result.response;
    const text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error("Empty response from Gemini API");
    }

    return text;
  } catch (error) {
    // Log the error for debugging
    console.error("Gemini API Error:", error.message);
    
    // Re-throw with more context if it's not already an error
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error(`Gemini API call failed: ${error.message || "Unknown error"}`);
  }
}

