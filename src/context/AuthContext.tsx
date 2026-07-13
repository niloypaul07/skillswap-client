"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, redirectTo?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("ss_token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, redirectTo?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token: receivedToken, user: receivedUser } = response.data;
      
      localStorage.setItem("ss_token", receivedToken);
      setToken(receivedToken);
      setUser(receivedUser);
      toast.success("Welcome back to SkillSwap!");
      router.push(redirectTo || "/");
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to login. Please try again.";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password });
      toast.success("Successfully registered! Please log in.");
      router.push("/login");
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Registration failed.";
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("ss_token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully.");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
