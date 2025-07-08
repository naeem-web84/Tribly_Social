import { useNavigate } from "react-router";
import { useState } from "react"; 
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";
import RegisterForm from "./RegisterForm";
import useAuth from "../../hooks/UseAuth/useAuth"; 
import Loading from "../../components/loading/Loading";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;

  const onSubmit = async (data) => {
    const { name, email, password, about, terms } = data;
    const imageFile = data.image[0];

    if (!terms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${image_api_key}`, {
        method: "POST",
        body: formData,
      });

      const imgData = await res.json();
      if (!imgData.success) throw new Error("Image upload failed");

      const photoURL = imgData.data.url;

      // 2. Create user with Firebase
      const result = await createUser(email, password);
      console.log("User created:", result.user);

      // 3. Save user info in DB
      const userInfo = {
        userName: name,
        email,
        about,
        role: "user",              // default role user
        membershipStatus: "general",
        photo: photoURL,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const dbRes = await axiosSecure.post("/users", userInfo);
      console.log("User saved:", dbRes.data);

      // 4. Redirect based on role
      // if (userInfo.role === "admin") {
      //   navigate("/admin");
      // } else {
      //   navigate("/dashboard");
      // }

      navigate('/')
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading></Loading>

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <RegisterForm onSubmit={onSubmit} error={error} />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
