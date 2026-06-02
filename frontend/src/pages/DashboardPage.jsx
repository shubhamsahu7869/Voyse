import { CalendarDays, Map, Plus, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";
import { pastTrips } from "../data/demo";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
export default function DashboardPage() {
 const { user } = useAuth(); const [trips, setTrips] = useState(pastTrips);
 useEffect(() => { api.get("/itinerary").then(({ data }) => data.length && setTrips(data)).catch(() => {}); }, []);
 return <><Navbar /><main className="shell dashboard"><div className="dashboard-head"><div><p className="eyebrow">YOUR TRAVEL DESK</p><h1>Good evening, <em>{user?.name?.split(" ")[0] || "traveler"}.</em></h1><p>A few beautiful plans, all in one place.</p></div><Link className="button" to="/upload"><Plus size={17} /> New journey</Link></div>
  <section className="stats"><div><Map /><b>08</b><span>Journeys planned</span></div><div><CalendarDays /><b>32</b><span>Days explored</span></div><div><Sparkles /><b>04</b><span>Countries visited</span></div></section>
  <div className="section-head"><h2>Your journeys</h2><label className="search"><Search size={17} /><input placeholder="Search destination" /></label></div>
  <section className="trip-grid">{trips.map(x => <TripCard trip={x} key={x._id} />)}</section>
 </main></>;
}
