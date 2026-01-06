import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// 🔎 DB Health Check Route (MUST BE FIRST)
// =====================
app.get("/api/health", (req, res) => {
  const state = mongoose.connection.readyState;

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (state === 1) {
    return res.status(200).json({ status: "online" });
  } else {
    return res.status(503).json({ status: "offline" });
  }
});

// =====================
// Routes
// =====================
app.use("/api/contacts", contactRoutes);

// =====================
// Root route (NOT JSON)
// =====================
app.get("/", (req, res) => {
  res.send("🔥 Contact Manager API is running");
});

// =====================
// Catch invalid API routes (IMPORTANT)
// =====================
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
