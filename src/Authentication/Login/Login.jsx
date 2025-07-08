// Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/UseAuth/UseAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../components/loading/Loading';

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ shared loading state
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        form.reset();
        navigate('/');
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <Loading />; // ✅ now full screen

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input name="email" type="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input name="password" type="password" className="input input-bordered" required />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="form-control mt-4">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <p><small>New here? <Link className="btn btn-link -ml-3" to="/register">Register</Link></small></p>
        </form>

        <SocialLogin setLoading={setLoading} /> {/* ✅ pass loader control */}
      </div>
    </div>
  );
};

export default Login;
