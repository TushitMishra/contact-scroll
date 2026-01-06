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
// Routes
// =====================
app.use("/api/contacts", contactRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("🔥 Contact Manager API is running");
});

// Health check route (for Railway)
app.get("/api/health", (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ status: state === 1 ? "online" : "offline" });
});

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
