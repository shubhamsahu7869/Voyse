import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const fallback = "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=85";
export default function TripCard({ trip }) {
  return <Link to={`/itinerary/${trip._id}`} className="trip-card">
    <img src={trip.image || fallback} alt="" />
    <div className="trip-card-body"><div className="row"><h3>{trip.title}</h3><ArrowUpRight size={18} /></div>
      <p><MapPin size={14} />{trip.destination}</p><p><CalendarDays size={14} />{trip.travelDates.start} - {trip.travelDates.end}</p>
      <div className="tags">{trip.tags.map(t => <span key={t}>{t}</span>)}</div>
    </div>
  </Link>;
}
