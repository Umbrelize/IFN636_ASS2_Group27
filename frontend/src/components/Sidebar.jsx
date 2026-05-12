import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null;
  }

  const isAdmin = user?.role === 'admin';

  const menuItems = isAdmin
    ? [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Tickets', path: '/tickets' },
        { label: 'History', path: '/history' },
        { label: 'Categories', path: '/categories' },
        { label: 'Profile', path: '/profile' },
      ]
    : [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'My Tickets', path: '/my-tickets' },
        { label: 'History', path: '/history' },
        { label: 'Profile', path: '/profile' },
      ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveLink = (path) => {
    if (path === '/history') {
      return location.pathname === '/history';
    }

    if (path === '/profile') {
      return location.pathname === '/profile';
    }

    if (path === '/categories') {
      return location.pathname === '/categories';
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <div className="sidebar-logo">🎫</div>

          <div className="sidebar-brand-text">
            <h2>IT Support Ticket System</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActiveLink(item.path) ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <button type="button" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;