import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//import "./Navbar.css";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="navbar">
      <Link to="/">Event Management</Link> |
      <Link to="/admin">Admin Dashboard</Link> |
      <Link to="/student">Student Dashboard</Link> |
      <Link to="/faculty">Faculty Dashboard</Link> |

      {!isAuthenticated ? (
        <>
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;