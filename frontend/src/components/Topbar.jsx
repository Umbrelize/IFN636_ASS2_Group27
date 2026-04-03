import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/my-tickets') return 'My Tickets';
    if (location.pathname.startsWith('/my-tickets/')) return 'Ticket Details';
    if (location.pathname === '/admin') return 'Dashboard Overview';
    if (location.pathname === '/tickets') return 'Ticket List';
    if (location.pathname.startsWith('/tickets/')) return 'Ticket Details';
    if (location.pathname === '/profile') return 'Profile Info';
    return 'IT Support Ticket System';
  };

  const getSubtitle = () => {
    if (location.pathname === '/admin') {
      return `Welcome back, ${user?.name}. Here's what's happening today.`;
    }
    if (location.pathname === '/dashboard') {
      return `Welcome back, ${user?.name}.`;
    }
    if (location.pathname === '/my-tickets') {
      return 'Create and track your own support tickets.';
    }
    if (location.pathname.startsWith('/my-tickets/')) {
      return 'View full ticket information.';
    }
    if (location.pathname === '/tickets') {
      return 'Manage support tickets from all users.';
    }
    if (location.pathname.startsWith('/tickets/')) {
      return 'View full ticket information.';
    }
    if (location.pathname === '/profile') {
      return 'Manage your account details.';
    }
    return '';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>{getTitle()}</h2>
        {getSubtitle() && <p>{getSubtitle()}</p>}
      </div>

      <div className="topbar-right">
        <div className="bell-wrap">
          <span className="bell">🔔</span>
          <span className="bell-dot" />
        </div>

        <div className="user">
          <div className="user-text">
            <strong>{user?.name}</strong>
            <p>{user?.role === 'admin' ? 'IT Support' : 'User'}</p>
          </div>
          <div className="avatar">👤</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;