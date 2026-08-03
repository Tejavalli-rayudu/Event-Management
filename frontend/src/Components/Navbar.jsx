import { Link } from "react-router-dom"

const Navbar = () => {

  return (
    <div>

      <Link to="/">Event Management</Link>

      <Link to="/admin">Admin Dashboard</Link>

      <Link to="/student">Student Dashboard</Link>

      <Link to="/faculty">Faculty Dashboard</Link>

      <Link to="/login">Login</Link>

      <Link to="/register">Register</Link>

    </div>
  )
}

export default Navbar