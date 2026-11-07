
import Incident from "../models/Incident.js";

// REPORT A NEW INCIDENT
export const createIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      severity,
      coordinates,
      address,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !coordinates ||
      coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required incident details",
      });
    }

    const [longitude, latitude] = coordinates;

    // Validate GPS coordinates
    if (
      !Number.isFinite(longitude) ||
      !Number.isFinite(latitude) ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid geographical coordinates",
      });
    }

    const incident = await Incident.create({
      title,
      description,
      category,
      severity,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      address,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Incident reported successfully",
      incident,
    });

  } catch (error) {
    console.error("Create Incident Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while reporting incident",
    });
  }
};

// GET NEARBY INCIDENTS
export const getNearbyIncidents = async (req, res) => {
  try {
    const { longitude, latitude, radius = 5000 } = req.query;

    const lng = Number(longitude);
    const lat = Number(latitude);
    const maxDistance = Number(radius);

    if (
      !Number.isFinite(lng) ||
      !Number.isFinite(lat) ||
      !Number.isFinite(maxDistance) ||
      lng < -180 ||
      lng > 180 ||
      lat < -90 ||
      lat > 90 ||
      maxDistance <= 0 ||
      maxDistance > 50000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid coordinates and radius (maximum 50000 meters)",
      });
    }

    const incidents = await Incident.find({
      status: { $in: ["pending", "verified"] },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistance,
        },
      },
    })
      .populate("reportedBy", "name")
      .limit(100);

    res.status(200).json({
      success: true,
      count: incidents.length,
      incidents,
    });

  } catch (error) {
    console.error("Get Nearby Incidents Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching nearby incidents",
    });
  }
};

// UPDATE INCIDENT STATUS (ADMIN ONLY)
export const updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = [
      "verified",
      "resolved",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident status",
      });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    incident.status = status;

    await incident.save();

    res.status(200).json({
      success: true,
      message: `Incident status updated to ${status}`,
      incident,
    });

  } catch (error) {
    console.error("Update Incident Status Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid incident ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating incident status",
    });
  }
};

