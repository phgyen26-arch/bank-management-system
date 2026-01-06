import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { 
  FiUser, 
  FiCreditCard, 
  FiDollarSign, 
  FiActivity, 
  FiChevronDown, 
  FiLogOut, 
  FiLayers, 
  FiShield, 
  FiSearch  
} from "react-icons/fi";

import "../css/Sidebar.css";

// --- MENU 1: CUSTOMER (Đã thêm Transfer Money) ---
const CUSTOMER_MENU = [
  {
    title: 'Account',
    path: '/account',
    icon: <FiUser />,
    subItems: [
      { title: 'View Account Info', path: '/account/view-info' },
      { title: 'Update Account Info', path: '/account/update-info' },
      { title: 'Lock/Unlock Account', path: '/account/lock-unlock' }
    ]
  },
  {
    title: 'Loan',
    path: '/loan',
    icon: <FiDollarSign />,
    subItems: [
      { title: 'Record Loan Payment', path: '/loan/payment' },
      { title: 'View Loan Status', path: '/loan/status' },
      { title: 'Register Loan', path: '/loan/register' }
    ]
  },
  {
    title: 'Card',
    path: '/card',
    icon: <FiCreditCard />,
    subItems: [
      { title: 'Report Lost/Stolen', path: '/card/report' },
      { title: 'View Card Information', path: '/card/info' },
      { title: 'Update Card', path: '/card/update' }
    ]
  },
  {
    title: 'Transaction',
    path: '/transaction',
    icon: <FiActivity />,
    subItems: [
      { title: 'View Account Statement', path: '/transaction/statement' },
      { title: 'Pay Bill', path: '/transaction/pay-bill' },
      { title: 'Transfer Money', path: '/transaction/transfer' } // <--- MỚI THÊM
    ]
  }
];

// --- MENU 2: TELLER (Giữ nguyên) ---
const TELLER_MENU = [
  {
    title: 'Account Services',
    path: '/teller/accounts', 
    icon: <FiUser />,
    subItems: [
      { title: 'Open New Account', path: '/teller/create-account?tab=open' },
      { title: 'Update Account', path: '/teller/create-account?tab=update' },
      { title: 'Lock / Suspend', path: '/teller/create-account?tab=lock' },
    ]
  },
  {
    title: 'Transactions',
    path: '/teller/transactions',
    icon: <FiDollarSign />,
    subItems: [
      { title: 'Cash Deposit', path: '/teller/deposit' },
      { title: 'Cash Withdraw', path: '/teller/withdraw' },
      { title: 'Bill Payments', path: '/teller/bill-payments' }
    ]
  },
  {
    title: 'Vault & Security',
    path: '/teller/vault-security',
    icon: <FiShield />,
    subItems: [
      { title: 'Card Management', path: '/teller/card-management' },
      { title: 'Vault Registry', path: '/teller/vault-registry' }
    ]
  }
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra Role: 1 là Teller, ngược lại là Customer
  const isTeller = user?.role_id === 1;
  const currentMenuData = isTeller ? TELLER_MENU : CUSTOMER_MENU;
  const roleLabel = isTeller ? 'Teller Workspace' : 'Personal Banking';

  useEffect(() => {
    // Tự động mở menu cha khi đường dẫn hiện tại khớp với mục con
    const currentPathFull = location.pathname + location.search;

    const activeItem = currentMenuData.find(item =>
      item.subItems.some(sub => {
        // So sánh: Nếu đang ở /teller/create-account?tab=open thì mục chứa nó sẽ mở
        // Logic `includes` giúp bắt được các params phức tạp
        return currentPathFull.includes(sub.path.split('?')[0]);
      })
    );
    if (activeItem) {
      setActiveMenu(activeItem.title);
    }
  }, [location.pathname, location.search, currentMenuData]);

  const toggleMenu = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      {/* LOGO */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <FiLayers />
        </div>
        <div className="brand-text">
            <span>SecureBank</span>
            <span style={{ fontSize: '10px', display: 'block', opacity: 0.6, fontWeight: 'normal' }}>
                {roleLabel}
            </span>
        </div>
      </div>

      {/* MENU LIST */}
      <ul className="menu-list">
        {currentMenuData.map((item, index) => {
          const isActiveParent = activeMenu === item.title;

          return (
            <li key={index} className="menu-item-container">
              <div
                className={`menu-title ${isActiveParent ? 'active' : ''}`}
                onClick={() => toggleMenu(item.title)}
              >
                <div className="menu-title-content">
                  <span className="icon-main">{item.icon}</span>
                  <span className="text">{item.title}</span>
                </div>
                <span className={`arrow ${isActiveParent ? 'rotate' : ''}`}>
                  <FiChevronDown />
                </span>
              </div>

              <ul className={`submenu ${isActiveParent ? 'open' : ''}`}>
                {item.subItems.map((sub, subIndex) => {
                  
                  // --- LOGIC ACTIVE ĐƯỢC NÂNG CẤP ---
                  // Lấy full URL hiện tại (bao gồm ?tab=...)
                  const currentFull = location.pathname + location.search;
                  
                  // So sánh chính xác tuyệt đối để biết tab nào đang active
                  // Trường hợp đặc biệt: Nếu vào trang gốc (không có ?tab) thì mặc định là tab=open
                  const isActiveLink = currentFull === sub.path || 
                       (sub.path.includes('?tab=open') && currentFull === '/teller/create-account');

                  return (
                    <li key={subIndex}>
                      <Link
                        to={sub.path}
                        className={`submenu-item ${isActiveLink ? 'active-link' : ''}`}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}

        {/* LOGOUT */}
        <li className="menu-item-container" style={{ marginTop: '20px' }}>
          <div className="menu-title logout-btn" onClick={handleLogout}>
            <div className="menu-title-content">
              <span className="icon-main"><FiLogOut /></span>
              <span className="text">Logout</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;