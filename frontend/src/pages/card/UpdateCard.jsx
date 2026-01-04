import React from 'react';
import { FiMapPin, FiNavigation, FiInfo, FiCreditCard, FiUserCheck, FiClock } from "react-icons/fi";

const UpdateCard = () => {
  
  // --- STYLES ---
  const styles = {
    container: {
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '24px',
      width: '100%',
      maxWidth: '500px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
      border: '1px solid #f0f2f5',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    // MAP VISUALIZATION (Giả lập bản đồ)
    mapBox: {
      width: '100%',
      height: '180px',
      backgroundColor: '#f1f2f6',
      borderRadius: '20px',
      marginBottom: '25px',
      position: 'relative',
      backgroundImage: 'radial-gradient(#dfe6e9 1px, transparent 1px)',
      backgroundSize: '20px 20px', // Tạo hiệu ứng lưới bản đồ
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #dfe6e9'
    },
    pinWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    pin: {
      width: '40px',
      height: '40px',
      backgroundColor: '#6c5ce7',
      borderRadius: '50% 50% 0 50%',
      transform: 'rotate(45deg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(108, 92, 231, 0.4)',
      zIndex: 2,
    },
    pinDot: {
      width: '14px',
      height: '14px',
      backgroundColor: 'white',
      borderRadius: '50%',
    },
    // Hiệu ứng sóng lan tỏa (Pulse)
    pulse: {
      position: 'absolute',
      width: '100px',
      height: '40px',
      backgroundColor: 'rgba(108, 92, 231, 0.2)',
      borderRadius: '50%',
      bottom: '-15px',
      zIndex: 1,
      transform: 'scale(1)',
      animation: 'pulse 2s infinite', // Lưu ý: Animation cần định nghĩa trong CSS global hoặc dùng thư viện
    },
    // Branch Info
    branchCard: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      right: '15px',
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '13px',
      textAlign: 'left'
    },
    // CONTENT
    title: {
      fontSize: '22px',
      fontWeight: '800',
      color: '#2d3436',
      marginBottom: '10px',
    },
    desc: {
      color: '#636e72',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '30px',
    },
    // CHECKLIST
    checklist: {
      backgroundColor: '#fff0f6', // Nền hồng nhạt
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '30px',
      textAlign: 'left',
    },
    checkItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px',
      color: '#2d3436',
      fontWeight: '500',
      fontSize: '14px',
    },
    iconBox: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: '#e84393',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    // BUTTON
    btn: {
      width: '100%',
      padding: '16px',
      borderRadius: '14px',
      border: 'none',
      background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      boxShadow: '0 10px 20px rgba(108, 92, 231, 0.2)',
      transition: 'transform 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* 1. MAP VISUALIZATION */}
        <div style={styles.mapBox}>
            <div style={styles.pinWrapper}>
                <div style={styles.pin}>
                    <div style={styles.pinDot}></div>
                </div>
                {/* Giả lập bóng đổ pulse bằng div tĩnh */}
                <div style={{...styles.pulse, filter: 'blur(5px)'}}></div>
            </div>

            {/* Thông tin chi nhánh giả lập nổi trên bản đồ */}
            <div style={styles.branchCard}>
                <div>
                    <div style={{fontWeight: 'bold', color: '#6c5ce7'}}>SecureBank HQ Hanoi </div>
                    <div style={{fontSize: '11px', color: '#b2bec3'}}>123 Tran Duy Hung, Cau Giay</div>
                </div>
                <div style={{
                    backgroundColor: '#e6fffa', color: '#00b894', 
                    padding: '4px 8px', borderRadius: '6px', 
                    fontSize: '10px', fontWeight: 'bold'
                }}>
                    OPEN NOW
                </div>
            </div>
        </div>

        {/* 2. TEXT CONTENT */}
        <h2 style={styles.title}>Limit Update In-Branch</h2>
        <p style={styles.desc}>
            Online limit updates are currently under maintenance. 
            Please visit our nearest branch for immediate assistance with a higher limit.
        </p>

        {/* 3. CHECKLIST (Những thứ cần mang) */}
        <div style={styles.checklist}>
            <div style={{fontSize: '12px', fontWeight: 'bold', color: '#e84393', textTransform: 'uppercase', marginBottom: '15px'}}>
                Required Documents
            </div>
            
            <div style={styles.checkItem}>
                <div style={styles.iconBox}><FiUserCheck /></div>
                <span>Original ID / Citizen Card (CCCD)</span>
            </div>
            <div  style={{...styles.checkItem, marginBottom: 0}}>
                <div style={styles.iconBox}><FiCreditCard /></div>
                <span>Your Physical SecureBank Card</span>
            </div>
        </div>

        {/* 4. ACTION BUTTON */}
        <button 
            style={styles.btn}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <FiNavigation size={18} /> Get Directions
        </button>

      </div>
    </div>
  );
};

export default UpdateCard;