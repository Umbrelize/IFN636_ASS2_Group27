import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const isAdmin = user?.role === 'admin';

  const menuItems = isAdmin
    ? [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Tickets', path: '/tickets' },
        { label: 'Profile', path: '/profile' },
      ]
    : [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'My Tickets', path: '/my-tickets' },
        { label: 'Profile', path: '/profile' },
      ];

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
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/profile' &&
                location.pathname.startsWith(item.path + '/'));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? 'active' : ''}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;