import {
  createContext,
  useState,
  useEffect,
} from "react";

import api from "../services/api";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  const register = async (
    formData
  ) => {

    const res =
      await api.post(
        "/api/auth/register",
        formData
      );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setUser(res.data);

    return res.data;
  };

  const login = async (
    formData
  ) => {

    const res =
      await api.post(
        "/api/auth/login",
        formData
      );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setUser(res.data);

    return res.data;
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};