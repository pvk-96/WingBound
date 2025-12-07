import express from "express";
import cors from "cors";

import recommendRoutes from "./src/routes/recommendRoutes.js";
import { notFoundHandler } from "./src/middleware/notFound.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "NexRise API" });
});

// Routes
app.use("/api/recommend", recommendRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;

