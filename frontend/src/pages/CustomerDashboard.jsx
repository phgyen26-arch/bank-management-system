import React from 'react';
import { FiCreditCard, FiDollarSign, FiShield, FiTrendingUp } from "react-icons/fi";

// Import the created CSS file
import '../css/CustomerDashboard.css';

const CustomerDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        
        {/* --- 4 DECORATIVE ICONS IN 4 CORNERS --- */}
        <FiDollarSign className="deco-icon icon-top-left" />
        <FiShield className="deco-icon icon-top-right" />
        <FiCreditCard className="deco-icon icon-bottom-left" />
        <FiTrendingUp className="deco-icon icon-bottom-right" />

        {/* --- MAIN CONTENT --- */}
        <div className="welcome-text">
          <h1 className="welcome-title">
            Welcome back,<br />
            <span className="brand-highlight">Valued Customer</span>!
          </h1>
          <p className="welcome-subtitle">
            Wishing you a productive banking day with SecureBank.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;