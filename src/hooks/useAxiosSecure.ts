import axios, { AxiosInstance } from "axios";
import { useMemo, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export function useAxiosSecure(): AxiosInstance {
  const auth = useAuth();
  const authRef = useRef(auth);

  useEffect(() => {
    authRef.current = auth;
  }, [auth]);

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    });

    instance.interceptors.request.use((config) => {
      const token = authRef.current.token || localStorage.getItem("ss_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          authRef.current.logout();
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, []);

  return axiosSecure;
}
