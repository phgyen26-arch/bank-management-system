import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiCreditCard, 
  FiDollarSign, 
  FiActivity, 
  FiChevronDown, 
  FiLogOut, 
  FiLayers 
} from "react-icons/fi";

import "../css/Sidebar.css";

const SIDEBAR_DATA = [
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
      { title: 'Pay Bill', path: '/transaction/pay-bill' }
    ]
  }
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const activeItem = SIDEBAR_DATA.find(item =>
      item.subItems.some(sub => sub.path === location.pathname)
    );
    if (activeItem) {
      setActiveMenu(activeItem.title);
    }
  }, [location.pathname]);

  const toggleMenu = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const handleLogout = () => {
    // Xóa dữ liệu đăng nhập nếu có
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Điều hướng về trang đăng nhập
    navigate("/");
  };

  return (
    <div className="sidebar">
      {/* LOGO */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <FiLayers />
        </div>
        <span className="brand-text">SecureBank</span>
      </div>

      {/* MENU */}
      <ul className="menu-list">
        {SIDEBAR_DATA.map((item, index) => {
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
                  const isActiveLink = location.pathname === sub.path;
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
