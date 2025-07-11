import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { useNavigate } from "react-router";
import useSaveUser from "../../pages/Posts/useSaveUser";

const SocialLogin = ({ setLoading }) => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: saveUser } = useSaveUser();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        userName: user.displayName,
        email: user.email,
        about: "This user hasn't added anything yet.",
        role: "user",
        membershipStatus: "general",
        badge: "user",
        follower: 0,
        bannerImage: "https://i.ibb.co/3mN6Wj7w/tribly-auto-banner.png", // default banner
        photo: user.photoURL,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await saveUser(userInfo);

      // Redirect fix:
      navigate("/", { replace: true }); // ✅ always to home
    } catch (err) {
      console.error("Google Sign-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-gray-300 w-full"
      >
        <svg width="18" height="18" viewBox="0 0 512 512" className="mr-2">
          <path
            fill="#4285f4"
            d="M492 261.8c0-14.4-1.3-28.3-3.7-41.8H261v79.1h141.4c-6.1 32.9-24.8 60.8-52.9 79.5v66.2h85.4c50-46 79-113.8 79-182.9z"
          />
          <path
            fill="#34a853"
            d="M261 492c70.5 0 129.6-23.4 172.8-63.6l-85.4-66.2c-23.6 15.9-54 25.3-87.4 25.3-67 0-123.8-45.3-144.3-106.1H27v66.6C70.3 439 157.2 492 261 492z"
          />
          <path
            fill="#fbbc04"
            d="M116.7 301.4c-5.6-16.8-8.8-34.8-8.8-53s3.2-36.2 8.8-53v-66.6H27c-18.2 35.9-28.7 76.6-28.7 119.6s10.5 83.7 28.7 119.6l89.7-66.6z"
          />
          <path
            fill="#ea4335"
            d="M261 100.7c37.9 0 71.9 13 98.6 38.5l74-74C384.6 24.9 324.6 0 261 0 157.2 0 70.3 53 27 133.1l89.7 66.6c20.5-60.8 77.3-106.1 144.3-106.1z"
          />
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
