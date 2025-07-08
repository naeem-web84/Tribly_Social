import React, { useState } from 'react';
import useAuth from '../../hooks/UseAuth/UseAuth';
import useAxios from '../../hooks/useAxiosSecure/useAxios';
import { useNavigate } from 'react-router'; 
import Loading from '../../components/loading/Loading';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // ✅ local loading state

    const handleGoogleSignIn = () => {
        setLoading(true); // show loading
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
                setLoading(false); // stop loading
            });
    };

    if (loading) return <Loading></Loading>

    return (
        <div>
            <div className="divider">OR</div>
            <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff" />
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </g>
                </svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;
