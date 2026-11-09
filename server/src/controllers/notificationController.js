
import Notification from "../models/Notification.js";
import { sendMockSMS } from "../services/mockSmsService.js";

// @desc    Get logged-in user's notification history
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = async (req, res) => {
  try {
    // Pagination values
    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const skip = (page - 1) * limit;

    // Find only notifications belonging to logged-in user
    const notifications = await Notification.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "sos emergencyContact recipientName recipientPhone channel message status providerMessageId failureReason sentAt createdAt"
      )
      .lean();

    // Total notification count
    const totalNotifications = await Notification.countDocuments({
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNotifications / limit),
        totalNotifications,
        limit,
      },
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notification history",
    });
  }
};

export const retryPendingNotifications = async (req, res) => {
  try {
    // Find pending notifications belonging to this user
    const pendingNotifications = await Notification.find({
      user: req.user.id,
      status: "pending",
    })
      .sort({ createdAt: 1 })
      .limit(50);

    if (pendingNotifications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No pending notifications found",
        processed: 0,
        simulated: 0,
        failed: 0,
      });
    }

    let simulated = 0;
    let failed = 0;

    for (const notification of pendingNotifications) {
      const result = await sendMockSMS({
        to: notification.recipientPhone,
        message: notification.message,
      });

      if (result.success) {
        notification.status = "simulated";
        notification.providerMessageId =
          result.providerMessageId;
        notification.failureReason = null;
        simulated++;
      } else {
        notification.status = "failed";
        notification.failureReason = result.message;
        notification.providerMessageId = null;
        failed++;
      }

      await notification.save();
    }

    return res.status(200).json({
      success: true,
      message: "Pending notifications processed",
      processed: pendingNotifications.length,
      simulated,
      failed,
    });
  } catch (error) {
    console.error("Retry Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process pending notifications",
    });
  }
};

export const getNotificationStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Count notifications by status
    const [
      total,
      pending,
      simulated,
      sent,
      failed,
    ] = await Promise.all([
      Notification.countDocuments({ user: userId }),
      Notification.countDocuments({
        user: userId,
        status: "pending",
      }),
      Notification.countDocuments({
        user: userId,
        status: "simulated",
      }),
      Notification.countDocuments({
        user: userId,
        status: "sent",
      }),
      Notification.countDocuments({
        user: userId,
        status: "failed",
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Notification statistics retrieved successfully",
      statistics: {
        total,
        pending,
        simulated,
        sent,
        failed,
      },
    });
  } catch (error) {
    console.error("Notification Statistics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notification statistics",
    });
  }
};

