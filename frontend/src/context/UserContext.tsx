"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "@/components/api/authApi";

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLogged: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async (token: string) => {
    try {
      const response = await getMe(token);
      if (response.success && response.data) {
        setUser(response.data);
        setIsLogged(true);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setIsLogged(false);
      setUser(null);
      localStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    const tokenFromStorage = localStorage.getItem("accessToken");

    const token = tokenFromUrl || tokenFromStorage;

    if (token) {
      if (tokenFromUrl) {
        localStorage.setItem("accessToken", tokenFromUrl);
        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("accessToken", token);
    await fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsLogged(false);
  };

  return (
    <UserContext.Provider value={{ user, isLogged, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
