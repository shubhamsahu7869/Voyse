import { ArrowRight, Compass } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function AuthPage({ register = false }) {
  const { authenticate } = useAuth(); const navigate = useNavigate(); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault(); setBusy(true); setError("");
    const credentials = { email: e.target.email.value, password: e.target.password.value };
    if (register) credentials.name = e.target.name.value;
    try { await authenticate(credentials, register); navigate("/dashboard"); }
    catch (err) { setError(err.response?.data?.message || "Could not connect to Voyse. Please try again."); }
    finally { setBusy(false); }
  };
  return <div className="auth-layout"><section className="auth-art"><Link className="brand" to="/"><span><Compass size={18} /></span>VOYSE</Link><div><p className="eyebrow">CURATED TRAVEL, LESS CLUTTER</p><h2>Every journey deserves a little <em>ceremony.</em></h2><p>Let your documents do the talking. We will take care of the details.</p></div></section>
    <section className="auth-form"><form onSubmit={submit}><p className="eyebrow">WELCOME TO VOYSE</p><h1>{register ? "Begin your journey." : "Welcome back."}</h1><p>{register ? "Create a space for your next great escape." : "Your beautifully organized trips are waiting."}</p>
    {register && <label>Your name<input name="name" placeholder="Aarav Mehta" required /></label>}<label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><label>Password<input name="password" type="password" placeholder="••••••••" required /></label>
    {error && <small className="form-error">{error}</small>}<button className="button" disabled={busy}>{busy ? "Connecting..." : "Continue"} {!busy && <ArrowRight size={16} />}</button><small>{register ? "Already have an account?" : "New to Voyse?"} <Link to={register ? "/login" : "/register"}>{register ? "Sign in" : "Create an account"}</Link></small></form></section>
  </div>;
}
