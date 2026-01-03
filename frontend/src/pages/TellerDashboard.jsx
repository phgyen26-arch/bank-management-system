import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TellerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', background: '#e3f2fd', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Teller Workspace</h1>
        <div>
          <span>Giao dịch viên: <strong>{user?.profile?.full_name}</strong></span>
          <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Đăng xuất</button>
        </div>
      </header>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3>Dashboard</h3>
        <p>Khu vực quản lý của Teller.</p>
      </div>
    </div>
  );
};

export default TellerDashboard;