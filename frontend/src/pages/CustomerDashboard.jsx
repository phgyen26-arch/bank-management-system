import React from 'react';
import { FiCreditCard, FiDollarSign, FiShield, FiTrendingUp } from "react-icons/fi";

// Import file CSS vừa tạo
import '../css/CustomerDashboard.css';

const CustomerDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        
        {/* --- 4 ICON TRANG TRÍ 4 GÓC --- */}
        <FiDollarSign className="deco-icon icon-top-left" />
        <FiShield className="deco-icon icon-top-right" />
        <FiCreditCard className="deco-icon icon-bottom-left" />
        <FiTrendingUp className="deco-icon icon-bottom-right" />

        {/* --- NỘI DUNG CHÍNH --- */}
        <div className="welcome-text">
          <h1 className="welcome-title">
            Chào mừng trở lại,<br />
            <span className="brand-highlight">Khách hàng thân thiết</span>!
          </h1>
          <p className="welcome-subtitle">
            Chúc bạn một ngày giao dịch hiệu quả cùng SecureBank.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;