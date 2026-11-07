
import EmergencyContact from "../models/EmergencyContact.js";

// ADD EMERGENCY CONTACT
export const addEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relationship, isPrimary } = req.body;

    // Validate required fields
    if (!name || !phone || !relationship) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, phone and relationship",
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
    const normalizedPhone = phone.trim();

    if (!/^\+?[0-9]{7,15}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // Check existing contacts
    const contactCount = await EmergencyContact.countDocuments({
      user: req.user.id,
    });

    if (contactCount >= 10) {
      return res.status(400).json({
        success: false,
        message: "You can add a maximum of 10 emergency contacts",
      });
    }

    // Allow only one primary contact per user
    const shouldBePrimary = isPrimary === true || contactCount === 0;

    if (shouldBePrimary) {
      await EmergencyContact.updateMany(
        { user: req.user.id },
        { $set: { isPrimary: false } }
      );
    }

    // Create contact
    const contact = await EmergencyContact.create({
      user: req.user.id,
      name,
      phone: normalizedPhone,
      relationship,
      isPrimary: shouldBePrimary,
    });

    res.status(201).json({
      success: true,
      message: "Emergency contact added successfully",
      contact,
    });

  } catch (error) {
    console.error("Add Emergency Contact Error:", error);

    res.status(500).json({
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

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });

  } catch (error) {
    console.error("Get Emergency Contacts Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching emergency contacts",
    });
  }
};
// UPDATE EMERGENCY CONTACT
export const updateEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relationship, isPrimary } = req.body;

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

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Invalid contact name",
        });
      }
      contact.name = name.trim();
    }

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

    if (relationship !== undefined) {
      const allowedRelationships = [
        "parent", "sibling", "friend",
        "spouse", "relative", "other",
      ];

      if (!allowedRelationships.includes(relationship)) {
        return res.status(400).json({
          success: false,
          message: "Invalid relationship",
        });
      }
      contact.relationship = relationship;
    }

    if (isPrimary !== undefined && typeof isPrimary !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isPrimary must be a boolean",
      });
    }

    if (isPrimary === true) {
      await EmergencyContact.updateMany(
        { user: req.user.id },
        { $set: { isPrimary: false } }
      );
      contact.isPrimary = true;
    } else if (isPrimary === false) {
      contact.isPrimary = false;
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Emergency contact updated successfully",
      contact,
    });

  } catch (error) {
    console.error("Update Emergency Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating emergency contact",
    });
  }
};
// DELETE EMERGENCY CONTACT
export const deleteEmergencyContact = async (req, res) => {
  try {
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

    await EmergencyContact.findByIdAndDelete(contact._id);

    res.status(200).json({
      success: true,
      message: "Emergency contact deleted successfully",
    });

  } catch (error) {
    console.error("Delete Emergency Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting emergency contact",
    });
  }
};