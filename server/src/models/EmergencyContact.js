
import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
      enum: [
        "parent",
        "sibling",
        "friend",
        "spouse",
        "relative",
        "other",
      ],
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Efficiently find contacts belonging to a user
emergencyContactSchema.index({ user: 1 });

const EmergencyContact = mongoose.model(
  "EmergencyContact",
  emergencyContactSchema
);

export default EmergencyContact;
