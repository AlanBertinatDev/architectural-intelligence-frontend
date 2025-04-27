import React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Log in user
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, user: userData } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Set authentication headers for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);

      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
      setLoading(false);
      return false;
    }
  };

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      // Set token in request headers
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Get current user info
      const response = await api.get("/auth/me");
      setUser(response.data);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      // If token is invalid, clear it
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  }, []);

  // Log out user
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear login error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
