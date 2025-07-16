import { useNavigate, Link } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import RegisterForm from "./RegisterForm";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../components/loading/Loading";
import useSaveUser from "../../pages/Posts/useSaveUser";
import Logo from "../../components/Logo/Logo";
import { Typewriter } from 'react-simple-typewriter';

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
  const { mutateAsync: saveUser } = useSaveUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const about = form.about.value;
    const terms = form.terms.checked;
    const imageFile = form.image.files[0];

    if (!terms) return setError("✔️ Please accept terms and conditions.");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${image_api_key}`, {
        method: "POST",
        body: formData,
      });

      const imgData = await res.json();
      if (!imgData.success) throw new Error("Image upload failed");

      const photoURL = imgData.data.url;

      await createUser(email, password);

      const userInfo = {
        userName: name,
        email,
        about,
        role: "user",
        membershipStatus: "general",
        badge: "user",
        follower: 0,
        bannerImage: "https://i.ibb.co/3mN6Wj7w/tribly-auto-banner.png",
        photo: photoURL,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await saveUser(userInfo);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen grid md:grid-cols-3 font-urbanist overflow-hidden">
      {/* Left Column */}
      <div className="bg-primary text-primary-content flex flex-col justify-center items-center px-6 py-12 md:col-span-1">
        <Logo size="lg" color="#fff" />
        <div className="text-center mt-6 space-y-3">
          <h2 className="text-2xl font-bold">Welcome to Tribly</h2>
          <p className="text-sm opacity-90">
            <Typewriter
              words={["Explore events", "Share your story", "Join the community"]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </p>
          <p className="text-sm mt-2">
            Sign up easily with your favorite platform.
          </p>
        </div>
        <div className="mt-8 w-full max-w-xs">
          <SocialLogin setLoading={setLoading} />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-center bg-base-200 md:col-span-2 px-4 py-4">
        <div className="w-full max-w-4xl bg-secondary text-secondary-content p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

          <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Full Name" required className="input input-bordered w-full" />
            <input name="email" type="email" placeholder="Email Address" required className="input input-bordered w-full" />
            <input name="password" type="password" placeholder="Password" required className="input input-bordered w-full" />
            <input name="image" type="file" accept="image/*" required className="file-input file-input-bordered w-full" />
            <textarea name="about" placeholder="About You" className="textarea textarea-bordered md:col-span-2" />

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between">
              <label className="label cursor-pointer flex items-start gap-2">
                <input name="terms" type="checkbox" className="checkbox checkbox-sm mt-1" />
                <span className="label-text text-sm">
                  I agree to the <a href="#" className="text-primary underline">terms & conditions</a>
                </span>
              </label>
              <Link to="/login" className="text-primary text-sm underline mt-2 sm:mt-0">
                Back to Login
              </Link>
            </div>

            {error && (
              <p className="text-red-500 text-sm md:col-span-2">{error}</p>
            )}

            <button type="submit" className="btn btn-primary md:col-span-2">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
