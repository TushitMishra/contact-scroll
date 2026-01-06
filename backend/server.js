import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* =====================
   Middleware
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   Routes
===================== */
app.use("/api/contacts", contactRoutes);

// Root check
app.get("/", (req, res) => {
  res.send("🔥 Contact Manager API is running");
});

// Health check (USED BY FRONTEND)
app.get("/api/health", (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({
    status: state === 1 ? "online" : "offline",
  });
});

/* =====================
   Server Start (IMPORTANT FIX)
===================== */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
