import api from '../axiosConfig';
import { Link } from 'react-router-dom';

const TicketList = ({
  tickets = [],
  setTickets,
  setEditingTicket,
  isAdmin = false,
}) => {
  const handleDelete = async (ticketId) => {
    const confirmed = window.confirm('Are you sure you want to delete this ticket?');
    if (!confirmed) return;

    try {
      const endpoint = isAdmin
        ? `/api/tickets/admin/${ticketId}`
        : `/api/tickets/${ticketId}`;

      await api.delete(endpoint);

      if (setTickets) {
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete ticket');
    }
  };

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

  if (!tickets || tickets.length === 0) {
    return (
      <div className="figma-table-card">
        <div className="empty-box">No tickets found.</div>
      </div>
    );
  }

  return (
    <div className="figma-table-card ticket-list-wrap">
      <div className="table-scroll">
        <table className="figma-table">
          <thead>
            <tr>
              <th>TICKET ID</th>
              {isAdmin && <th>USER</th>}
              <th>ISSUE TITLE</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>PRIORITY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td className="ticket-id">#TK-{4820 - index}</td>

                {isAdmin && (
                  <td>
                    <div className="user-cell">
                      <div className="mini-avatar">👤</div>
                      <div>
                        <div className="user-name">{ticket.user?.name || '-'}</div>
                        <div className="user-sub">{ticket.user?.email || ''}</div>
                      </div>
                    </div>
                  </td>
                )}

                <td className="issue-title">{ticket.subject}</td>

                <td>
                  <span className="category-tag">{ticket.category}</span>
                </td>

                <td>
                  <span className={getStatusClass(ticket.status)}>
                    {ticket.status}
                  </span>
                </td>

                <td>
                  <span className={getPriorityClass(ticket.priority)}>
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <div className="icon-actions minimal-actions">
                    <Link
                      to={isAdmin ? `/tickets/${ticket._id}` : `/my-tickets/${ticket._id}`}
                      className="action-btn"
                      title="View details"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => setEditingTicket && setEditingTicket(ticket)}
                      title={isAdmin ? 'Update status' : 'Edit ticket'}
                    >
                      {isAdmin ? 'Status' : 'Edit'}
                    </button>

                    <button
                      type="button"
                      className="action-btn delete-action"
                      onClick={() => handleDelete(ticket._id)}
                      title="Delete ticket"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;