import { Compass, Menu, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ simple = false }) {
  const { user } = useAuth();
  return <header className="nav">
    <Link className="brand" to="/"><span><Compass size={18} /></span>VOYSE</Link>
    {!simple && <nav className="navlinks"><NavLink to="/dashboard">Journeys</NavLink><a href="/#how">How it works</a><a href="/#stories">Stories</a></nav>}
    <div className="navright">
      {user ? <Link className="avatar" to="/dashboard"><UserRound size={17} />{user.name.split(" ")[0]}</Link> : <><Link className="quiet" to="/login">Sign in</Link><Link className="button tiny" to="/register">Start planning</Link></>}
      <Menu className="hamburger" size={20} />
    </div>
  </header>;
}
