import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../components/loading/Loading";

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
        // Redirect fix:
        navigate('/')
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <Loading />;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-secondary text-secondary-content">
        <form onSubmit={handleLogin} className="card-body flex flex-col gap-4">
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input input-bordered"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input input-bordered"
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button className="btn btn-primary mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-sm text-center">
            New?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </form>

        <SocialLogin setLoading={setLoading} />
      </div>
    </div>
  );
};

export default Login;
