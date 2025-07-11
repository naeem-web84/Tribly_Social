// hooks/useSaveUser.js
import { useMutation } from "@tanstack/react-query";  
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const useSaveUser = () => {
  const axios = useAxiosSecure();

  return useMutation({
    mutationFn: async (userInfo) => {
      const res = await axios.post("/users", userInfo);
      return res.data;
    },
  });
};

export default useSaveUser;
