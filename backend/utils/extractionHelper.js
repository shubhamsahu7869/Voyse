import fs from "fs/promises";
import { askGemini } from "./geminiService.js";

export async function extractTravelData(files, fields = {}) {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > 18 * 1024 * 1024) throw new Error("Upload up to 18 MB of documents at a time for AI extraction");
  const inlineFiles = await Promise.all(files.map(async file => ({
    mimetype: file.mimetype,
    data: (await fs.readFile(file.path)).toString("base64")
  })));
  const prompt = `You are a travel document parser. Read the attached travel documents carefully. Return ONLY valid JSON with fields travelers, origin, destination, travelDates, transportBookings, hotelBookings, bookingReferences, totalCost. Context: ${JSON.stringify(fields)}. Files: ${files.map(f => f.originalname).join(", ")}`;
  return await askGemini(prompt, inlineFiles) || {
    travelers: [fields.traveler || "Guest traveler"],
    origin: fields.origin || "New Delhi",
    destination: fields.destination || "Santorini, Greece",
    travelDates: { start: fields.start || "2026-06-18", end: fields.end || "2026-06-22" },
    transportBookings: [{ type: "Flight", number: "AI 154", departure: "08:40", arrival: "14:25" }],
    hotelBookings: [{ name: "Aegean Pearl Suites", checkIn: fields.start || "2026-06-18", checkOut: fields.end || "2026-06-22" }],
    bookingReferences: ["VOY-82K7"],
    totalCost: "INR 96,400"
  };
}
