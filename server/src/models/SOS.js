
import mongoose from "mongoose";

const sosSchema = new mongoose.Schema(
  {
    // User who triggered SOS
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Emergency GPS location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (coordinates) =>
            Array.isArray(coordinates) &&
            coordinates.length === 2 &&
            Number.isFinite(coordinates[0]) &&
            Number.isFinite(coordinates[1]) &&
            coordinates[0] >= -180 &&
            coordinates[0] <= 180 &&
            coordinates[1] >= -90 &&
            coordinates[1] <= 90,
          message: "Invalid location coordinates",
        },
      },
    },

    // Optional emergency message
    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    // SOS status
    status: {
      type: String,
      enum: ["active", "resolved", "cancelled"],
      default: "active",
      required: true,
    },

    // SOS resolution time
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index
sosSchema.index({ location: "2dsphere" });

// User SOS history index
sosSchema.index({ user: 1, createdAt: -1 });

const SOS = mongoose.model("SOS", sosSchema);

export default SOS;
