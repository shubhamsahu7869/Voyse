import { nanoid } from "nanoid";
import Itinerary from "../models/Itinerary.js";
import SharedLink from "../models/SharedLink.js";

export async function createShare(req, res) {
  const itinerary = await Itinerary.findOne({ _id: req.params.itineraryId, userId: req.user.id });
  if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
  let link = await SharedLink.findOne({ itineraryId: itinerary._id });
  if (!link) link = await SharedLink.create({ itineraryId: itinerary._id, slug: nanoid(10) });
  itinerary.isPublic = true; itinerary.shareSlug = link.slug; await itinerary.save();
  res.status(201).json({ slug: link.slug });
}

export async function viewShare(req, res) {
  const link = await SharedLink.findOneAndUpdate({ slug: req.params.slug }, { $inc: { viewCount: 1 } }, { new: true }).populate("itineraryId");
  link?.itineraryId ? res.json({ itinerary: link.itineraryId, viewCount: link.viewCount }) : res.status(404).json({ message: "Shared itinerary not found" });
}
