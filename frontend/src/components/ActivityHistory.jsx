import { useEffect, useState } from 'react';
import api from '../axiosConfig';

const formatAction = (action) => {
  const labels = {
    'ticket.created': 'Ticket created',
    'ticket.updated': 'Ticket updated',
    'ticket.status_changed': 'Status changed',
    'ticket.deleted': 'Ticket deleted',
    'ticket.admin_updated': 'Admin updated ticket',
    'ticket.admin_status_changed': 'Admin changed status',
    'ticket.admin_deleted': 'Admin deleted ticket',
  };

  return labels[action] || action;
};

const ActivityHistory = ({ ticketId }) => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await api.get(`/tickets/${ticketId}/activity`);
        setLogs(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load activity history');
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchActivity();
    }
  }, [ticketId]);

  if (loading) {
    return <div className="card">Loading activity history...</div>;
  }

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3>Activity History</h3>

      {error && <div className="error-message">{error}</div>}

      {!error && logs.length === 0 && (
        <p style={{ color: '#64748b' }}>No activity recorded yet.</p>
      )}

      {!error &&
        logs.map((log) => (
          <div
            key={log._id}
            style={{
              borderBottom: '1px solid #e5e7eb',
              padding: '12px 0',
            }}
          >
            <div style={{ fontWeight: 700 }}>{formatAction(log.action)}</div>

            <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
              {log.description || 'No description provided.'}
            </div>

            {(log.statusFrom || log.statusTo) && (
              <div style={{ color: '#475569', fontSize: '13px', marginTop: '4px' }}>
                Status: {log.statusFrom || '-'} → {log.statusTo || '-'}
              </div>
            )}

            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
              By {log.user?.name || log.role || 'system'} ·{' '}
              {new Date(log.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ActivityHistory;