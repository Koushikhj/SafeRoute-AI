
import EmergencyContact from "../models/EmergencyContact.js";
import Notification from "../models/Notification.js";
import { sendMockSMS } from "./mockSmsService.js";

export const createSOSNotifications = async (sos) => {
  try {
    const contacts = await EmergencyContact.find({
      user: sos.user,
    });

    if (contacts.length === 0) {
      return {
        success: false,
        message: "No emergency contacts found",
        count: 0,
      };
    }

    const [longitude, latitude] = sos.location.coordinates;

    const locationLink =
      `https://www.google.com/maps?q=${latitude},${longitude}`;

    const message =
      `EMERGENCY ALERT! An SOS has been triggered on SafeRoute AI. ` +
      `The user's location is: ${locationLink}. ` +
      `Please try to contact them immediately.`;

    // Create pending notification records
    const notifications = await Notification.insertMany(
      contacts.map((contact) => ({
        user: sos.user,
        sos: sos._id,
        emergencyContact: contact._id,
        recipientName: contact.name,
        recipientPhone: contact.phone,
        channel: "sms",
        message,
        status: "pending",
      }))
    );

    // Process each notification using mock SMS
    const processedNotifications = [];

    for (const notification of notifications) {
      const smsResult = await sendMockSMS({
        to: notification.recipientPhone,
        message: notification.message,
      });

      notification.status = smsResult.success
        ? "simulated"
        : "failed";

      notification.providerMessageId =
        smsResult.providerMessageId;

      notification.failureReason = smsResult.success
        ? null
        : smsResult.message;

      await notification.save();

      processedNotifications.push(notification);
    }

    return {
      success: true,
      message: "Mock SMS processing completed",
      count: processedNotifications.length,
      notifications: processedNotifications,
    };
  } catch (error) {
    console.error("Create SOS Notifications Error:", error);
    throw error;
  }
};
