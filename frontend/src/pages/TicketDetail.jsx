import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const TicketDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const endpoint = isAdmin
          ? `/api/tickets/admin/${id}`
          : `/api/tickets/${id}`;

        const response = await api.get(endpoint);
        setTicket(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load ticket details');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, isAdmin]);

  if (loading) {
    return <p>Loading ticket details...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!ticket) {
    return <p className="error-text">Ticket not found.</p>;
  }

  return (
    <div className="ticket-detail-page">
      <div className="card ticket-detail-card">
        <div className="ticket-detail-header">
          <div>
            <h1>{ticket.subject}</h1>
            <p>Full ticket information</p>
          </div>

          <Link
            to={isAdmin ? '/tickets' : '/my-tickets'}
            className="back-link"
          >
            ← Back
          </Link>
        </div>

        <div className="ticket-detail-grid">
          <div className="detail-item">
            <span className="detail-label">Ticket ID</span>
            <span className="detail-value">{ticket._id}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Category</span>
            <span className="detail-value">{ticket.category}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Priority</span>
            <span className="detail-value">{ticket.priority}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">{ticket.status}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Created At</span>
            <span className="detail-value">
              {new Date(ticket.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Updated At</span>
            <span className="detail-value">
              {new Date(ticket.updatedAt).toLocaleString()}
            </span>
          </div>

          {isAdmin && (
            <>
              <div className="detail-item">
                <span className="detail-label">Created By</span>
                <span className="detail-value">{ticket.user?.name || '-'}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">User Email</span>
                <span className="detail-value">{ticket.user?.email || '-'}</span>
              </div>
            </>
          )}
        </div>

        <div className="detail-section">
          <h3>Description</h3>
          <div className="detail-box">
            {ticket.description || 'No description provided.'}
          </div>
        </div>

        <div className="detail-section">
          <h3>Image</h3>
          {ticket.image ? (
            <div className="detail-image-wrap">
              <a href={ticket.image} target="_blank" rel="noreferrer" className="image-link">
                Open image link
              </a>
              <img
                src={ticket.image}
                alt={ticket.subject}
                className="detail-image"
              />
            </div>
          ) : (
            <div className="detail-box">No image attached.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;