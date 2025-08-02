import axios from "axios";
import { useEffect, useMemo } from "react";
import useAuth from "../useAuth/useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "https://tribly-server.vercel.app",
    });
  }, []); // only create once

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
