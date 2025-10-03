const { PROPERTY_TYPES } = require("../utils/config");

const validatePropertyData = (req, res, next) => {
  try {
    const { title, type, area, area_id, price } = req.body;

    if (!title || title.length === 0 || title.length > 155) {
      return res.status(400).json({
        message:
          "Title must be provided and have a value not greater than 155 chars",
      });
    }

    if (!type || !Object.values(PROPERTY_TYPES).includes(type)) {
      return res.status(400).json({
        message: "Propert type must be provided and be of accepted values",
      });
    }

    if (!area_id || area_id.length === 0 || area_id.length > 255) {
      return res.status(400).json({
        message: "AreaId must be provided",
      });
    }

    if (!area || area.length === 0 || area.length > 255) {
      return res.status(400).json({
        message:
          "Area must be provided and have a value not greater than 255 chars",
      });
    }

    if (!price || !Number.isInteger(price)) {
      return res.status(400).json({
        message: "Price must be provided and be an integer number",
      });
    }

    // all checks not triggered move on
    next();
  } catch (error) {
    console.error("Failed to validate property data:", error);
    return res.status(500).json({ message: "Failed to list property" });
  }
};

module.exports = { validatePropertyData };
