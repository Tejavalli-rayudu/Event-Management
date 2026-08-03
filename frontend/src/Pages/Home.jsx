import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {

  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <div>
        <h1>Student Event Management System</h1>

        {isAuthenticated ? (
          <p>
            Welcome back, <strong>{user.name}</strong> ({user.role}).
            Use the navigation bar to go Dashboard
          </p>
        ) : (
          <>
            <p>
              Admins create events, students register for events,
              and faculty view the participation report.
            </p>

            <br />

            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/register">Create an account</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;