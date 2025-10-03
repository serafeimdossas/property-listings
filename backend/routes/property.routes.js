const express = require("express");
const router = express.Router();
const { Property } = require("../db/db");

router.get("/", async (_req, res) => {
  try {
    const properties = await Property.findAll({
      attributes: [
        "title",
        "type",
        "area",
        "price",
        "description",
        "list_date",
      ],
      order: [["list_date", "DESC"]],
    });
    return res.status(200).send(properties);
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return res.status(500).json({ message: "Failed to fetch properties" });
  }
});

router.post("/", async (req, res) => {
  try {
    return res.status(200).send({
      message: "Property successfully listed",
    });
  } catch (error) {
    console.error("Failed to list property:", error);
    return res.status(500).json({ message: "Failed to list property" });
  }
});

module.exports = router;
