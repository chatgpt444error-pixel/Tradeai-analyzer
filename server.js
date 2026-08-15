const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the website files
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    message: "TradeAI Analyzer server is running"
  });
});

// Image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "No image uploaded"
    });
  }

  res.json({
    success: true,
    message: "Chart image uploaded successfully",
    filename: req.file.originalname,
    size: req.file.size
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TradeAI Analyzer running on port ${PORT}`);
});