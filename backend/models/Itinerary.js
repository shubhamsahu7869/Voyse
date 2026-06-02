import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema({
  time: String,
  title: String,
  description: String,
  location: String
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  destination: String,
  travelDates: { start: String, end: String },
  documents: [{ filename: String, path: String, extractedText: String }],
  extractedData: mongoose.Schema.Types.Mixed,
  itinerary: {
    overview: String,
    days: [{
      date: String,
      dayNumber: Number,
      theme: String,
      morning: segmentSchema,
      afternoon: segmentSchema,
      evening: segmentSchema,
      tips: [String]
    }],
    packingList: [String],
    budgetEstimate: mongoose.Schema.Types.Mixed,
    emergencyContacts: [String]
  },
  tags: [String],
  shareSlug: String,
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Itinerary", itinerarySchema);
