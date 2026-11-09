import express from "express";

import {
  triggerSOS,
  getMySOS,
  resolveSOS,
  cancelSOS,
} from "../controllers/sosController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All SOS routes require authentication
router.use(protect);

// Trigger a new SOS alert
router.post("/", triggerSOS);

// Get logged-in user's SOS alerts
router.get("/", getMySOS);

// Resolve an active SOS alert
router.patch("/:id/resolve", resolveSOS);

// Cancel an active SOS alert
router.patch("/:id/cancel", cancelSOS);

export default router;