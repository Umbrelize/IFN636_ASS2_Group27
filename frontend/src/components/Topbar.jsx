import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/my-tickets') return 'My Tickets';
    if (location.pathname.startsWith('/my-tickets/')) return 'Ticket Details';
    if (location.pathname === '/admin') return 'Dashboard';
    if (location.pathname === '/tickets') return 'Ticket List';
    if (location.pathname.startsWith('/tickets/')) return 'Ticket Details';
    if (location.pathname === '/profile') return 'Profile Info';
    return 'IT Support Ticket System';
  };

  const getSubtitle = () => {
    if (location.pathname === '/admin') {
      return `Welcome back, ${user?.role === 'admin' ? 'Admin' : user?.name}. Here’s what’s happening today.`;
    }
    if (location.pathname === '/dashboard') {
      return `Welcome back, ${user?.role === 'admin' ? 'Admin' : user?.name}.`;
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

  const displayName = user?.role === 'admin' ? 'Admin' : user?.name || 'User';
  const displayRole = user?.role === 'admin' ? 'IT Support' : 'User';
  const avatarLetter = user?.role === 'admin'
    ? 'A'
    : (user?.name?.charAt(0)?.toUpperCase() || 'U');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>{getTitle()}</h2>
        {getSubtitle() && <p>{getSubtitle()}</p>}
      </div>

      <div className="topbar-right">
        <button type="button" className="bell-wrap" aria-label="Notifications">
          <span className="bell">🔔</span>
          <span className="bell-dot" />
        </button>

        <div className="user">
          <div className="user-text">
            <strong>{displayName}</strong>
            <p>{displayRole}</p>
          </div>
          <div className="avatar">{avatarLetter}</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;