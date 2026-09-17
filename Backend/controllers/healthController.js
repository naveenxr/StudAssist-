const mongoose = require('mongoose');

const getHealthStatus = (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    message: "Student Support Assistant API is running",
    database: isDbConnected ? "connected" : "disconnected"
  });
};

const getDbHealthStatus = (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    return res.status(200).json({
      success: true,
      message: "MongoDB connection is healthy"
    });
  } else {
    return res.status(503).json({
      success: false,
      message: "MongoDB connection is unavailable",
      database: "disconnected"
    });
  }
};

module.exports = {
  getHealthStatus,
  getDbHealthStatus
};
