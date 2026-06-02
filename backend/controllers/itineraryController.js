import Itinerary from "../models/Itinerary.js";
import { askGemini } from "../utils/geminiService.js";
import { mockItinerary } from "../utils/mockItinerary.js";
import { normalizeItinerary } from "../utils/itineraryNormalizer.js";

export async function generate(req, res) {
  const { extractedData, documents = [], feedback = "" } = req.body;
  const prompt = `You are a luxury travel concierge. Based on bookings ${JSON.stringify(extractedData)} and feedback ${feedback}, return ONLY valid JSON with title, destination, overview, days, packingList, budgetEstimate, emergencyContacts. Each days item MUST contain date, dayNumber, theme, morning, afternoon, evening, and tips. Each morning, afternoon, and evening value MUST be an object with time, title, description, and location string fields.`;
  const itinerary = normalizeItinerary(await askGemini(prompt) || mockItinerary(extractedData || {}), extractedData);
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
