import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));

  const login = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
    const loggedUser = res.data.user;

    if (!loggedUser) throw new Error("Invalid credentials");

    setUser(loggedUser);
    setAccessToken(res.data.accessToken);

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("accessToken", res.data.accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // optional if you want direct context access
