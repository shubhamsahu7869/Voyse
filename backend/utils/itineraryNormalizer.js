function text(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(item => text(item)).filter(Boolean).join(", ");
  return Object.entries(value)
    .map(([key, item]) => `${key}: ${text(item)}`)
    .join(" | ");
}

function segment(value, fallbackTitle) {
  if (typeof value === "string") return { title: value };
  return {
    time: text(value?.time),
    title: text(value?.title || value?.activity, fallbackTitle),
    description: text(value?.description || value?.details),
    location: text(value?.location)
  };
}

export function normalizeItinerary(value = {}, extractedData = {}) {
  const destination = text(value.destination, text(extractedData.destination, "Your destination"));
  return {
    title: text(value.title, `${destination} Journey`),
    destination,
    overview: text(value.overview, "A thoughtfully composed itinerary based on your travel bookings."),
    days: (Array.isArray(value.days) ? value.days : []).map((day, index) => ({
      date: text(day.date, extractedData.travelDates?.start),
      dayNumber: Number(day.dayNumber || index + 1),
      theme: text(day.theme || day.title, `Day ${index + 1}`),
      morning: segment(day.morning, "Morning at leisure"),
      afternoon: segment(day.afternoon, "Explore the destination"),
      evening: segment(day.evening, "Evening at leisure"),
      tips: (Array.isArray(day.tips || day.localTips) ? day.tips || day.localTips : [day.tips || day.localTips]).map(item => text(item)).filter(Boolean)
    })),
    packingList: (Array.isArray(value.packingList) ? value.packingList : []).map(item => text(item)).filter(Boolean),
    budgetEstimate: value.budgetEstimate || value.budgetBreakdown || {},
    emergencyContacts: (Array.isArray(value.emergencyContacts) ? value.emergencyContacts : [value.emergencyContacts]).map(item => text(item)).filter(Boolean)
  };
}
