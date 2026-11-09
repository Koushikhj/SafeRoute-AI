
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SOS",
      required: true,
      index: true,
    },

    emergencyContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencyContact",
      required: true,
    },

    recipientName: {
      type: String,
      required: true,
      trim: true,
    },

    recipientPhone: {
      type: String,
      required: true,
      trim: true,
    },

    channel: {
      type: String,
      enum: ["sms"],
      default: "sms",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
  type: String,
  enum: ["pending", "simulated", "sent", "failed"],
  default: "pending",
  required: true,
},

    providerMessageId: {
      type: String,
      default: null,
    },

    failureReason: {
      type: String,
      default: null,
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ sos: 1, status: 1 });

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;
