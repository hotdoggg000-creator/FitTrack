
import { Link, NavLink } from "react-router-dom";
import { Dumbbell, Heart, House } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Dumbbell size={28} />
        <span>FitTrack</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          <House size={18} />
          Home
        </NavLink>

        <NavLink to="/favorites">
          <Heart size={18} />
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
