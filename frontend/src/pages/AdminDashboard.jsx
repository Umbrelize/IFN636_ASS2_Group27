import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../axiosConfig';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets/admin/all');
        setTickets(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load admin dashboard');
      }
    };

    fetchTickets();
  }, []);

  const stats = useMemo(() => {
    const total = tickets.length;
    const assignedToMe = 0;
    const open = tickets.filter((ticket) => ticket.status === 'Open').length;

    return { total, assignedToMe, open };
  }, [tickets]);

  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="dashboard-page">
      {error && <p className="error-text">{error}</p>}

      <div className="stats-grid stats-grid-admin">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card">
          <h3>Tickets Assigned to Me</h3>
          <p>{stats.assignedToMe}</p>
        </div>

        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p>{stats.open}</p>
        </div>
      </div>

      <div className="card dashboard-table-card">
        <div className="dashboard-table-header">
          <h2>Recent Tickets</h2>
          <Link to="/tickets">View All</Link>
        </div>

        {recentTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="table-scroll">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket.subject}</td>
                    <td>{ticket.user?.name || '-'}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/tickets/${ticket._id}`} className="table-link-btn">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;