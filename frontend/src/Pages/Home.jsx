import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Student Event Management System</h1>

        {isAuthenticated ? (
          <p>
            Welcome back, <strong>{user.name}</strong> ({user.role}).
            Use the navigation bar to go to your dashboard.
          </p>
        ) : (
          <>
            <p>
              Admins can manage events, students can register for
              events, and faculty can view participation reports.
            </p>

            <div className="home-buttons">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;