import React from 'react';
import { FiMapPin, FiNavigation, FiShield, FiFileText, FiUserCheck, FiAlertCircle } from "react-icons/fi";

const UpdateAccountInfo = () => {
  
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
      maxWidth: '550px',
      padding: '35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
      border: '1px solid #f0f2f5',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    // MAP VISUALIZATION
    mapBox: {
      width: '100%',
      height: '180px', // Tăng chiều cao xíu cho thoáng
      backgroundColor: '#f8f9fa',
      borderRadius: '20px',
      marginBottom: '30px',
      position: 'relative',
      backgroundImage: 'radial-gradient(#dfe6e9 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #edf2f7'
    },
    // Icon chính giữa (Khiên bảo mật)
    shieldIcon: {
      width: '50px',
      height: '50px',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      zIndex: 2,
      color: '#00b894',
      fontSize: '24px',
      marginBottom: '20px' // Đẩy lên một chút để nhường chỗ cho thẻ địa chỉ
    },
    pulseRing: {
      position: 'absolute',
      width: '100px',
      height: '100px',
      border: '1px solid rgba(0, 184, 148, 0.3)',
      borderRadius: '50%',
      zIndex: 1,
      top: 'calc(50% - 60px)', // Căn chỉnh lại vị trí vòng tròn
      left: 'calc(50% - 50px)',
    },
    // THẺ ĐỊA CHỈ (Branch Card) - Y chang file UpdateCard
    branchCard: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      right: '15px',
      backgroundColor: 'white',
      padding: '12px 16px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '13px',
      textAlign: 'left',
      zIndex: 3
    },
    // CONTENT
    title: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#2d3436',
      marginBottom: '15px',
    },
    desc: {
      color: '#636e72',
      fontSize: '15px',
      lineHeight: '1.6',
      marginBottom: '15px',
    },
    maintenanceBox: {
        backgroundColor: '#fff8e1',
        color: '#d35400',
        padding: '12px',
        borderRadius: '10px',
        fontSize: '13px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textAlign: 'left'
    },
    // CHECKLIST
    checklistTitle: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#6c5ce7',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '15px',
        textAlign: 'left'
    },
    checkList: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '30px'
    },
    checkItem: {
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#2d3436',
        border: '1px solid #eee'
    },
    // BUTTON
    btn: {
      width: '100%',
      padding: '16px',
      borderRadius: '14px',
      border: 'none',
      background: 'linear-gradient(135deg, #0984e3 0%, #00cec9 100%)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      boxShadow: '0 10px 20px rgba(9, 132, 227, 0.25)',
      transition: 'transform 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* MAP VISUALIZATION */}
        <div style={styles.mapBox}>
            <div style={styles.pulseRing}></div>
            <div style={styles.shieldIcon}>
                <FiShield />
            </div>

            {/* BRANCH INFO CARD (Đã cập nhật đúng địa chỉ Cầu Giấy) */}
            <div style={styles.branchCard}>
                <div>
                    <div style={{fontWeight: 'bold', color: '#6c5ce7', marginBottom: '2px'}}>SecureBank HQ Hanoi</div>
                    <div style={{fontSize: '11px', color: '#636e72', display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <FiMapPin size={10} /> 123 Tran Duy Hung, Cau Giay
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#e6fffa', color: '#00b894', 
                    padding: '6px 10px', borderRadius: '8px', 
                    fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px'
                }}>
                    OPEN NOW
                </div>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <h2 style={styles.title}>Update Profile Info</h2>
        <p style={styles.desc}>
            To ensure account security, updating sensitive information (ID, Phone) requires <strong>in-person verification</strong>.
        </p>

        {/* MAINTENANCE NOTICE */}
        <div style={styles.maintenanceBox}>
            <FiAlertCircle size={20} style={{flexShrink: 0}} />
            <div>
                <strong>System Maintenance:</strong> Online updates for Email & Address are currently unavailable.
            </div>
        </div>

        {/* REQUIRED DOCUMENTS */}
        <div style={styles.checklistTitle}>Required Documents</div>
        <div style={styles.checkList}>
            <div style={styles.checkItem}>
                <FiUserCheck size={24} color="#6c5ce7" />
                <span>Original ID / CCCD</span>
            </div>
            <div style={styles.checkItem}>
                <FiFileText size={24} color="#e84393" />
                <span>Update Form (At Counter)</span>
            </div>
        </div>

        {/* ACTION BUTTON */}
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

export default UpdateAccountInfo;