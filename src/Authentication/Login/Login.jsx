import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router"; // ✅ fixed import
import useAuth from "../../hooks/useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../components/loading/Loading";
import Logo from "../../components/Logo/Logo";
import { Typewriter } from 'react-simple-typewriter';

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        form.reset();
        navigate("/");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (loading) return <Loading />;

  return (
    <div className="grid md:grid-cols-2 bg-base-200 font-urbanist min-h-screen">
      {/* Left Side */}
      <div className="bg-primary text-primary-content flex flex-col justify-center items-center px-8 py-12">
        <Logo size="lg" color="#fff" />
        <div className="text-center mt-6 space-y-2">
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-sm opacity-90">
            <Typewriter
              words={["Login to discover more", "Securely access your feed", "Connect with the community"]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </p>
          <p className="text-sm opacity-90 mt-2">Login with social media for quick access</p>
        </div>
        <div className="mt-6 w-full max-w-xs">
          <SocialLogin setLoading={setLoading} />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-secondary text-secondary-content p-8 rounded-lg shadow-md">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="input input-bordered w-full"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn btn-primary w-full mt-2" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-4">
              New here?{" "}
              <Link to="/register" className="link text-primary underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
