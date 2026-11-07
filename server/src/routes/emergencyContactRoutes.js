import express from "express";

import {
  addEmergencyContact,
  getEmergencyContacts,
  updateEmergencyContact,
  deleteEmergencyContact,
   setPrimaryContact,
} from "../controllers/emergencyContactController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addEmergencyContact);
router.get("/", protect, getEmergencyContacts);
router.put("/:id", protect, updateEmergencyContact);
router.delete("/:id", protect, deleteEmergencyContact);
router.patch("/:id/primary", protect, setPrimaryContact);

export default router;