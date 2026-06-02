import Itinerary from "../models/Itinerary.js";
import { askGemini } from "../utils/geminiService.js";
import { mockItinerary } from "../utils/mockItinerary.js";

export async function generate(req, res) {
  const { extractedData, documents = [], feedback = "" } = req.body;
  const prompt = `You are a luxury travel concierge. Based on bookings ${JSON.stringify(extractedData)} and feedback ${feedback}, return ONLY valid JSON with title, destination, overview, days, packingList, budgetEstimate, emergencyContacts.`;
  const itinerary = await askGemini(prompt) || mockItinerary(extractedData || {});
  const saved = await Itinerary.create({ userId: req.user.id, title: itinerary.title, destination: itinerary.destination, travelDates: extractedData?.travelDates, documents, extractedData, itinerary, tags: ["Island", "Leisure"] });
  res.status(201).json(saved);
}

export async function list(req, res) { res.json(await Itinerary.find({ userId: req.user.id }).sort({ createdAt: -1 })); }
export async function getOne(req, res) {
  const item = await Itinerary.findOne({ _id: req.params.id, userId: req.user.id });
  item ? res.json(item) : res.status(404).json({ message: "Itinerary not found" });
}
export async function remove(req, res) {
  await Itinerary.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.status(204).end();
}
