import React, { useState, useMemo } from "react";
import { FiSearch, FiDollarSign, FiUser, FiCheckCircle } from "react-icons/fi";
import { mockData } from "../../mockdata";

const TellerLoanPayment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // State Form
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [amount, setAmount] = useState("");

  // --- LOGIC ---
  const customersList = useMemo(() => {
    return mockData.customers.map(c => ({
        ...c,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.full_name)}&background=random&color=fff`
    }));
  }, []);

  const filteredCustomers = customersList.filter(c => 
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id_card.includes(searchTerm)
  );

  // Lấy danh sách khoản nợ ACTIVE của khách đã chọn
  const activeLoans = useMemo(() => {
    if (!selectedCustomer) return [];
    return mockData.loans.filter(l => 
        l.customer_id === selectedCustomer.customer_id && 
        l.status === 'ACTIVE' // Chỉ hiện khoản nợ đang hoạt động
    );
  }, [selectedCustomer]);

  // Thông tin khoản nợ đang chọn để thanh toán
  const currentLoan = activeLoans.find(l => l.loan_id.toString() === selectedLoanId);

  // --- HANDLERS ---
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSelectedLoanId("");
    setAmount("");
  };

  const handleConfirm = () => {
    if (!currentLoan) return alert("Please select a loan contract!");
    const payAmount = Number(amount);
    
    if (payAmount <= 0) return alert("Invalid amount!");
    if (payAmount > currentLoan.principal_amount) return alert("Amount exceeds remaining balance!");

    alert(`PAYMENT SUCCESSFUL!
    -------------------
    Customer: ${selectedCustomer.full_name}
    Loan ID: #${currentLoan.loan_id} (${currentLoan.loan_type})
    Paid: ${payAmount.toLocaleString()} VND
    Remaining: ${(currentLoan.principal_amount - payAmount).toLocaleString()} VND`);

    setAmount("");
    setSelectedLoanId("");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiDollarSign /></div>
        <div>
          <div style={styles.headerTitle}>Loan Repayment (Collection)</div>
          <div style={styles.headerSub}>Process loan payments for customers</div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        {/* LEFT */}
        <div style={styles.leftPanel}>
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon}/>
            <input 
                style={styles.searchInput} 
                placeholder="Search Customer..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={styles.scrollList}>
            {filteredCustomers.map(cus => (
                <div 
                    key={cus.customer_id}
                    style={{
                        ...styles.userItem,
                        backgroundColor: selectedCustomer?.customer_id === cus.customer_id ? '#e0f2fe' : 'transparent',
                        borderLeft: selectedCustomer?.customer_id === cus.customer_id ? '4px solid #0ea5e9' : '4px solid transparent'
                    }}
                    onClick={() => handleSelectCustomer(cus)}
                >
                    <img src={cus.avatarUrl} alt="" style={styles.avatarSmall} />
                    <div>
                        <div style={styles.itemName}>{cus.full_name}</div>
                        <div style={styles.itemSub}>{cus.id_card}</div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.rightPanel}>
          {selectedCustomer ? (
            <>
              <h3 style={styles.panelTitle}>Payment Details</h3>
              
              {/* Customer Info */}
              <div style={styles.customerCard}>
                 <div style={{fontWeight: 700, fontSize: 18}}>{selectedCustomer.full_name}</div>
                 <div style={{fontSize: 14, color: '#64748b'}}>ID: {selectedCustomer.id_card} • Phone: {selectedCustomer.phone}</div>
              </div>

              {activeLoans.length > 0 ? (
                <>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Loan Contract</label>
                        <select 
                            style={styles.select} 
                            value={selectedLoanId}
                            onChange={(e) => setSelectedLoanId(e.target.value)}
                        >
                            <option value="">-- Choose a loan --</option>
                            {activeLoans.map(loan => (
                                <option key={loan.loan_id} value={loan.loan_id}>
                                    #{loan.loan_id} - {loan.loan_type} (Debt: {loan.principal_amount.toLocaleString()} VND)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Payment Amount (VND)</label>
                        <input 
                            style={styles.moneyInput} 
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={!selectedLoanId}
                        />
                    </div>

                    {currentLoan && (
                        <div style={styles.summaryBox}>
                            <div style={styles.summaryRow}>
                                <span>Remaining Debt</span>
                                <span>{currentLoan.principal_amount.toLocaleString()} VND</span>
                            </div>
                            <div style={styles.summaryRow}>
                                <span>To Pay</span>
                                <span style={{color: '#0284c7'}}>- {Number(amount||0).toLocaleString()} VND</span>
                            </div>
                            <div style={{...styles.summaryRow, borderTop: '1px solid #cbd5e1', paddingTop: 10, marginTop: 10}}>
                                <strong>New Balance</strong>
                                <strong style={{fontSize: 18, color: '#0369a1'}}>
                                    {(currentLoan.principal_amount - Number(amount||0)).toLocaleString()} VND
                                </strong>
                            </div>
                        </div>
                    )}

                    <button style={styles.btnConfirm} onClick={handleConfirm} disabled={!selectedLoanId}>
                        <FiCheckCircle style={{marginRight: 8}}/> Confirm Payment
                    </button>
                </>
              ) : (
                  <div style={styles.emptyState}>This customer has no active loans.</div>
              )}
            </>
          ) : (
            <div style={styles.placeholderRight}>
                <FiUser size={40} color="#cbd5e1"/>
                <p>Select a customer to process payment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { height: "100%", padding: "30px", background: "#f0f9ff", fontFamily: "'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column' },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  headerIcon: { width: 48, height: 48, borderRadius: 12, background: "#0284c7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#0c4a6e" },
  headerSub: { fontSize: 14, color: "#0369a1" },
  gridContainer: { display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' },
  
  // Left
  leftPanel: { flex: '0 0 320px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  searchBox: { padding: 20, position: 'relative' },
  searchIcon: { position: 'absolute', left: 32, top: 32, color: '#9ca3af' },
  searchInput: { width: '100%', padding: '12px 12px 12px 40px', borderRadius: 10, border: '1px solid #e2e8f0', outline: 'none' },
  scrollList: { flex: 1, overflowY: 'auto', padding: '0 10px 10px' },
  userItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 8, cursor: 'pointer', marginBottom: 4 },
  avatarSmall: { width: 40, height: 40, borderRadius: '50%' },
  itemName: { fontSize: 15, fontWeight: 600, color: '#334155' },
  itemSub: { fontSize: 13, color: '#64748b' },

  // Right
  rightPanel: { flex: 1, background: '#fff', borderRadius: 16, padding: 30, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflowY: 'auto' },
  panelTitle: { fontSize: 18, fontWeight: 700, color: '#334155', marginBottom: 20 },
  customerCard: { background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: 15, marginBottom: 20 },
  formGroup: { marginBottom: 20 },
  label: { display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#334155' },
  select: { width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #cbd5e1', outline: 'none' },
  moneyInput: { width: '100%', padding: '14px', fontSize: 24, fontWeight: 700, color: '#0284c7', border: '2px solid #bae6fd', borderRadius: 10, outline: 'none' },
  summaryBox: { background: '#f8fafc', padding: 20, borderRadius: 12, marginBottom: 24 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 },
  btnConfirm: { width: '100%', padding: '16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  placeholderRight: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', height: '100%' },
  emptyState: { textAlign: 'center', padding: 30, color: '#64748b', fontStyle: 'italic' }
};

export default TellerLoanPayment;