// hooks/useAxiosSecure/useAxiosSecure.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setInterceptor = async () => {
      if (user) {
        const token = await user.getIdToken();

        axiosSecure.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          },
          (error) => Promise.reject(error)
        );

        setReady(true); // ✅ we're now ready to make requests
      }
    };

    setInterceptor();
  }, [user]);

  return ready ? axiosSecure : null; // Return null if not ready
};

export default useAxiosSecure;
