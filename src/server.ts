import express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err: any) => {
    console.error("MongoDB Connection Error:", err);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HAMDALA DATA Backend is running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
