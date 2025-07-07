import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/UseAuth/UseAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
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
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input name="email" type="email" placeholder="Enter email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input name="password" type="password" placeholder="Enter password" className="input input-bordered" required />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="form-control mt-4">
            <button className="btn btn-primary">Login</button>
          </div>
          <p><small>New to this website? <Link
            className="btn btn-link -ml-3" to='/register'>Register</Link></small></p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
