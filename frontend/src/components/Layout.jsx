import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className={`layout ${isAdmin ? 'theme-admin' : 'theme-user'}`}>
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;