import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiCheckCircle, FiCreditCard, FiDollarSign, FiArrowRight, FiInfo, FiRefreshCw } from "react-icons/fi";

const RecordLoanPayment = () => {
  const { user } = useAuth();
  
  // 1. Khởi tạo state cho danh sách khoản vay từ mockData để UI có thể cập nhật (Re-render)
  const [loans, setLoans] = useState(() => {
    const customer = mockData.customers.find(c => c.user_id === user?.user_id);
    return customer ? mockData.loans.filter(l => l.customer_id === customer.customer_id) : [];
  });

  const [selectedLoanId, setSelectedLoanId] = useState(loans.length > 0 ? loans[0].loan_id : '');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy khoản vay hiện tại trong state
  const selectedLoan = loans.find(l => l.loan_id.toString() === selectedLoanId.toString());

  // Reset form khi đổi khoản vay
  useEffect(() => {
    setAmount('');
    setIsSuccess(false);
  }, [selectedLoanId]);

  const formatCurrency = (val) => {
    if (val === undefined || val === null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN').format(val) + ' ₫';
  };

  // --- LOGIC CẬP NHẬT DỮ LIỆU ---
  const handlePayment = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return alert("Vui lòng nhập số tiền hợp lệ");
    if (parseFloat(amount) > selectedLoan.principal_amount) return alert("Số tiền trả vượt quá dư nợ!");

    setIsLoading(true);

    setTimeout(() => {
        // 1. Tính toán số dư mới
        const payAmount = parseFloat(amount);
        const newBalance = selectedLoan.principal_amount - payAmount;
        const newStatus = newBalance <= 0 ? 'CLOSED' : selectedLoan.status;

        // 2. Cập nhật vào mockData (Database giả) để các trang khác cũng thấy thay đổi
        const loanInDB = mockData.loans.find(l => l.loan_id.toString() === selectedLoanId.toString());
        if (loanInDB) {
            loanInDB.principal_amount = newBalance;
            loanInDB.status = newStatus;
        }

        // 3. Cập nhật State để UI hiện tại thay đổi ngay lập tức
        setLoans(prevLoans => prevLoans.map(loan => {
            if (loan.loan_id.toString() === selectedLoanId.toString()) {
                return { ...loan, principal_amount: newBalance, status: newStatus };
            }
            return loan;
        }));

        setIsLoading(false);
        setIsSuccess(true);
    }, 1500);
  };

  // --- STYLES ---
  const styles = {
    container: { padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', sans-serif", color: '#2d3436' },
    header: { marginBottom: '30px' },
    title: { fontSize: '28px', fontWeight: '800', color: '#2d3436', margin: 0 },
    subtitle: { color: '#636e72', marginTop: '5px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' },
    formCard: { backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f1f2f6' },
    formGroup: { marginBottom: '25px' },
    label: { display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '14px', color: '#2d3436' },
    select: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #dfe6e9', fontSize: '16px', outline: 'none', backgroundColor: '#f9f9f9', cursor: 'pointer' },
    inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    input: { width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', border: '1px solid #dfe6e9', fontSize: '18px', fontWeight: 'bold', outline: 'none', color: '#6c5ce7' },
    inputIcon: { position: 'absolute', left: '15px', color: '#b2bec3' },
    quickBtnGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
    quickBtn: { padding: '8px 15px', borderRadius: '20px', border: '1px solid #dfe6e9', background: 'white', fontSize: '12px', cursor: 'pointer', color: '#636e72', transition: 'all 0.2s' },
    submitBtn: {
        width: '100%', padding: '18px', marginTop: '20px', borderRadius: '12px', border: 'none',
        background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
        color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(108, 92, 231, 0.2)', transition: 'transform 0.2s'
    },
    summaryCard: { backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '24px', border: '1px solid #dfe6e9', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px' },
    summaryLabel: { color: '#636e72' },
    summaryValue: { fontWeight: '600', color: '#2d3436' },
    divider: { height: '1px', background: '#dfe6e9', margin: '20px 0' },
    totalLabel: { fontSize: '16px', fontWeight: 'bold', color: '#2d3436' },
    totalValue: { fontSize: '20px', fontWeight: '800', color: '#6c5ce7' },
    successBox: { textAlign: 'center', padding: '40px' },
    successTitle: { fontSize: '24px', fontWeight: 'bold', color: '#00b894', marginTop: '20px' },
    successText: { color: '#636e72', margin: '10px 0 30px 0' }
  };

  if (!loans.length) return <div style={{padding:'40px', textAlign:'center'}}>You have no active loans to pay.</div>;

  // VIEW: SUCCESS
  if (isSuccess) {
    return (
        <div style={styles.container}>
            <div style={{...styles.formCard, ...styles.successBox}}>
                <FiCheckCircle size={80} color="#00b894" />
                <h2 style={styles.successTitle}>Payment Successful!</h2>
                <p style={styles.successText}>
                    You have successfully paid <strong>{formatCurrency(parseFloat(amount))}</strong>. <br/>
                    The remaining balance for loan #{selectedLoanId} is now <strong>{formatCurrency(selectedLoan.principal_amount)}</strong>.
                </p>
                <button 
                    style={{...styles.submitBtn, width: '220px', background: '#00b894', boxShadow: '0 10px 20px rgba(0, 184, 148, 0.2)'}}
                    onClick={() => {
                        setIsSuccess(false);
                        setAmount(''); // Reset số tiền để nhập lần mới
                    }}
                >
                    Make Another Payment
                </button>
            </div>
        </div>
    );
  }

  // VIEW: FORM
  const principal = selectedLoan ? selectedLoan.principal_amount : 0;
  // Tính toán real-time
  const newBalance = principal - (parseFloat(amount) || 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Loan Repayment</h1>
        <p style={styles.subtitle}>Securely pay off your loans online</p>
      </div>

      <div style={styles.grid}>
        {/* LEFT: FORM */}
        <div style={styles.formCard}>
            <form onSubmit={handlePayment}>
                {/* Select Loan */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Select Loan Contract</label>
                    <div style={styles.inputWrapper}>
                        <select 
                            style={styles.select} 
                            value={selectedLoanId}
                            onChange={(e) => setSelectedLoanId(e.target.value)}
                        >
                            {loans.map(loan => (
                                <option key={loan.loan_id} value={loan.loan_id} disabled={loan.status === 'CLOSED'}>
                                    {loan.loan_type} - #{loan.loan_id} {loan.status === 'CLOSED' ? '(Paid Off)' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Amount Input */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Amount to Pay</label>
                    <div style={styles.inputWrapper}>
                        <FiDollarSign style={styles.inputIcon} size={20}/>
                        <input 
                            type="number" 
                            style={styles.input} 
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            max={principal}
                        />
                    </div>
                    {/* Quick Buttons */}
                    <div style={styles.quickBtnGroup}>
                        <button type="button" style={styles.quickBtn} onClick={() => setAmount(Math.round(principal * 0.1))}>Min (10%)</button>
                        <button type="button" style={styles.quickBtn} onClick={() => setAmount(Math.round(principal * 0.5))}>50%</button>
                        <button type="button" style={styles.quickBtn} onClick={() => setAmount(principal)}>Full Amount</button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    style={{
                        ...styles.submitBtn, 
                        opacity: (isLoading || principal <= 0) ? 0.7 : 1, 
                        cursor: (isLoading || principal <= 0) ? 'not-allowed' : 'pointer',
                        background: principal <= 0 ? '#b2bec3' : styles.submitBtn.background
                    }}
                    disabled={isLoading || principal <= 0}
                >
                    {isLoading ? 'Processing...' : (principal <= 0 ? 'Loan Fully Paid' : 'Confirm Payment')}
                </button>
            </form>
        </div>

        {/* RIGHT: SUMMARY (Cập nhật Real-time) */}
        <div style={styles.summaryCard}>
            <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <FiRefreshCw color="#6c5ce7" className={isLoading ? "spin" : ""} />
                <span style={{fontWeight: 'bold', fontSize: '18px'}}>Transaction Summary</span>
            </div>

            <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Current Balance</span>
                <span style={styles.summaryValue}>{formatCurrency(principal)}</span>
            </div>

            <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Payment Amount</span>
                <span style={{...styles.summaryValue, color: '#00b894'}}>
                    - {formatCurrency(amount || 0)}
                </span>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.summaryRow}>
                <span style={styles.totalLabel}>Estimated New Balance</span>
                <div style={{textAlign: 'right'}}>
                    <span style={styles.totalValue}>{formatCurrency(newBalance > 0 ? newBalance : 0)}</span>
                    {newBalance <= 0 && amount > 0 && (
                        <div style={{fontSize: '11px', color: '#00b894', marginTop: '5px', fontWeight: 'bold'}}>✨ Fully Paid! Good job!</div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecordLoanPayment;