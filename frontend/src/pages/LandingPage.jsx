import { ArrowRight, CalendarCheck, FileText, MapPinned, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return <><Navbar /><main>
    <section className="hero shell">
      <div className="hero-copy"><p className="eyebrow"><Sparkles size={15} /> YOUR PERSONAL TRAVEL CONCIERGE</p>
      <h1>From bookings to<br /><em>beautiful journeys.</em></h1>
      <p className="hero-text">Drop your travel documents. Voyse reads every detail and turns the scattered pieces into one thoughtful, day-by-day itinerary.</p>
      <div className="actions"><Link className="button" to="/upload">Plan my journey <ArrowRight size={17} /></Link><a className="quiet" href="#how">See how it works</a></div>
      <div className="trust"><div className="faces"><i>AR</i><i>SM</i><i>JK</i></div><span><b>4.9 <Star size={13} fill="currentColor" /></b> Loved by 12,000+ travelers</span></div>
      </div>
      <div className="hero-art">
        <div className="postcard main-card"><img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=90" /><div><span>SANTORINI, GREECE</span><h3>Your island escape</h3><p>18 - 22 JUN 2026</p></div></div>
        <div className="float-card flight"><small>NEXT UP</small><b>DEL <ArrowRight size={13} /> ATH</b><span>AI 154 · 08:40</span></div>
        <div className="float-card ready"><CalendarCheck /><div><b>Itinerary ready</b><span>4 days · 12 moments</span></div></div>
      </div>
    </section>
    <section className="logo-strip"><span>TRUSTED BY TRAVELERS FROM</span><b>airbnb</b><b>AMERICAN EXPRESS</b><b>Tripadvisor</b><b>VISA</b></section>
    <section className="how shell" id="how"><p className="eyebrow">A LITTLE MAGIC, BEAUTIFULLY ORGANIZED</p><h2>Your trip, composed in <em>minutes.</em></h2>
      <div className="feature-grid">
        <article><b>01</b><FileText /><h3>Drop your details</h3><p>Upload flights, stays and confirmations. PDF, photo, or screenshot.</p></article>
        <article><b>02</b><ShieldCheck /><h3>We read the fine print</h3><p>Voyse extracts the essentials and quietly organizes every booking.</p></article>
        <article><b>03</b><MapPinned /><h3>Meet your itinerary</h3><p>A considered, shareable plan with local touches and room to wander.</p></article>
      </div>
    </section>
  </main><footer><b>VOYSE</b><span>Travel, beautifully considered.</span></footer></>;
}
