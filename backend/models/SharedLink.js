import mongoose from "mongoose";

const sharedLinkSchema = new mongoose.Schema({
  itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: "Itinerary", required: true },
  slug: { type: String, required: true, unique: true },
  viewCount: { type: Number, default: 0 },
  expiresAt: Date
}, { timestamps: true });

export default mongoose.model("SharedLink", sharedLinkSchema);
