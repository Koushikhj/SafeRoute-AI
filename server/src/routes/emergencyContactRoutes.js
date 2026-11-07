import express from "express";

import {
  addEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact,
} from "../controllers/emergencyContactController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addEmergencyContact);
router.get("/", protect, getEmergencyContacts);
router.put("/:id", protect, updateEmergencyContact);
router.delete("/:id", protect, deleteEmergencyContact);

export default router;