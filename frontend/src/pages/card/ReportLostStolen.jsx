import React, { useState } from 'react';
import { FiAlertTriangle, FiLock, FiPhone, FiCheckCircle } from "react-icons/fi";

const ReportLostStolen = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Giả lập hành động khóa thẻ
  const handleLockCard = () => {
    if (window.confirm("Are you sure you want to lock your card immediately?")) {
      setIsLocked(true);
    }
  };

  // --- STYLES ---
  const styles = {
    container: {
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Để không bị full height
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      backgroundColor: 'white',
      maxWidth: '500px',
      width: '100%',
      borderRadius: '24px',
      padding: '40px',
      textAlign: 'center',
      boxShadow: '0 20px 60px rgba(220, 53, 69, 0.15)', // Đổ bóng màu đỏ nhạt
      border: '1px solid #fff5f5',
      position: 'relative',
      overflow: 'hidden',
    },
    iconWrapper: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: isLocked ? '#e6fffa' : '#fff5f5', // Xanh nếu xong, Đỏ nếu chưa
      color: isLocked ? '#00b894' : '#ff4757',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 25px auto',
      fontSize: '32px',
      transition: 'all 0.3s ease',
    },
    title: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#2d3436',
      marginBottom: '15px',
    },
    description: {
      color: '#636e72',
      fontSize: '15px',
      lineHeight: '1.6',
      marginBottom: '30px',
    },
    // Nút chính (Gradient Đỏ)
    mainBtn: {
      width: '100%',
      padding: '18px',
      border: 'none',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 100%)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 10px 20px rgba(255, 71, 87, 0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
    },
    // Nút phụ (Liên hệ)
    secondaryBtn: {
      marginTop: '20px',
      background: 'transparent',
      border: 'none',
      color: '#636e72',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    // Trạng thái Success
    successBox: {
        padding: '20px',
        backgroundColor: '#e6fffa',
        borderRadius: '16px',
        color: '#00b894',
        fontWeight: 'bold',
        marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* ICON TRANG TRÍ */}
        <div style={styles.iconWrapper}>
          {isLocked ? <FiCheckCircle /> : <FiAlertTriangle />}
        </div>

        {/* NỘI DUNG CHÍNH */}
        {isLocked ? (
            <>
                <h2 style={styles.title}>Card Locked Successfully</h2>
                <p style={styles.description}>
                    Your card has been temporarily locked to prevent unauthorized transactions. 
                    Please contact our support team for a replacement.
                </p>
                <div style={styles.successBox}>
                    <FiLock style={{marginRight: '8px'}}/> Status: SECURE
                </div>
            </>
        ) : (
            <>
                <h2 style={styles.title}>Emergency Card Lock </h2>
                <p style={styles.description}>
                    Lost your card or noticed suspicious activity? 
                    Lock your card immediately to prevent fraud. You can unlock it later anytime.
                </p>

                <button 
                    style={styles.mainBtn}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleLockCard}
                >
                    <FiLock size={20} /> LOCK CARD NOW
                </button>

                <button style={styles.secondaryBtn}>
                    <FiPhone /> Contact Support Hotline
                </button>
            </>
        )}

      </div>
    </div>
  );
};

export default ReportLostStolen;