import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calender">Calender</Link>
        </li>
        <li>
          <Link to="/tracks">Tracks</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/disciplines">Disciplines</Link>
        </li>
      </ul>
    </nav>
  );
}
