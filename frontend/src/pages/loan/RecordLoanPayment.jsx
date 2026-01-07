import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiCheckCircle, FiDollarSign, FiRefreshCw, FiCreditCard } from "react-icons/fi";

const RecordLoanPayment = () => {
  const { user } = useAuth();

  // --- 1. DATA LOGIC ---
  const [loans, setLoans] = useState(() => {
    const customer = mockData.customers.find(c => c.user_id === user?.user_id);
    return customer ? mockData.loans.filter(l => l.customer_id === customer.customer_id) : [];
  });

  const [selectedLoanId, setSelectedLoanId] = useState(loans.length > 0 ? loans[0].loan_id : '');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedLoan = loans.find(l => l.loan_id.toString() === selectedLoanId.toString());

  useEffect(() => {
    setAmount('');
    setIsSuccess(false);
  }, [selectedLoanId]);

  // --- HELPER: CURRENCY FORMATTER (VND) ---
  const formatCurrency = (val) => {
    if (val === undefined || val === null) return '0 VND';
    return new Intl.NumberFormat('vi-VN').format(val) + ' VND';
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedLoan) return;
    if (!amount || parseFloat(amount) <= 0) return alert("Please enter a valid amount");
    if (parseFloat(amount) > selectedLoan.principal_amount) return alert("Payment exceeds remaining balance!");

    setIsLoading(true);
    setTimeout(() => {
        const payAmount = parseFloat(amount);
        const newBalance = selectedLoan.principal_amount - payAmount;
        const newStatus = newBalance <= 0 ? 'CLOSED' : selectedLoan.status;

        setLoans(prev => prev.map(l => l.loan_id.toString() === selectedLoanId.toString() 
            ? { ...l, principal_amount: newBalance, status: newStatus } 
            : l
        ));
        setIsLoading(false);
        setIsSuccess(true);
    }, 1500);
  };

  // --- 2. STYLES (ENHANCED DEPTH & CONTRAST) ---
  const styles = {
    container: { 
        padding: '40px', 
        maxWidth: '1100px', 
        margin: '0 auto', 
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: '#1e293b' 
    },
    header: { marginBottom: '40px', textAlign: 'center' },
    title: { 
        fontSize: '36px', 
        fontWeight: '800', 
        color: '#0f172a',
        marginBottom: '10px'
    },
    subtitle: { color: '#64748b', fontSize: '16px' },

    // Layout Grid
    grid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '40px',
        alignItems: 'start'
    },

    // --- LEFT CARD: ELEVATED FORM ---
    formCard: { 
        backgroundColor: '#ffffff', // Pure white
        padding: '40px', 
        borderRadius: '24px', 
        // BÓNG ĐỔ ĐẬM HƠN (Deep Shadow) để tách khỏi nền
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0,0,0,0.05)', 
        // VIỀN RÕ RÀNG
        border: '1px solid #cbd5e1' 
    },
    
    // --- RIGHT CARD: RECEIPT STYLE ---
    receiptCard: { 
        backgroundColor: '#ffffff', // White paper look
        padding: '30px', 
        borderRadius: '20px', 
        // Viền nét đứt đậm hơn
        border: '2px dashed #94a3b8', 
        // Bóng nhẹ hơn form nhưng vẫn nổi
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
    },
    receiptHeader: {
        borderBottom: '2px dashed #e2e8f0',
        paddingBottom: '20px',
        marginBottom: '20px',
        textAlign: 'center'
    },

    // Inputs
    label: { 
        display: 'block', marginBottom: '8px', 
        fontWeight: '700', fontSize: '13px', 
        color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px'
    },
    select: { 
        width: '100%', padding: '16px', borderRadius: '12px', 
        border: '2px solid #e2e8f0', // Viền dày hơn
        fontSize: '16px', fontWeight: '600', color: '#1e293b',
        backgroundColor: '#fff', cursor: 'pointer',
        appearance: 'none'
    },
    inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    input: { 
        width: '100%', padding: '16px 16px 16px 50px', borderRadius: '12px', 
        border: '2px solid #e2e8f0', // Viền dày hơn
        fontSize: '22px', fontWeight: 'bold', 
        outline: 'none', color: '#2563eb',
        backgroundColor: '#f8fafc',
        transition: 'border-color 0.2s'
    },
    inputIcon: { position: 'absolute', left: '20px', color: '#64748b' },

    // Buttons
    submitBtn: {
        width: '100%', padding: '18px', borderRadius: '14px', border: 'none',
        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', 
        color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer',
        // Bóng màu cho nút
        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)', 
        transition: 'transform 0.2s', marginTop: '30px'
    },
    quickBtnGroup: { display: 'flex', gap: '10px', marginTop: '15px' },
    quickBtn: { 
        flex: 1, padding: '12px', borderRadius: '10px', 
        border: '1px solid #cbd5e1', 
        background: '#f1f5f9', 
        fontSize: '13px', fontWeight: '600', 
        cursor: 'pointer', color: '#475569',
        transition: 'all 0.2s'
    },

    // Summary Text
    row: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px' },
    rowLabel: { color: '#64748b', fontWeight: '500' },
    rowValue: { fontWeight: '700', color: '#1e293b' },
    
    totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed #cbd5e1' },
    totalLabel: { fontSize: '16px', fontWeight: '800', color: '#0f172a' },
    totalValue: { fontSize: '24px', fontWeight: '900', color: '#2563eb' }, 

    // Success State
    successBox: { textAlign: 'center', padding: '60px 20px' },
  };

  if (!loans || loans.length === 0) {
    return <div style={{padding: 60, textAlign: 'center', color: '#64748b', fontSize: '18px'}}>No active loans found.</div>;
  }

  // --- VIEW: SUCCESS ---
  if (isSuccess) {
    return (
        <div style={styles.container}>
            <div style={{...styles.formCard, ...styles.successBox, maxWidth: '600px', margin: '0 auto', borderTop: '6px solid #10b981'}}>
                <FiCheckCircle size={100} color="#10b981" style={{marginBottom: '20px'}} />
                <h2 style={{fontSize: '28px', color: '#065f46', marginBottom: '10px'}}>Payment Successful!</h2>
                <p style={{color: '#64748b', fontSize: '16px', marginBottom: '30px'}}>
                    Your payment has been successfully recorded.
                </p>
                
                <div style={{background: '#ecfdf5', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #a7f3d0'}}>
                    <div style={styles.row}>
                        <span>Paid Amount:</span>
                        <strong style={{color: '#059669', fontSize: '18px'}}>{formatCurrency(parseFloat(amount))}</strong>
                    </div>
                    <div style={styles.row}>
                        <span>Remaining Balance:</span>
                        <strong>{formatCurrency(selectedLoan.principal_amount)}</strong>
                    </div>
                </div>

                <button 
                    style={{...styles.submitBtn, background: '#10b981', boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.4)'}}
                    onClick={() => { setIsSuccess(false); setAmount(''); }}
                >
                    Make Another Payment
                </button>
            </div>
        </div>
    );
  }

  // --- VIEW: MAIN ---
  const principal = selectedLoan ? selectedLoan.principal_amount : 0;
  const payAmount = parseFloat(amount) || 0;
  const newBalance = principal - payAmount;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Loan Repayment</h1>
        <p style={styles.subtitle}>Secure & fast online payment portal</p>
      </div>

      <div style={styles.grid}>
        {/* LEFT: FORM */}
        <div style={styles.formCard}>
            <form onSubmit={handlePayment}>
                <div style={{marginBottom: '30px'}}>
                    <label style={styles.label}>1. Select Loan Contract</label>
                    <div style={{position: 'relative'}}>
                        <select style={styles.select} value={selectedLoanId} onChange={(e) => setSelectedLoanId(e.target.value)}>
                            {loans.map(loan => (
                                <option key={loan.loan_id} value={loan.loan_id} disabled={loan.status === 'CLOSED'}>
                                    {loan.loan_type} — {new Intl.NumberFormat('vi-VN').format(loan.principal_amount)} VND
                                </option>
                            ))}
                        </select>
                        <FiCreditCard style={{position: 'absolute', right: 20, top: 18, color: '#64748b'}} />
                    </div>
                </div>

                <div style={{marginBottom: '30px'}}>
                    <label style={styles.label}>2. Enter Payment Amount</label>
                    <div style={styles.inputWrapper}>
                        <FiDollarSign style={styles.inputIcon} size={24}/>
                        <input 
                            type="number" 
                            style={styles.input} 
                            placeholder="Enter amount..."
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            max={principal}
                            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>
                    {/* Quick Buttons */}
                    <div style={styles.quickBtnGroup}>
                        <button type="button" style={styles.quickBtn} onClick={() => setAmount(Math.round(principal * 0.1))}>10%</button>
                        <button type="button" style={styles.quickBtn} onClick={() => setAmount(Math.round(principal * 0.5))}>50%</button>
                        <button type="button" style={{...styles.quickBtn, background: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe'}} onClick={() => setAmount(principal)}>Full Amount</button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    style={{
                        ...styles.submitBtn, 
                        opacity: (isLoading || principal <= 0) ? 0.6 : 1, 
                        cursor: (isLoading || principal <= 0) ? 'not-allowed' : 'pointer',
                    }}
                    disabled={isLoading || principal <= 0}
                >
                    {isLoading ? 'Processing...' : `Confirm Payment`}
                </button>
            </form>
        </div>

        {/* RIGHT: SUMMARY (RECEIPT) */}
        <div style={styles.receiptCard}>
            <div style={styles.receiptHeader}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '5px'}}>
                    <FiRefreshCw className={isLoading ? "spin" : ""} color="#64748b" />
                    <h3 style={{margin: 0, fontSize: '18px', color: '#334155'}}>Transaction Summary</h3>
                </div>
                <span style={{fontSize: '13px', color: '#94a3b8'}}>Ref: #TXN-{Date.now().toString().slice(-6)}</span>
            </div>

            <div style={styles.row}>
                <span style={styles.rowLabel}>Current Balance</span>
                <span style={styles.rowValue}>{formatCurrency(principal)}</span>
            </div>

            <div style={styles.row}>
                <span style={styles.rowLabel}>Payment Amount</span>
                <span style={{...styles.rowValue, color: payAmount > 0 ? '#10b981' : '#cbd5e1'}}>
                    - {formatCurrency(payAmount)}
                </span>
            </div>

            {/* Estimated New Balance */}
            <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Est. New Balance</span>
            </div>
            <div style={{textAlign: 'right'}}>
                 <span style={styles.totalValue}>{formatCurrency(newBalance > 0 ? newBalance : 0)}</span>
            </div>

            {newBalance <= 0 && payAmount > 0 && (
                 <div style={{marginTop: '20px', padding: '12px', background: '#dcfce7', color: '#166534', borderRadius: '10px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                    <FiCheckCircle />
                    Great! You will be debt-free.
                 </div>
            )}
            
            {/* Decoration: Paper cut effect at bottom */}
            <div style={{position: 'absolute', bottom: -10, left: 0, width: '100%', height: '10px', background: 'radial-gradient(circle, transparent 60%, #ffffff 60%)', backgroundSize: '20px 20px', transform: 'rotate(180deg)'}}></div>
        </div>
      </div>
    </div>
  );
};

export default RecordLoanPayment;