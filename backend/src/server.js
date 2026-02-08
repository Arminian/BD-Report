const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");
const {
  scheduleWeatherUpdates,
  runInitialUpdate,
} = require("./jobs/weatherUpdateJob");

const app = express();
const PORT = process.env.PORT || 5000; // Defaults to port 5000 if .env is missing

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.use("/api/weather", weatherRoutes);

// 404 not found handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// Start the server
const startServer = async () => {
  try {
    // Run initial weather update
    await runInitialUpdate();

    // Schedule recurring updates
    scheduleWeatherUpdates();

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `CORS enabled for: ${process.env.CORS_ORIGIN || "http://localhost:3000"}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Shutdown the server
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});

module.exports = app;
