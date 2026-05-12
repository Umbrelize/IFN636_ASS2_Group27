import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { BACKEND_BASE_URL } from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const getStatusClass = (status) => {
  if (status === 'Open') return 'badge badge-open';
  if (status === 'In Progress') return 'badge badge-progress';
  if (status === 'Resolved') return 'badge badge-resolved';
  if (status === 'Closed') return 'badge badge-closed';
  return 'badge';
};

const getPriorityClass = (priority) => {
  if (priority === 'High') return 'priority-inline high-text';
  if (priority === 'Medium') return 'priority-inline medium-text';
  return 'priority-inline low-text';
};

const TicketDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getImageSrc = (imagePath) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    return `${BACKEND_BASE_URL}${imagePath}`;
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const endpoint = isAdmin ? `/tickets/admin/${id}` : `/tickets/${id}`;
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
    return <div className="ticket-detail-card">Loading ticket details...</div>;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
  }

  if (!ticket) {
    return <div className="ticket-detail-card">Ticket not found.</div>;
  }

  const imageSrc = getImageSrc(ticket.image);
  const backLink = isAdmin ? '/tickets' : '/my-tickets';

  return (
    <div className="ticket-detail-page">
      <div className="ticket-detail-card">
        <div className="ticket-detail-header">
          <div>
            <h1>{ticket.subject}</h1>
            <p>Full ticket information</p>
          </div>

          <Link className="back-link" to={backLink}>
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
            <span className="detail-value">
              <span className="category-tag">{ticket.category}</span>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Priority</span>
            <span className="detail-value">
              <span className={getPriorityClass(ticket.priority)}>
                {ticket.priority}
              </span>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">
              <span className={getStatusClass(ticket.status)}>
                {ticket.status}
              </span>
            </span>
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
              <a className="image-link" href={imageSrc} target="_blank" rel="noreferrer">
                Open image
              </a>
              <img className="detail-image" src={imageSrc} alt="Ticket attachment" />
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