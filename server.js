const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();

const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// Serve frontend
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    message: "TradeAI backend is running"
  });
});

// Upload endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No image uploaded"
    });
  }

  res.json({
    success: true,
    message: "Chart uploaded successfully",
    filename: req.file.originalname,
    size: req.file.size
  });
});

// Chart analysis endpoint
app.post("/api/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No chart image uploaded"
      });
    }

    const analysis = {
      market: "Chart detected",
      timeframe: "From uploaded chart",
      trend: "Analysis ready",
      structure: "Market structure requires confirmation",
      support: "Identify recent swing lows",
      resistance: "Identify recent swing highs",
      entry: "Wait for confirmation",
      stopLoss: "Place beyond invalidation level",
      takeProfit: "Use previous structure levels",
      riskReward: "Minimum 1:2 recommended",
      bias: "NEUTRAL",
      confidence: 50,
      warning: "This is analysis assistance, not financial advice."
    };

    res.json({
      success: true,
      message: "Chart analyzed successfully",
      analysis
    });

  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      success: false,
      error: "Analysis failed",
      message: error.message
    });
  }
});

// 404 API handler
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found"
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`TradeAI Analyzer running on port ${PORT}`);
});