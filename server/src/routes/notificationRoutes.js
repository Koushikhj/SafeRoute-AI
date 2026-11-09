
import express from "express";

import {
  getMyNotifications,
  retryPendingNotifications,
  getNotificationStats,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All notification routes require authentication
router.use(protect);

// Get notification history
router.get("/", getMyNotifications);

// Retry pending notifications
router.post("/retry", retryPendingNotifications);

// Get notification statistics
router.get("/stats", getNotificationStats);

export default router;
