import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import NotificationBell from './NotificationBell';

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

    if (location.pathname === '/history') return 'Ticket History';
    if (location.pathname === '/categories') return 'Manage Categories';
    if (location.pathname === '/profile') return 'Profile Info';

    return 'TechBuddy';
  };

  const getSubtitle = () => {
    if (location.pathname === '/admin') {
      return 'Welcome back, Admin. Here’s what’s happening today.';
    }

    if (location.pathname === '/dashboard') {
      return `Welcome back, ${user?.name || 'User'}.`;
    }

    if (location.pathname === '/tickets') {
      return 'Manage support tickets from all users.';
    }

    if (location.pathname === '/my-tickets') {
      return 'Create and track your own support tickets.';
    }

    if (location.pathname === '/history') {
      return user?.role === 'admin'
        ? 'Review closed support tickets from all users.'
        : 'Review your closed support tickets.';
    }

    if (location.pathname === '/categories') {
      return 'Create, update, and deactivate ticket categories.';
    }

    if (location.pathname === '/profile') {
      return 'Manage your account settings.';
    }

    if (
      location.pathname.startsWith('/tickets/') ||
      location.pathname.startsWith('/my-tickets/')
    ) {
      return 'View full ticket information.';
    }

    return '';
  };

  const displayName = user?.role === 'admin' ? 'Admin' : user?.name || 'User';
  const displayRole = user?.role === 'admin' ? 'IT Support' : 'User';
  const avatarLetter =
    user?.role === 'admin' ? 'A' : user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="topbar">
      <div className="topbar-title-area">
        <h2>{getTitle()}</h2>
        {getSubtitle() && <p>{getSubtitle()}</p>}
      </div>

      <div className="topbar-actions">
        <NotificationBell />

        <div className="topbar-user-card">
          <div className="topbar-user-text">
            <strong>{displayName}</strong>
            <span>{displayRole}</span>
          </div>

          <div className="avatar">{avatarLetter}</div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;