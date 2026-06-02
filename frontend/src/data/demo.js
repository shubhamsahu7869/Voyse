export const demoTrip = {
  _id: "santorini-escape",
  title: "Santorini Escape",
  destination: "Santorini, Greece",
  travelDates: { start: "Jun 18", end: "Jun 22, 2026" },
  tags: ["Island", "Leisure"],
  itinerary: {
    overview: "A considered island escape balancing signature views, local flavors and generous pockets of unplanned time.",
    days: [
      ["Arrival & Aegean Ease", "Sunrise arrival and private transfer", "Settle into your caldera suite", "Sunset walk through Oia"],
      ["Villages in White", "Breakfast overlooking the cliffs", "Explore Pyrgos and Megalochori", "Greek tasting menu under the stars"],
      ["The Blue Beyond", "Catamaran cruise from Ammoudi Bay", "Swim at the volcanic hot springs", "Unhurried dinner by the harbor"],
      ["Island Slowdown", "Local market and pottery studio", "Beach time at Perissa", "Farewell rooftop cocktails"]
    ].map((x, i) => ({
      dayNumber: i + 1, date: `Jun ${18 + i}`, theme: x[0],
      morning: { time: "09:00", title: x[1], description: "A gentle start with time to take in the surroundings." },
      afternoon: { time: "14:00", title: x[2], description: "A curated local experience at a relaxed pace." },
      evening: { time: "19:30", title: x[3], description: "A memorable close to the day." },
      tips: ["Carry water and comfortable shoes", "Reserve sunset tables in advance"]
    })),
    packingList: ["Linen layers", "Comfortable shoes", "Swimwear", "Sun protection", "Travel adapter"],
    budgetEstimate: { Stay: "₹58,000", Experiences: "₹24,000", Dining: "₹18,000", Total: "₹1,00,000" }
  }
};

export const pastTrips = [
  demoTrip,
  { _id: "kyoto", title: "Quiet Kyoto", destination: "Kyoto, Japan", travelDates: { start: "Oct 04", end: "Oct 10, 2025" }, tags: ["Culture"], image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85" },
  { _id: "amalfi", title: "Amalfi Days", destination: "Amalfi Coast, Italy", travelDates: { start: "Aug 12", end: "Aug 17, 2025" }, tags: ["Coast"], image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=900&q=85" },
  { _id: "jaipur", title: "Jaipur Weekend", destination: "Jaipur, India", travelDates: { start: "Feb 07", end: "Feb 10, 2025" }, tags: ["Heritage"], image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85" }
];
