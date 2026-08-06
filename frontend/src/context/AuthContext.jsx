import {
  useState,
  createContext,
  useContext
} from "react";

import api from "../service/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // LOGIN
  async function login(email, password) {

    const response = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    // IMPORTANT
    const { token, user: loggedInUser } =
      response.data.data;

    console.log(
      "Logged in user:",
      loggedInUser
    );

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      token
    );

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    // UPDATE STATE
    setUser(loggedInUser);

    return loggedInUser;
  }

  // REGISTER
  async function register(
    name,
    email,
    password,
    role
  ) {

    const response = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
        role
      }
    );

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
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
