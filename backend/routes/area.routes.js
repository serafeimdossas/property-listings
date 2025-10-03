const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // get input query param
    const { input } = req.query;

    // check if input exists
    if (!input) {
      return res.status(400).json({ message: "Input parameter not found" });
    }

    // get results for requested param
    const { data } = await axios.get(`${process.env.AREA_SERVICE_URL}`, {
      params: {
        input,
      },
    });

    // return matching areas
    return res.status(200).send(data);
  } catch (error) {
    console.error("Failed to fetch matching areas:", error);
    return res.status(500).json({ message: "Failed to fetch matching areas" });
  }
});

module.exports = router;
