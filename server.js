const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// Serve your website
app.use(express.static(path.join(__dirname)));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    message: "TradeAI Analyzer server is running"
  });
});

// Trading analysis endpoint
app.post("/api/analyze", (req, res) => {
  const { symbol, price } = req.body;

  res.json({
    success: true,
    symbol: symbol || "UNKNOWN",
    price: price || null,
    analysis: {
      marketStructure: "Analyzing",
      trend: "Neutral",
      support: null,
      resistance: null,
      entry: null,
      stopLoss: null,
      takeProfit: null,
      riskReward: null
    }
  });
});

// Image/file analysis endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded"
    });
  }

  res.json({
    success: true,
    filename: req.file.originalname,
    size: req.file.size,
    message: "Image received successfully"
  });
});

// Send index.html for normal browser requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`TradeAI Analyzer running on port ${PORT}`);
});
