import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiLock, FiUnlock, FiShield, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const LockUnlockAccount = () => {
  const { user } = useAuth();
  
  // State
  const [accountNumber, setAccountNumber] = useState('Loading...');
  const [isLocked, setIsLocked] = useState(false); // Mặc định là FALSE (Đang hoạt động)
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // 1. Lấy thông tin tài khoản khi vào trang
  useEffect(() => {
    if (user) {
      const customer = mockData.customers.find(c => c.user_id === user.user_id);
      if (customer) {
        const account = mockData.accounts.find(a => a.customer_id === customer.customer_id);
        if (account) {
          setAccountNumber(account.account_number);
          // setIsLocked(account.status === 'LOCKED'); // Giả lập lấy trạng thái từ DB
        }
      }
    }
  }, [user]);

  // 2. Xử lý khóa/mở khóa
  const handleToggleLock = () => {
    setLoading(true);

    // Giả lập gọi API mất 0.8 giây
    setTimeout(() => {
        const newStatus = !isLocked;
        setIsLocked(newStatus);
        setLoading(false);

        if (newStatus) {
            setNotification({ 
                type: 'error', 
                message: 'Account has been LOCKED successfully. All outgoing transactions are disabled.' 
            });
        } else {
            setNotification({ 
                type: 'success', 
                message: 'Account UNLOCKED. You can now perform transactions normally.' 
            });
        }
    }, 800);
  };

  return (
    <>
      {/* 3. NHÚNG CSS TRỰC TIẾP VÀO ĐÂY */}
      <style>{`
        /* Container chung */
        .lock-page-container {
            display: flex;
            justify-content: center;
            padding: 40px 20px;
            background-color: #f0f2f5;
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Thẻ chính */
        .lock-card {
            background: white;
            width: 100%;
            max-width: 450px;
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: all 0.5s ease;
            height: fit-content;
            position: relative;
            overflow: hidden;
        }

        /* Hiệu ứng viền nhẹ khi đổi trạng thái */
        .lock-card.status-locked {
            border-top: 5px solid #ef4444; /* Đỏ */
        }

        .lock-card.status-active {
            border-top: 5px solid #10b981; /* Xanh */
        }

        /* Header */
        .security-header {
            margin-bottom: 30px;
            color: #475569;
        }

        .shield-icon {
            font-size: 3rem;
            color: #3b82f6;
            margin-bottom: 10px;
        }

        .security-header h2 {
            font-size: 1.5rem;
            margin: 0 0 5px 0;
            color: #1e293b;
            font-weight: 700;
        }

        /* Visual Icon Chính giữa */
        .status-visual {
            margin: 30px 0;
        }

        .icon-circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
            font-size: 3rem;
            color: white;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Trạng thái Locked - Màu đỏ */
        .icon-circle.locked {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            box-shadow: 0 10px 20px rgba(239, 68, 68, 0.4);
        }

        /* Trạng thái Active - Màu xanh */
        .icon-circle.active {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 10px 20px rgba(16, 185, 129, 0.4);
        }

        .status-text {
            font-size: 1.2rem;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 0;
        }

        .status-locked .status-text { color: #b91c1c; }
        .status-active .status-text { color: #059669; }

        /* Description Text */
        .description-text {
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 30px;
        }

        /* Notification Box */
        .status-message {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 0.9rem;
            animation: slideDown 0.3s ease;
        }

        .status-message.success {
            background-color: #ecfdf5;
            color: #047857;
            border: 1px solid #a7f3d0;
        }

        .status-message.error {
            background-color: #fef2f2;
            color: #b91c1c;
            border: 1px solid #fecaca;
        }

        /* Action Button */
        .btn-action {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            text-transform: uppercase;
            color: white;
        }

        /* Nút Khóa (Màu đỏ) */
        .btn-lock {
            background: linear-gradient(to right, #ef4444, #dc2626);
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .btn-lock:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        /* Nút Mở Khóa (Màu xanh) */
        .btn-unlock {
            background: linear-gradient(to right, #10b981, #059669);
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .btn-unlock:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-action:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 4. GIAO DIỆN JSX */}
      <div className="lock-page-container">
        <div className={`lock-card ${isLocked ? 'status-locked' : 'status-active'}`}>
            
            {/* Header Section */}
            <div className="security-header">
                <FiShield className="shield-icon" />
                <h2>Security Control</h2>
                <p>Account Number: <strong>{accountNumber}</strong></p>
            </div>

            {/* Status Icon Animation */}
            <div className="status-visual">
                <div className={`icon-circle ${isLocked ? 'locked' : 'active'}`}>
                    {isLocked ? <FiLock /> : <FiUnlock />}
                </div>
                <h3 className="status-text">
                    {isLocked ? "ACCOUNT IS LOCKED" : "ACCOUNT IS ACTIVE"}
                </h3>
            </div>

            {/* Notification Area */}
            {notification.message && (
                <div className={`status-message ${notification.type}`}>
                    {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertTriangle />}
                    <span>{notification.message}</span>
                </div>
            )}

            {/* Description */}
            <p className="description-text">
                {isLocked 
                    ? "Your account is currently frozen. No funds can be withdrawn or transferred. Unlocking is required to resume services."
                    : "Your account is fully operational. If you suspect any suspicious activity, lock your account immediately to secure your funds."
                }
            </p>

            {/* Action Button */}
            <button 
                className={`btn-action ${isLocked ? 'btn-unlock' : 'btn-lock'}`}
                onClick={handleToggleLock}
                disabled={loading}
            >
                {loading ? 'Processing...' : (isLocked ? 'UNLOCK ACCOUNT NOW' : 'LOCK ACCOUNT INSTANTLY')}
            </button>

        </div>
      </div>
    </>
  );
};

export default LockUnlockAccount;