import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link> &nbsp;

      {user?.role === "VISITOR" && <Link to="/visitor">My QR Code</Link>}
      {user?.role === "SECURITY" && <Link to="/security">Scan QR</Link>}
      {user?.role === "ADMIN" && <Link to="/reception">Register Visitors</Link>}
      {user?.role === "EMPLOYEE" && <Link to="/employee">Approve Visits</Link>}

      {user ? (
        <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
