import express = require("express");
const mongoose = require("mongoose");
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());

// Register auth routes
app.use("/api", authRoutes);

let mongoStatus = "Connecting...";
let mongoError = "";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    mongoStatus = "Connected";
    console.log("MongoDB Connected Successfully");
  })
  .catch((err: any) => {
    mongoStatus = "Failed";
    mongoError = err.message;
    console.error("MongoDB Connection Error:", err);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HAMDALA DATA Backend is running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    mongodb: mongoose.connection.readyState,
    status: mongoStatus,
    error: mongoError,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
