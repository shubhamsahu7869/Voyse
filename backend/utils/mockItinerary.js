export function mockItinerary(data) {
  const destination = data.destination || "Santorini, Greece";
  const activities = [
    ["Arrival & Aegean Ease", "Sunrise arrival and private transfer", "Settle into your caldera suite", "Sunset walk through Oia"],
    ["Villages in White", "Breakfast overlooking the cliffs", "Explore Pyrgos and Megalochori", "Greek tasting menu under the stars"],
    ["The Blue Beyond", "Catamaran cruise from Ammoudi Bay", "Swim at the volcanic hot springs", "Unhurried dinner by the harbor"],
    ["Island Slowdown", "Local market and pottery studio", "Beach time at Perissa", "Farewell rooftop cocktails"]
  ];
  return {
    title: `${destination.split(",")[0]} Escape`,
    destination,
    overview: "A considered island escape balancing signature views, local flavors and generous pockets of unplanned time.",
    days: activities.map((a, index) => ({
      date: data.travelDates?.start || "2026-06-18",
      dayNumber: index + 1,
      theme: a[0],
      morning: { time: "09:00", title: a[1], description: "A gentle start with time to take in the surroundings.", location: destination },
      afternoon: { time: "14:00", title: a[2], description: "A curated local experience with a relaxed pace.", location: destination },
      evening: { time: "19:30", title: a[3], description: "A memorable close to the day.", location: destination },
      tips: ["Carry water and comfortable shoes", "Reserve sunset tables in advance"]
    })),
    packingList: ["Linen layers", "Comfortable walking shoes", "Swimwear", "Sun protection", "Travel adapter"],
    budgetEstimate: { stay: "INR 58,000", experiences: "INR 24,000", dining: "INR 18,000", total: "INR 1,00,000" },
    emergencyContacts: ["European emergency number: 112"]
  };
}
