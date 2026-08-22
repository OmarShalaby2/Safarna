import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/destinations">Destinations</Link>
      <Link to="/hotels">Hotels</Link>
      <Link to="/activities">Activities</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;