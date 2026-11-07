
import express from "express";

import {
  createIncident,
  getNearbyIncidents,
  updateIncidentStatus,
} from "../controllers/incidentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Report a new incident (Login required)
router.post("/", protect, createIncident);

// Get nearby incidents (Login required)
router.get("/nearby", protect, getNearbyIncidents);

// Update incident status (Admin only)
router.patch("/:id/status", protect, adminOnly, updateIncidentStatus);

export default router;
