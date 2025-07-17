import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaComments, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const AdminCollection = () => {
  const axiosSecure = useAxiosSecure();
  const adminEmail = 'naeemislam.hasan74@gmail.com';

  // Fetch admin data
  const { data: admin, isLoading: adminLoading } = useQuery({
    queryKey: ['admin', adminEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/admin/${adminEmail}`);
      return res.data;
    },
  });

  // Fetch all stats in parallel
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const [users, posts, comments, payments] = await Promise.all([
        axiosSecure.get('/api/users/count'),
        axiosSecure.get('/api/posts/count'),
        axiosSecure.get('/api/comments/count'),
        axiosSecure.get('/api/payments/count'),
      ]);
      return {
        users: users.data.count,
        posts: posts.data.count,
        comments: comments.data.count,
        payments: payments.data.count,
      };
    },
  });

  if (adminLoading || statsLoading) {
    return <div className="text-center py-6">Loading admin data...</div>;
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Admin Info */}
      <motion.div
        className="flex items-center gap-4 p-4 bg-base-100 rounded-xl shadow-md border border-base-300"
        variants={cardVariants}
      >
        <img
          src={admin.photo}
          alt="Admin"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{admin.userName}</h2>
          <p className="text-sm text-gray-500">{admin.email}</p>
          <p className="text-sm capitalize text-primary">{admin.role}</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          className="p-4 bg-primary text-primary-content rounded-lg shadow flex items-center gap-3"
          variants={cardVariants}
        >
          <FaUsers className="text-2xl" />
          <div>
            <p className="text-lg font-bold">{stats.users}</p>
            <p className="text-sm">Users</p>
          </div>
        </motion.div>

        <motion.div
          className="p-4 bg-secondary text-secondary-content rounded-lg shadow flex items-center gap-3"
          variants={cardVariants}
        >
          <MdPostAdd className="text-2xl" />
          <div>
            <p className="text-lg font-bold">{stats.posts}</p>
            <p className="text-sm">Posts</p>
          </div>
        </motion.div>

        <motion.div
          className="p-4 bg-accent text-accent-content rounded-lg shadow flex items-center gap-3"
          variants={cardVariants}
        >
          <FaComments className="text-2xl" />
          <div>
            <p className="text-lg font-bold">{stats.comments}</p>
            <p className="text-sm">Comments</p>
          </div>
        </motion.div>

        <motion.div
          className="p-4 bg-neutral text-neutral-content rounded-lg shadow flex items-center gap-3"
          variants={cardVariants}
        >
          <FaMoneyCheckAlt className="text-2xl" />
          <div>
            <p className="text-lg font-bold">{stats.payments}</p>
            <p className="text-sm">Payments</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminCollection;
