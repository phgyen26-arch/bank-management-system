import React, { useState, useMemo } from "react";
import { FiSearch, FiUser, FiPlusCircle, FiSave, FiCheckCircle } from "react-icons/fi";
import { mockData } from "../../mockdata"; // Đảm bảo đường dẫn đúng

const TellerCreateLoan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    loanType: "Consumer Loan",
    amount: "",
    duration: "12",
    interestRate: "10.5",
  });

  // --- LOGIC TÌM KIẾM KHÁCH HÀNG TỪ MOCKDATA ---
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

  // --- HANDLERS ---
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    // Reset form khi chọn khách mới (nếu muốn)
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer) return alert("Please select a customer first!");
    if (!formData.amount || Number(formData.amount) <= 0) return alert("Invalid amount!");

    // Giả lập lưu dữ liệu
    const newLoan = {
      loan_id: Math.floor(Math.random() * 10000) + 100, // Random ID
      customer_id: selectedCustomer.customer_id,
      loan_type: formData.loanType,
      principal_amount: Number(formData.amount),
      duration_months: Number(formData.duration),
      interest_rate: Number(formData.interestRate),
      status: "ACTIVE" // Teller tạo tại quầy thì thường Active luôn
    };

    console.log("Creating New Loan:", newLoan);

    alert(`LOAN CREATED SUCCESSFULLY!
    ---------------------------
    Customer: ${selectedCustomer.full_name}
    Type: ${newLoan.loan_type}
    Amount: ${newLoan.principal_amount.toLocaleString()} VND
    Status: ACTIVE`);

    // Reset
    setSelectedCustomer(null);
    setFormData({ loanType: "Consumer Loan", amount: "", duration: "12", interestRate: "10.5" });
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiPlusCircle /></div>
        <div>
          <div style={styles.headerTitle}>Create New Loan</div>
          <div style={styles.headerSub}>Register a new loan contract for customer</div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        {/* LEFT PANEL: SEARCH CUSTOMER */}
        <div style={styles.leftPanel}>
          <div style={styles.panelHeader}>1. Find Customer</div>
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon}/>
            <input 
              style={styles.searchInput} 
              placeholder="Search Name or ID Card..." 
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

        {/* RIGHT PANEL: LOAN FORM */}
        <div style={styles.rightPanel}>
          <div style={styles.panelHeader}>2. Loan Details</div>
          
          {selectedCustomer ? (
            <form onSubmit={handleSubmit}>
              {/* Customer Info Card */}
              <div style={styles.customerCard}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                   <div style={styles.avatarBig}><FiUser /></div>
                   <div>
                      <div style={{fontWeight: 700, fontSize: 16}}>{selectedCustomer.full_name}</div>
                      <div style={{fontSize: 13, color: '#64748b'}}>{selectedCustomer.address}</div>
                   </div>
                </div>
              </div>

              <div style={styles.formGrid}>
                {/* Loan Type */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Loan Type</label>
                  <select name="loanType" value={formData.loanType} onChange={handleInputChange} style={styles.input}>
                    <option value="Consumer Loan">Consumer Loan (Tiêu dùng)</option>
                    <option value="Home Loan">Home Loan (Mua nhà)</option>
                    <option value="Car Loan">Car Loan (Mua xe)</option>
                    <option value="Business Loan">Business Loan (Kinh doanh)</option>
                  </select>
                </div>

                {/* Duration */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Duration (Months)</label>
                  <select name="duration" value={formData.duration} onChange={handleInputChange} style={styles.input}>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                    <option value="48">48 Months</option>
                    <option value="60">60 Months</option>
                    <option value="120">120 Months</option>
                  </select>
                </div>

                {/* Interest Rate */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Interest Rate (%/year)</label>
                  <input 
                    type="number" step="0.1"
                    name="interestRate" 
                    value={formData.interestRate} 
                    onChange={handleInputChange} 
                    style={styles.input} 
                  />
                </div>

                {/* Amount */}
                <div style={styles.formGroupFull}>
                  <label style={styles.label}>Principal Amount (VND)</label>
                  <input 
                    type="number" 
                    name="amount" 
                    placeholder="e.g. 100,000,000" 
                    value={formData.amount} 
                    onChange={handleInputChange} 
                    style={styles.amountInput} 
                  />
                </div>
              </div>

              <div style={styles.footerAction}>
                 <button type="submit" style={styles.btnSubmit}>
                    <FiSave style={{marginRight: 8}}/> Create Contract
                 </button>
              </div>

            </form>
          ) : (
            <div style={styles.emptyState}>
              <FiUser size={48} color="#cbd5e1"/>
              <p>Please select a customer from the left list to create a loan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { height: "100%", padding: "30px", background: "#f1f5f9", display: 'flex', flexDirection: 'column' },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  headerIcon: { width: 48, height: 48, borderRadius: 12, background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#1e293b" },
  headerSub: { fontSize: 14, color: "#64748b" },
  
  gridContainer: { display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' },

  // LEFT
  leftPanel: { flex: '0 0 350px', background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  panelHeader: { padding: '16px 20px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#334155', background: '#f8fafc', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  searchBox: { padding: 16, position: 'relative' },
  searchIcon: { position: 'absolute', left: 28, top: 28, color: '#94a3b8' },
  searchInput: { width: '100%', padding: '10px 10px 10px 36px', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none' },
  scrollList: { flex: 1, overflowY: 'auto', padding: '0 10px 10px' },
  userItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 8, cursor: 'pointer', marginBottom: 4, transition: 'background 0.2s' },
  avatarSmall: { width: 40, height: 40, borderRadius: '50%' },
  itemName: { fontSize: 14, fontWeight: 600, color: '#334155' },
  itemSub: { fontSize: 12, color: '#64748b' },

  // RIGHT
  rightPanel: { flex: 1, background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  customerCard: { padding: 20, background: '#f0f9ff', borderBottom: '1px solid #e0f2fe' },
  avatarBig: { width: 48, height: 48, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', fontSize: 24 },
  
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: 30 },
  formGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  formGroupFull: { gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#64748b' },
  input: { padding: '10px', borderRadius: 6, border: '1px solid #cbd5e1', outline: 'none' },
  amountInput: { padding: '12px', borderRadius: 8, border: '2px solid #bae6fd', outline: 'none', fontSize: 20, fontWeight: 700, color: '#0284c7' },
  
  footerAction: { padding: '20px 30px', borderTop: '1px solid #f1f5f9', marginTop: 'auto', textAlign: 'right' },
  btnSubmit: { padding: '12px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' },
  
  emptyState: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }
};

export default TellerCreateLoan;