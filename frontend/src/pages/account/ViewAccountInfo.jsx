import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiUser, FiCreditCard, FiMail, FiMapPin, FiPhone, FiCalendar, FiCopy } from "react-icons/fi";

const ViewAccountInfo = () => {
  const { user } = useAuth();
  const customer = mockData.customers.find(c => c.user_id === user?.user_id);
  const account = customer 
    ? mockData.accounts.find(a => a.customer_id === customer.customer_id) 
    : null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied to clipboard: ${text}`);
  };

  if (!user || !customer) return <div>Loading data...</div>;

  // --- STYLE OBJECTS ---
  const styles = {
    container: {
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      color: '#2d3436',
    },
    header: {
      marginBottom: '40px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '800',
      background: '-webkit-linear-gradient(45deg, #6c5ce7, #a29bfe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
    },
    subtitle: {
      color: '#636e72',
      marginTop: '5px',
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
      gap: '40px',
      alignItems: 'start',
    },
    // --- BANK CARD STYLE ---
    cardWrapper: {
      perspective: '1000px',
    },
    bankCard: {
      background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
      borderRadius: '24px',
      padding: '30px',
      color: 'white',
      boxShadow: '0 20px 50px rgba(108, 92, 231, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '220px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.3s ease',
    },
    cardChip: {
      width: '50px',
      height: '35px',
      background: 'linear-gradient(135deg, #dcdde1 0%, #b2bec3 100%)',
      borderRadius: '6px',
      marginBottom: '20px',
      position: 'relative',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    cardNumber: {
      fontSize: '26px',
      letterSpacing: '3px',
      fontFamily: "'Courier New', monospace",
      fontWeight: 'bold',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    cardBalanceLabel: {
      fontSize: '12px',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    cardBalance: {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '5px 0 0 0',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: '20px'
    },
    cardHolder: {
      textTransform: 'uppercase',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '1.5px',
    },
    // --- PROFILE SECTION ---
    profileSection: {
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '1px solid #f1f2f6'
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    iconBox: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#636e72',
      marginRight: '15px',
    },
    label: {
      fontSize: '13px',
      color: '#b2bec3',
      display: 'block',
      marginBottom: '2px',
    },
    value: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2d3436',
    }
  };

  // Sử dụng 'vi-VN' để chữ đ nằm sau số (50.000.000 ₫)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Account Overview</h1>
        <p style={styles.subtitle}>Welcome back, {customer.full_name}</p>
      </div>

      <div style={styles.layout}>
        {/* LEFT COLUMN: THE "WOW" CARD (Cleaned up) */}
        <div style={styles.cardWrapper}>
            {account ? (
                <div style={styles.bankCard}>
                    {/* Decorative Background Circles */}
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>

                    {/* Card Top */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={styles.cardChip}></div>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', opacity: 0.9 }}>SecureBank</span>
                        </div>
                        
                        <div style={styles.cardNumber}>
                            {account.account_number}
                            <FiCopy 
                                style={{ cursor: 'pointer', fontSize: '18px', opacity: 0.7 }} 
                                onClick={() => handleCopy(account.account_number)}
                                title="Copy Account Number"
                            />
                        </div>
                    </div>

                    {/* Card Bottom */}
                    <div>
                        <span style={styles.cardBalanceLabel}>Available Balance</span>
                        <h2 style={styles.cardBalance}>{formatCurrency(account.balance)}</h2>
                        
                        <div style={styles.cardFooter}>
                            <div>
                                <div style={{ fontSize: '10px', opacity: 0.7 }}>CARD HOLDER</div>
                                <div style={styles.cardHolder}>{customer.full_name}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '10px', opacity: 0.7 }}>VALID FROM</div>
                                <div style={{ fontWeight: '600' }}>{account.open_date}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{...styles.bankCard, background: '#ccc'}}>No Account Found</div>
            )}
            
            {/* Đã xóa phần nút bấm ở đây theo yêu cầu */}
        </div>

        {/* RIGHT COLUMN: DETAILED PROFILE */}
        <div style={styles.profileSection}>
            <div style={styles.profileHeader}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#2d3436' }}>Personal Information</h3>
            </div>

            <div style={styles.row}>
                <div style={styles.iconBox}><FiUser /></div>
                <div>
                    <span style={styles.label}>Full Name</span>
                    <span style={styles.value}>{customer.full_name}</span>
                </div>
            </div>

            <div style={styles.row}>
                <div style={styles.iconBox}><FiCalendar /></div>
                <div>
                    <span style={styles.label}>Date of Birth</span>
                    <span style={styles.value}>{customer.date_of_birth}</span>
                </div>
            </div>

            <div style={styles.row}>
                <div style={styles.iconBox}><FiCreditCard /></div>
                <div>
                    <span style={styles.label}>National ID / Citizen ID</span>
                    <span style={styles.value}>{customer.id_card}</span>
                </div>
            </div>

             <div style={styles.row}>
                <div style={styles.iconBox}><FiPhone /></div>
                <div>
                    <span style={styles.label}>Phone Number</span>
                    <span style={styles.value}>{customer.phone}</span>
                </div>
            </div>

            <div style={styles.row}>
                <div style={styles.iconBox}><FiMail /></div>
                <div>
                    <span style={styles.label}>Email Address</span>
                    <span style={styles.value}>{customer.email}</span>
                </div>
            </div>

            <div style={styles.row}>
                <div style={styles.iconBox}><FiMapPin /></div>
                <div>
                    <span style={styles.label}>Address</span>
                    <span style={{...styles.value, lineHeight: '1.4', display: 'block'}}>{customer.address}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAccountInfo;