
import mongoose from "mongoose";
import SOS from "../models/SOS.js";
import { createSOSNotifications } from "../services/notificationService.js";

// ==========================================
// 1. TRIGGER SOS
// POST /api/sos
// ==========================================
export const triggerSOS = async (req, res) => {
  try {
    const { coordinates, message } = req.body;

    // Validate coordinates
    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      !Number.isFinite(coordinates[0]) ||
      !Number.isFinite(coordinates[1]) ||
      coordinates[0] < -180 ||
      coordinates[0] > 180 ||
      coordinates[1] < -90 ||
      coordinates[1] > 90
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid coordinates [longitude, latitude]",
      });
    }

    // Validate optional message
    if (
      message !== undefined &&
      (typeof message !== "string" || message.length > 500)
    ) {
      return res.status(400).json({
        success: false,
        message: "Message must be a string with a maximum of 500 characters",
      });
    }

    // Create SOS alert
    const sos = await SOS.create({
      user: req.user.id,
      location: {
        type: "Point",
        coordinates,
      },
      message: message?.trim() || "",
    });
    // Prepare notifications for emergency contacts
let notificationResult = null;

try {
  notificationResult = await createSOSNotifications(sos);
} catch (notificationError) {
  console.error(
    "SOS notification preparation failed:",
    notificationError
  );
}

   return res.status(201).json({
  success: true,
  message: "SOS alert created successfully",
  sos,
  notifications: {
    prepared: notificationResult?.success || false,
    count: notificationResult?.count || 0,
    message:
      notificationResult?.message ||
      "Notification preparation could not be completed",
  },
});
  } catch (error) {
    console.error("Trigger SOS Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to trigger SOS alert",
    });
  }
};

// ==========================================
// 2. GET MY SOS ALERTS
// GET /api/sos
// ==========================================
export const getMySOS = async (req, res) => {
  try {
    const sosAlerts = await SOS.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: sosAlerts.length,
      sosAlerts,
    });
  } catch (error) {
    console.error("Get SOS Alerts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve SOS alerts",
    });
  }
};

// ==========================================
// 3. RESOLVE SOS
// PATCH /api/sos/:id/resolve
// ==========================================
export const resolveSOS = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SOS alert ID",
      });
    }

    const sos = await SOS.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
        status: "active",
      },
      {
        $set: {
          status: "resolved",
          resolvedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!sos) {
      const existingSOS = await SOS.findOne({
        _id: id,
        user: req.user.id,
      });

      if (!existingSOS) {
        return res.status(404).json({
          success: false,
          message: "SOS alert not found",
        });
      }

      return res.status(409).json({
        success: false,
        message: "This SOS alert is no longer active",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SOS alert resolved successfully",
      sos,
    });
  } catch (error) {
    console.error("Resolve SOS Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resolve SOS alert",
    });
  }
};

// ==========================================
// 4. CANCEL SOS
// PATCH /api/sos/:id/cancel
// ==========================================
export const cancelSOS = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid SOS alert ID",
      });
    }

    const sos = await SOS.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
        status: "active",
      },
      {
        $set: {
          status: "cancelled",
          resolvedAt: null,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!sos) {
      const existingSOS = await SOS.findOne({
        _id: id,
        user: req.user.id,
      });

      if (!existingSOS) {
        return res.status(404).json({
          success: false,
          message: "SOS alert not found",
        });
      }

      return res.status(409).json({
        success: false,
        message: "This SOS alert is no longer active",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SOS alert cancelled successfully",
      sos,
    });
  } catch (error) {
    console.error("Cancel SOS Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel SOS alert",
    });
  }
};
