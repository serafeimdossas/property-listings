const express = require("express");
require("dotenv").config();
const propertyRoutes = require("./routes/property.routes");
const areaRoutes = require("./routes/area.routes");

const app = express();
const PORT = process.env.BACKEND_PORT || 9000;

app.use(express.json());

app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/areas", areaRoutes);

app.get("/", (_req, res) => {
  return res.status(200).send({ message: "Properties API!" });
});

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
