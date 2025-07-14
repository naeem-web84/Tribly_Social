// hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query'; 
import useAuth from '../useAuth/useAuth';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email, // only run when email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data.role || 'user';
    },
  });

  return { role: roleData, isRoleLoading: isLoading };
};

export default useUserRole;
