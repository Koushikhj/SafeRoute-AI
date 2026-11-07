
import mongoose from "mongoose";
import EmergencyContact from "../models/EmergencyContact.js";

// ADD EMERGENCY CONTACT
export const addEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relationship, isPrimary } = req.body;

    // Validate required fields
    if (!name || !phone || !relationship) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and relationship are required",
      });
    }

    // Validate name
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid name",
      });
    }

    // Validate relationship
    const allowedRelationships = [
      "parent",
      "sibling",
      "friend",
      "spouse",
      "relative",
      "other",
    ];

    if (!allowedRelationships.includes(relationship)) {
      return res.status(400).json({
        success: false,
        message: "Invalid relationship",
      });
    }

    // Validate phone number
    if (
      typeof phone !== "string" ||
      !/^\+?[0-9]{7,15}$/.test(phone.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // Validate isPrimary
    if (isPrimary !== undefined && typeof isPrimary !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isPrimary must be a boolean",
      });
    }

    // Check contact limit
    const contactCount = await EmergencyContact.countDocuments({
      user: req.user.id,
    });

    if (contactCount >= 10) {
      return res.status(400).json({
        success: false,
        message: "You can add a maximum of 10 emergency contacts",
      });
    }

    // First contact automatically becomes primary
    const shouldBePrimary = isPrimary === true || contactCount === 0;

    // If new contact is primary, unset existing primary
    if (shouldBePrimary) {
      await EmergencyContact.updateMany(
        { user: req.user.id },
        { $set: { isPrimary: false } }
      );
    }

    const contact = await EmergencyContact.create({
      user: req.user.id,
      name: name.trim(),
      phone: phone.trim(),
      relationship,
      isPrimary: shouldBePrimary,
    });

    return res.status(201).json({
      success: true,
      message: "Emergency contact added successfully",
      contact,
    });
  } catch (error) {
    console.error("Add emergency contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding emergency contact",
    });
  }
};

// GET ALL EMERGENCY CONTACTS
export const getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({
      user: req.user.id,
    }).sort({
      isPrimary: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get emergency contacts error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching emergency contacts",
    });
  }
};

// UPDATE EMERGENCY CONTACT DETAILS
export const updateEmergencyContact = async (req, res) => {
  try {
    // Validate MongoDB ID
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid emergency contact ID",
      });
    }

    const { name, phone, relationship } = req.body;

    // Primary status must be changed through the dedicated endpoint
    if ("isPrimary" in req.body) {
      return res.status(400).json({
        success: false,
        message: "Use the primary contact endpoint to change primary status",
      });
    }

    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found",
      });
    }

    // Validate and update name
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid name",
        });
      }

      contact.name = name.trim();
    }

    // Validate and update phone
    if (phone !== undefined) {
      if (
        typeof phone !== "string" ||
        !/^\+?[0-9]{7,15}$/.test(phone.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid phone number",
        });
      }

      contact.phone = phone.trim();
    }

    // Validate and update relationship
    if (relationship !== undefined) {
      const allowedRelationships = [
        "parent",
        "sibling",
        "friend",
        "spouse",
        "relative",
        "other",
      ];

      if (!allowedRelationships.includes(relationship)) {
        return res.status(400).json({
          success: false,
          message: "Invalid relationship",
        });
      }

      contact.relationship = relationship;
    }

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Emergency contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Update emergency contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating emergency contact",
    });
  }
};

// DELETE EMERGENCY CONTACT
export const deleteEmergencyContact = async (req, res) => {
  try {
    // Validate MongoDB ID
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid emergency contact ID",
      });
    }

    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found",
      });
    }

    const wasPrimary = contact.isPrimary;

    await EmergencyContact.deleteOne({
      _id: contact._id,
      user: req.user.id,
    });

    // Promote the oldest remaining contact if the primary was deleted
    if (wasPrimary) {
      const nextPrimary = await EmergencyContact.findOne({
        user: req.user.id,
      }).sort({
        createdAt: 1,
        _id: 1,
      });

      if (nextPrimary) {
        nextPrimary.isPrimary = true;
        await nextPrimary.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Emergency contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete emergency contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting emergency contact",
    });
  }
};

// SET PRIMARY EMERGENCY CONTACT
export const setPrimaryContact = async (req, res) => {
  try {
    // Validate MongoDB ID
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid emergency contact ID",
      });
    }

    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found",
      });
    }

    // Unset all existing primary contacts
    await EmergencyContact.updateMany(
      { user: req.user.id },
      { $set: { isPrimary: false } }
    );

    // Set selected contact as primary
    contact.isPrimary = true;
    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Primary emergency contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Set primary contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while setting primary contact",
    });
  }
};
