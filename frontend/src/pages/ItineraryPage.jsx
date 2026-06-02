import { ArrowLeft, CalendarDays, Download, MapPin, Share2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";
import { demoTrip } from "../data/demo";
import api from "../services/api";
export default function ItineraryPage({ shared = false }) {
 const { id, slug } = useParams(); const [trip, setTrip] = useState(demoTrip);
 useEffect(() => {
  const request = shared ? api.get(`/share/${slug}`) : api.get(`/itinerary/${id}`);
  request.then(({ data }) => setTrip(shared ? data.itinerary : data)).catch(() => {});
 }, [id, shared, slug]);
 const copy = async () => {
  try {
   const { data } = await api.post(`/share/${trip._id}`);
   await navigator.clipboard?.writeText(`${location.origin}/share/${data.slug}`);
  } catch { await navigator.clipboard?.writeText(location.href); }
 };
 return <><Navbar simple /><main className="shell itinerary-page" id="itinerary"><Link className="back" to="/dashboard"><ArrowLeft size={16} /> Back to journeys</Link>
 <section className="itinerary-hero"><img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1500&q=90" /><div className="shade" /><div className="trip-title"><p className="eyebrow">YOUR CURATED ITINERARY</p><h1>{trip.title}</h1><p><MapPin size={15} /> {trip.destination}<span>·</span><CalendarDays size={15} /> {trip.travelDates.start} - {trip.travelDates.end}</p></div></section>
 <div className="itinerary-actions"><div className="tags">{trip.tags.map(t => <span key={t}>{t}</span>)}</div><div>{!shared && <button onClick={copy}><Share2 /> Share</button>}<button onClick={() => window.print()}><Download /> PDF</button></div></div>
 <section className="overview"><p className="eyebrow"><Sparkles size={14} /> A NOTE FROM VOYSE</p><h2>A slow, sunlit escape.</h2><p>{trip.itinerary.overview}</p></section>
 <Timeline days={trip.itinerary.days} />
 <section className="essentials"><div><p className="eyebrow">PACKING NOTES</p><h2>The essentials</h2>{trip.itinerary.packingList.map(x => <span key={x}>✓ {x}</span>)}</div><div><p className="eyebrow">ESTIMATED BUDGET</p><h2>A thoughtful estimate</h2>{Object.entries(trip.itinerary.budgetEstimate).map(([k,v]) => <p className={k === "Total" ? "total" : ""} key={k}><span>{k}</span><b>{v}</b></p>)}</div></section>
 </main><footer><b>VOYSE</b><span>Travel, beautifully considered.</span></footer></>;
}
