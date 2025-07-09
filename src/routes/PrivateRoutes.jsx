import React from 'react'; 
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth/useAuth';

const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-xl"></span>
        </div>
    }


    if(!user){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }



    return children;
};

export default PrivateRoutes;