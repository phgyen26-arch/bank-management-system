import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar'; // Giả sử bạn tái sử dụng Sidebar
// Nếu Sidebar của bạn cần truyền props danh sách menu, chúng ta sẽ xử lý ở đây

const TellerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Định nghĩa Menu cho Teller (Tiếng Anh)
  // Nếu Sidebar của bạn tự động nhận diện role thì không cần cái này, 
  // nhưng nếu cần truyền props thì đây là danh sách mẫu:
  const tellerMenuItems = [
    { label: 'Dashboard', path: '/teller/dashboard', icon: 'dashboard' },
    { label: 'Customer Accounts', path: '/teller/create-account', icon: 'person_add' },
    { label: 'Transactions', path: '/teller/transactions', icon: 'payments' },
    { label: 'Loans', path: '/teller/loans', icon: 'account_balance' },
    { label: 'Cards', path: '/teller/cards', icon: 'credit_card' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    // Container chính: Flex row để chia Sidebar và Main Content
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      
      {/* Cột 1: Sidebar */}
      {/* Bạn cần đảm bảo component Sidebar nhận props hoặc xử lý logic hiển thị cho Teller */}
      <Sidebar role="teller" /> 

      {/* Cột 2: Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header riêng của phần Main Content */}
        <header style={{
            height: '64px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#1a1a1a', fontWeight: '600' }}>
                Teller Workspace
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#555', fontSize: '14px' }}>
                    Hello, <strong>{user?.profile?.full_name || 'Teller'}</strong>
                </span>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}
                >
                    Logout
                </button>
            </div>
        </header>

        {/* Khu vực hiển thị nội dung con (Outlet) */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            {/* Nếu đang ở trang gốc /teller, hiển thị nội dung mặc định, nếu không thì hiển thị Outlet */}
            <div style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '8px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
            }}>
                <Outlet />
                {/* Nội dung mặc định nếu chưa chọn tab nào (hoặc bạn có thể tạo một trang Dashboard Home riêng) */}
                <h3>Welcome back, Teller!</h3>
                <p style={{ color: '#666' }}>Select an option from the sidebar to manage customer requests.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TellerDashboard;