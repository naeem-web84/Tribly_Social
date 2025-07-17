import React from 'react'; 
import AdminCollection from './AdminCollection';

const AdminProfile = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Admin Dashboard</h1>
      <AdminCollection />
    </div>
  );
};

export default AdminProfile;
