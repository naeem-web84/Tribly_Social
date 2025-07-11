import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import RegisterForm from "./RegisterForm";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../components/loading/Loading";
import useSaveUser from "../../pages/Posts/useSaveUser";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
  const { mutateAsync: saveUser } = useSaveUser();

  const onSubmit = async (data) => {
    const { name, email, password, about, terms } = data;
    const imageFile = data.image[0];

    if (!terms) return setError("✔️ Please accept terms and conditions.");

    try {
      setLoading(true);

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${image_api_key}`, {
        method: "POST",
        body: formData,
      });

      const imgData = await res.json();
      if (!imgData.success) throw new Error("Image upload failed");

      const photoURL = imgData.data.url;

      // Create user with email/password
      await createUser(email, password);

      // Prepare user info to save in DB
      const userInfo = {
        userName: name,
        email,
        about,
        role: "user",
        membershipStatus: "general",
        badge: "user",
        follower: 0,
        bannerImage: "https://i.ibb.co/GtQbcq9/banner.jpg",
        photo: photoURL,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await saveUser(userInfo);

      // Redirect fix:
      navigate("/", { replace: true }); // ✅ always to home
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-secondary text-secondary-content">
        <RegisterForm onSubmit={onSubmit} error={error} />
        <SocialLogin from={from} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default Register;
