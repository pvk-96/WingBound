// file: src/config/geminiConfig.js
import dotenv from "dotenv";
dotenv.config(); // load .env here, before reading process.env

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not set. Current env:", process.env);
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: modelName });
};


