import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill both fields");
      return;
    }

    setLoading(true);

    try {
      const loggedInUser = await login(
        formData.email,
        formData.password
      );

      console.log("LOGIN SUCCESS:", loggedInUser);

      // Redirect based on role
      if (loggedInUser.role === "Admin") {
        navigate("/admin");
      } else if (loggedInUser.role === "Faculty") {
        navigate("/faculty");
      } else if (loggedInUser.role === "Student") {
        navigate("/student");
      } else {
        navigate("/");
      }

    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please try again later";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;