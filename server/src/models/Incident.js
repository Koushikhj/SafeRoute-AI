
import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "accident",
        "crime",
        "road_hazard",
        "natural_disaster",
        "medical_emergency",
        "other",
      ],
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "verified", "resolved", "rejected"],
      default: "pending",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index for nearby incident searches
incidentSchema.index({ location: "2dsphere" });

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
