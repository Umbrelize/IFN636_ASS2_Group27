import { useEffect, useMemo, useState } from 'react';
import api from '../axiosConfig';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets');
        setTickets(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load dashboard');
      }
    };

    fetchTickets();
  }, []);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === 'Open').length;
    const inProgress = tickets.filter((ticket) => ticket.status === 'In Progress').length;
    const closed = tickets.filter((ticket) => ticket.status === 'Closed').length;

    return { total, open, inProgress, closed };
  }, [tickets]);

  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="dashboard-page">
      {error && <p className="error-text">{error}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p>{stats.open}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>

        <div className="stat-card">
          <h3>Closed Tickets</h3>
          <p>{stats.closed}</p>
        </div>
      </div>

      <div className="card dashboard-table-card">
        <div className="dashboard-table-header">
          <h2>Recent Tickets</h2>
          <Link to="/my-tickets">View All</Link>
        </div>

        {recentTickets.length === 0 ? (
          <p>No tickets yet.</p>
        ) : (
          <div className="table-scroll">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Subject</th>
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
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/my-tickets/${ticket._id}`} className="table-link-btn">
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

export default UserDashboard;