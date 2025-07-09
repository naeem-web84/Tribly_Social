import React from 'react'; 
import useAuth from '../../../hooks/useAuth/useAuth';

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md text-center font-urbanist">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-primary"
        />
        <div>
          <p className="text-lg font-semibold">{user?.displayName || 'No Name'}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <button className="btn btn-sm btn-primary">Edit Profile</button>
      </div>
    </div>
  );
};

export default MyProfile;
