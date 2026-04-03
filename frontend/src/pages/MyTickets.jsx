import { useEffect, useState } from 'react';
import api from '../axiosConfig';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets');
        setTickets(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load your tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="tickets-page">
      {error && <p className="error-text">{error}</p>}

      <TicketForm
        tickets={tickets}
        setTickets={setTickets}
        editingTicket={editingTicket}
        setEditingTicket={setEditingTicket}
        isAdmin={false}
      />

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <TicketList
          tickets={tickets}
          setTickets={setTickets}
          setEditingTicket={setEditingTicket}
          isAdmin={false}
        />
      )}
    </div>
  );
};

export default MyTickets;