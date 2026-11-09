import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import emergencyContactRoutes from "./routes/emergencyContactRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SafeRoute AI backend is running!",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/emergency-contacts", emergencyContactRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;