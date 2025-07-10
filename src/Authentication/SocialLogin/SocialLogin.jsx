// SocialLogin.jsx
import React from 'react'; 
import useAxios from '../../hooks/useAxiosSecure/useAxios';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth/useAuth';

const SocialLogin = ({ setLoading }) => {
  const { signInWithGoogle } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    setLoading(true); // 🔄 now triggers full page loading
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          userName: user.displayName,
          email: user.email,
          role: "user",
          membershipStatus: "general",
          photo: user.photoURL,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };

        await axiosInstance.post('/users', userInfo);
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
        <svg aria-label="Google logo" width="16" height="16" viewBox="0 0 512 512">
          <path fill="#4285f4" d="..." />
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
