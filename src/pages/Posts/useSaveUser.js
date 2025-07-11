import { useMutation } from "@tanstack/react-query"; 
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const useSaveUser = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (userInfo) => {
      // ❗ Ensure axiosSecure is not null
      if (!axiosSecure) throw new Error("axiosSecure is undefined");

      const res = await axiosSecure.post("/users", userInfo);
      return res.data;
    },
  });
};

export default useSaveUser;
