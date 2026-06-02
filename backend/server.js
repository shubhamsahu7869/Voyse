import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import itineraryRoutes from "./routes/itinerary.js";
import shareRoutes from "./routes/share.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map(origin => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) return callback(null, true);
    callback(new Error("Origin is not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.resolve(process.env.UPLOAD_DIR || "uploads")));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/share", shareRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB().catch(console.error).finally(() => app.listen(port, () => console.log(`Voyse API listening on ${port}`)));
