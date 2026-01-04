import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiHome, FiCreditCard, FiDollarSign, FiCalendar, FiClock, FiActivity, FiTrendingUp } from "react-icons/fi";

const ViewLoanStatus = () => {
  const { user } = useAuth();
  const customer = mockData.customers.find(c => c.user_id === user?.user_id);
  const myLoans = customer ? mockData.loans.filter(l => l.customer_id === customer.customer_id) : [];

  // --- HELPER: Chọn Icon dựa trên tên khoản vay ---
  const getLoanIcon = (type) => {
    const t = type.toLowerCase();
    if (t.includes('nhà') || t.includes('home')) return <FiHome size={24} color="#fff" />;
    if (t.includes('xe') || t.includes('car')) return <FiActivity size={24} color="#fff" />; // Ví dụ
    if (t.includes('thẻ') || t.includes('card')) return <FiCreditCard size={24} color="#fff" />;
    return <FiDollarSign size={24} color="#fff" />;
  };

  // --- HELPER: Màu sắc trạng thái ---
  const getStatusConfig = (status) => {
    const s = status.toLowerCase();
    if (s === 'active') return { color: '#00b894', bg: '#e6fffa', label: 'Active' };
    if (s === 'pending') return { color: '#e67e22', bg: '#fff3e0', label: 'Pending' };
    return { color: '#636e72', bg: '#dfe6e9', label: status };
  };

  // --- HELPER: Format tiền tệ (Số + ₫) ---
  const formatCurrency = (amount) => {
    // Format số dạng 1.000.000 sau đó thêm đ
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  // --- STYLES ---
  const styles = {
    container: {
      padding: '30px',
      fontFamily: "'Inter', sans-serif",
      color: '#2d3436',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#2d3436',
      marginBottom: '5px',
    },
    headerSub: {
      fontSize: '14px',
      color: '#636e72',
      marginBottom: '30px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
    },
    // CARD STYLE
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      border: '1px solid #f0f2f5',
      transition: 'all 0.3s ease',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
    },
    iconWrapper: {
      width: '50px',
      height: '50px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 10px rgba(108, 92, 231, 0.3)',
    },
    loanType: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '15px',
      color: '#2d3436',
    },
    amountLabel: {
      fontSize: '12px',
      textTransform: 'uppercase',
      color: '#b2bec3',
      fontWeight: '600',
      marginTop: '5px',
    },
    amountValue: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#6c5ce7', // Màu tím thương hiệu
      margin: '5px 0 20px 0',
    },
    // INFO GRID inside Card
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '12px',
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column',
    },
    infoLabel: {
      fontSize: '11px',
      color: '#636e72',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    infoValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3436',
    },
    // PROGRESS BAR DECORATION
    progressBg: {
      height: '6px',
      width: '100%',
      backgroundColor: '#dfe6e9',
      borderRadius: '3px',
      marginTop: '20px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      width: '30%', // Giả lập progress 30%
      backgroundColor: '#00b894',
      borderRadius: '3px',
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h2 style={styles.headerTitle}>My Loans </h2>
        <p style={styles.headerSub}>Track and manage your credit portfolio</p>
      </div>

      {myLoans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '20px' }}>
          <p>You don't have any active loans.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {myLoans.map((loan, index) => {
            const statusConfig = getStatusConfig(loan.status);
            
            return (
              <div 
                key={loan.loan_id} 
                style={styles.card}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(108, 92, 231, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                }}
              >
                {/* Header: Icon & Status Badge */}
                <div style={styles.cardHeader}>
                    <div style={styles.iconWrapper}>
                        {getLoanIcon(loan.loan_type)}
                    </div>
                    <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.color
                    }}>
                        {statusConfig.label}
                    </span>
                </div>

                {/* Main Loan Info */}
                <div>
                    <div style={styles.loanType}>{loan.loan_type}</div>
                    <div style={styles.amountLabel}>Principal Amount</div>
                    <div style={styles.amountValue}>{formatCurrency(loan.principal_amount)}</div>
                </div>

                {/* Details Grid */}
                <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}><FiTrendingUp /> Interest Rate</span>
                        <span style={styles.infoValue}>{loan.interest_rate}% / year</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}><FiClock /> Duration</span>
                        <span style={styles.infoValue}>{loan.duration_months} months</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}><FiCalendar /> Start Date</span>
                        <span style={styles.infoValue}>{loan.start_date}</span>
                    </div>
                     <div style={styles.infoItem}>
                        <span style={styles.infoLabel}># Contract ID</span>
                        <span style={styles.infoValue}>{loan.loan_id}</span>
                    </div>
                </div>

                {/* Decorative Progress Bar (Visual only - to make it look "pro") */}
                <div style={styles.progressBg}>
                    <div style={styles.progressFill}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#b2bec3' }}>Repayment progress</span>
                    <span style={{ fontSize: '10px', color: '#00b894', fontWeight: 'bold' }}>On Track</span>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewLoanStatus;