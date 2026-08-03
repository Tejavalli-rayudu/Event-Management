import { useState, createContext, useContext } from "react";
import api from "../Services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // LOGIN
  async function login(email, password) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user: loggedInUser } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);

    return loggedInUser;
  }

  // REGISTER
  async function register(name, email, password, role) {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });

    return response.data;
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token, user: loggedInUser } = response.data.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(loggedInUser));

  setUser(loggedInUser);

  return loggedInUser;
}

export function useAuth() {
  return useContext(AuthContext);
}
