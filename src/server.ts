import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

let mongoStatus = "Connecting...";
let mongoError = "";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    mongoStatus = "Connected";
    console.log("MongoDB Connected Successfully");
  })
  .catch((err: any) => {
    mongoStatus = "Failed";
    mongoError = err.message;
    console.error("MongoDB Connection Error:", err);
  });

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HAMDALA DATA Backend is running",
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    mongodb: mongoose.connection.readyState,
    status: mongoStatus,
    error: mongoError,
  });
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
