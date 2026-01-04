import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiWifi } from "react-icons/fi"; // Icon sóng Contactless

const ViewCardInfo = () => {
  const { user } = useAuth();
  const customer = mockData.customers.find(c => c.user_id === user?.user_id);
  const account = customer ? mockData.accounts.find(a => a.customer_id === customer.customer_id) : null;

  if (!account) return <div style={{padding: '20px', textAlign: 'center'}}>Loading card data...</div>;

  // --- STYLES ---
  const styles = {
    wrapper: {
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
    },
    // Khung thẻ chính
    card: {
      width: '420px',
      height: '260px',
      borderRadius: '24px',
      padding: '30px',
      color: 'white',
      // Gradient tím sang chảnh
      background: 'linear-gradient(120deg, #6c5ce7 0%, #a29bfe 100%)',
      boxShadow: '0 20px 50px rgba(108, 92, 231, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.3s ease',
      cursor: 'default',
    },
    // Hình tròn trang trí nền (Abstract Art)
    decoCircle1: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
      zIndex: 0,
    },
    decoCircle2: {
      position: 'absolute',
      bottom: '-80px',
      left: '-80px',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
      zIndex: 0,
    },
    // Nội dung bên trên layer trang trí
    content: {
      position: 'relative',
      zIndex: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    bankName: {
      fontSize: '18px',
      fontWeight: '800',
      fontStyle: 'italic',
      letterSpacing: '1px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    // Chip điện tử (Mô phỏng CSS)
    chip: {
      width: '50px',
      height: '36px',
      background: 'linear-gradient(135deg, #f1c40f 0%, #d35400 100%)', // Màu vàng kim
      borderRadius: '6px',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.1)',
      marginBottom: '10px'
    },
    // Đường mạch điện trên chip
    chipLine: {
      position: 'absolute',
      border: '1px solid rgba(0,0,0,0.3)',
      borderRadius: '4px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '60%',
    },
    // Số thẻ
    cardNumber: {
      fontSize: '26px',
      letterSpacing: '3px',
      fontFamily: "'Courier New', monospace", // Font kiểu dập nổi
      fontWeight: 'bold',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    bottomRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    label: {
      fontSize: '9px',
      textTransform: 'uppercase',
      opacity: 0.8,
      letterSpacing: '1px',
      marginBottom: '4px',
      fontWeight: '600',
    },
    value: {
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    },
    visaLogo: {
      fontSize: '24px',
      fontWeight: '900',
      fontStyle: 'italic',
      color: 'white',
      textShadow: '0 2px 5px rgba(0,0,0,0.2)',
    }
  };

  return (
    <div style={styles.wrapper}>
      <div 
        style={styles.card}
        // Hiệu ứng nghiêng nhẹ khi hover (3D feel)
        onMouseEnter={(e) => {
             e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
             e.currentTarget.style.boxShadow = '0 30px 60px rgba(108, 92, 231, 0.4)';
        }}
        onMouseLeave={(e) => {
             e.currentTarget.style.transform = 'translateY(0) scale(1)';
             e.currentTarget.style.boxShadow = styles.card.boxShadow;
        }}
      >
        {/* Decorative Background */}
        <div style={styles.decoCircle1}></div>
        <div style={styles.decoCircle2}></div>

        <div style={styles.content}>
            {/* Top: Logo & Contactless */}
            <div style={styles.topRow}>
                <div>
                     {/* Chip EMV giả lập */}
                    <div style={styles.chip}>
                        <div style={styles.chipLine}></div>
                    </div>
                    <FiWifi size={24} style={{ opacity: 0.8, transform: 'rotate(90deg)' }} />
                </div>
                <div style={styles.bankName}>SecureBank</div>
            </div>

            {/* Middle: Card Number [Image of credit card EMV chip] */}
            <div style={styles.cardNumber}>
                <span>4455</span>
                <span>8899</span>
                <span>1234</span>
                <span>{account.account_number.slice(-4)}</span>
            </div>

            {/* Bottom: Info & Visa Logo */}
            <div style={styles.bottomRow}>
                <div style={{ display: 'flex', gap: '40px' }}>
                    <div>
                        <div style={styles.label}>Card Holder</div>
                        <div style={styles.value}>{customer.full_name}</div>
                    </div>
                    <div>
                        <div style={styles.label}>Valid Thru</div>
                        <div style={styles.value}>12/28</div>
                    </div>
                </div>
                
                <div style={styles.visaLogo}>VISA</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCardInfo;