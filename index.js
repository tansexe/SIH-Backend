const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const optimizeRoute = require("./routes/optimizeRoute");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/dtc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Register Routes
app.use("/api", optimizeRoute);

// Default Route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Automated Bus Scheduling and Route Management System API"
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
