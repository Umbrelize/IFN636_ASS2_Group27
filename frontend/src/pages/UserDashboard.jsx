import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p className="mb-2">Welcome, {user?.name}</p>
      <p className="mb-6">Role: {user?.role}</p>

      <Link to="/tickets" className="bg-blue-600 text-white px-4 py-2 rounded">
        Go to My Tickets
      </Link>
    </div>
  );
};

export default UserDashboard;