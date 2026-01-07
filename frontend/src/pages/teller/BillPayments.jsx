import React, { useState, useMemo } from "react";
import { FiSearch, FiFileText, FiUser, FiCheckCircle } from "react-icons/fi";
import { mockData } from "../../mockdata";

const BillPayments = () => {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // State form
  const [billType, setBillType] = useState("Electricity");
  const [billCode, setBillCode] = useState("");
  const [amount, setAmount] = useState("");

  // --- LOGIC GHÉP DATA ---
  const fullList = useMemo(() => {
    return mockData.customers.map(cus => {
      const acc = mockData.accounts.find(a => a.customer_id === cus.customer_id);
      return {
        ...cus,
        accountNumber: acc ? acc.account_number : "Chưa có TK",
        balance: acc ? acc.balance : 0,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cus.full_name)}&background=random&color=fff`
      };
    });
  }, []);

  // Lọc danh sách
  const filteredList = fullList.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id_card.includes(searchTerm) ||
    item.phone.includes(searchTerm) ||
    item.accountNumber.includes(searchTerm)
  );

  // --- HANDLERS ---
  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    // Reset form
    setAmount("");
    setBillCode("");
    setBillType("Electricity");
  };

  const handleConfirm = () => {
    if (!selectedCustomer) return;
    
    const paymentAmount = Number(amount);

    if (!billCode.trim()) return alert("Vui lòng nhập mã hóa đơn!");
    if (paymentAmount <= 0) return alert("Số tiền không hợp lệ!");
    if (paymentAmount > selectedCustomer.balance) return alert("Số dư không đủ thanh toán!");

    alert(`THANH TOÁN THÀNH CÔNG!
    ---------------------------
    Khách hàng: ${selectedCustomer.full_name}
    Dịch vụ: ${billType}
    Mã hóa đơn: ${billCode}
    Số tiền: ${paymentAmount.toLocaleString()} VND
    Số dư còn lại: ${(selectedCustomer.balance - paymentAmount).toLocaleString()} VND`);
    
    // Reset form
    setAmount("");
    setBillCode("");
    setSelectedCustomer(null);
  };

  // Tính toán
  const currentBalance = selectedCustomer ? selectedCustomer.balance : 0;
  const remainingBalance = currentBalance - Number(amount || 0);

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiFileText /></div>
        <div>
          <div style={styles.headerTitle}>Thanh Toán Hóa Đơn (Bill Payment)</div>
          <div style={styles.headerSub}>Điện, Nước, Internet, Truyền hình...</div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        
        {/* --- CỘT TRÁI: DANH SÁCH --- */}
        <div style={styles.leftPanel}>
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Tìm theo tên, STK, CMND..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.listHeader}>Kết quả tìm kiếm ({filteredList.length})</div>

          <div style={styles.scrollList}>
            {filteredList.map((item) => (
              <div 
                key={item.customer_id} 
                style={{
                  ...styles.userItem,
                  // Style active màu xanh dương nhạt
                  backgroundColor: selectedCustomer?.customer_id === item.customer_id ? '#dbeafe' : 'transparent',
                  borderLeft: selectedCustomer?.customer_id === item.customer_id ? '4px solid #2563eb' : '4px solid transparent'
                }}
                onClick={() => handleSelect(item)}
              >
                <img src={item.avatarUrl} alt="" style={styles.avatarSmall} />
                <div>
                  <div style={styles.itemName}>{item.full_name}</div>
                  <div style={styles.itemSub}>{item.accountNumber} • SD: {item.balance.toLocaleString()}</div>
                </div>
              </div>
            ))}
            
            {filteredList.length === 0 && (
              <div style={styles.emptySearch}>Không tìm thấy dữ liệu</div>
            )}
          </div>
        </div>

        {/* --- CỘT PHẢI: FORM THANH TOÁN --- */}
        <div style={styles.rightPanel}>
          {selectedCustomer ? (
            <>
              <h3 style={styles.panelTitle}>Thông tin hóa đơn</h3>
              
              {/* Card khách hàng (Blue Theme) */}
              <div style={styles.selectedCard}>
                <div style={styles.cardRow}>
                  <img src={selectedCustomer.avatarUrl} alt="" style={styles.avatarLarge} />
                  <div>
                    <div style={styles.selectedName}>{selectedCustomer.full_name}</div>
                    <div style={styles.selectedSub}>STK: <b>{selectedCustomer.accountNumber}</b></div>
                    <div style={styles.selectedSub}>CMND: {selectedCustomer.id_card}</div>
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Loại dịch vụ</label>
                <select 
                  style={styles.select} 
                  value={billType} 
                  onChange={(e) => setBillType(e.target.value)}
                >
                  <option value="Electricity">Điện (Electricity)</option>
                  <option value="Water">Nước (Water)</option>
                  <option value="Internet">Internet</option>
                  <option value="Television">Truyền hình (TV)</option>
                  <option value="Tuition">Học phí (Tuition)</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mã khách hàng / Mã hóa đơn</label>
                <input
                  style={styles.input}
                  placeholder="Nhập mã hóa đơn..."
                  value={billCode}
                  onChange={(e) => setBillCode(e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Số tiền thanh toán (VND)</label>
                <input
                  style={styles.moneyInput}
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Summary */}
              <div style={styles.summaryBox}>
                <div style={styles.summaryRow}>
                  <span>Số dư hiện tại</span>
                  <span>{currentBalance.toLocaleString()} VND</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Thanh toán</span>
                  <span style={{color: '#2563eb'}}>- {Number(amount || 0).toLocaleString()} VND</span>
                </div>
                <div style={styles.divider}></div>
                <div style={styles.summaryRow}>
                  <strong>Số dư còn lại</strong>
                  <strong style={{fontSize: 18, color: remainingBalance < 0 ? 'red' : '#1d4ed8'}}>
                    {remainingBalance.toLocaleString()} VND
                  </strong>
                </div>
              </div>
              
              {remainingBalance < 0 && (
                 <div style={styles.errorAlert}>⚠️ Số dư không đủ để thanh toán!</div>
              )}

              <button 
                style={{...styles.btnConfirm, opacity: remainingBalance < 0 ? 0.5 : 1, cursor: remainingBalance < 0 ? 'not-allowed' : 'pointer'}} 
                onClick={handleConfirm}
                disabled={remainingBalance < 0}
              >
                <FiCheckCircle style={{marginRight: 8}}/> Xác nhận thanh toán
              </button>
            </>
          ) : (
            <div style={styles.placeholderRight}>
              <div style={styles.placeholderIcon}><FiUser /></div>
              <p>Vui lòng chọn khách hàng từ danh sách bên trái</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// --- STYLES (Blue Theme) ---
const styles = {
  wrapper: {
    height: "100%", padding: "30px", background: "#eff6ff", // Nền xanh dương nhạt
    fontFamily: "'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column',
  },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  headerIcon: {
    width: 48, height: 48, borderRadius: 12,
    background: "linear-gradient(135deg, #2563eb, #1e40af)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#1e3a8a" },
  headerSub: { fontSize: 14, color: "#1e40af" },

  gridContainer: { display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' },

  // CỘT TRÁI
  leftPanel: {
    flex: '0 0 350px', background: '#fff', borderRadius: 16, 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
  },
  searchBox: { padding: '20px 20px 10px 20px', display: 'flex', alignItems: 'center', position: 'relative' },
  searchIcon: { position: 'absolute', left: 35, color: '#9ca3af' },
  searchInput: {
    width: '100%', padding: '12px 12px 12px 40px', borderRadius: 10,
    border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontSize: 14
  },
  listHeader: { padding: '0 20px 10px 20px', fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' },
  scrollList: { flex: 1, overflowY: 'auto', padding: '0 10px 10px 10px' },
  userItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px',
    borderRadius: 8, cursor: 'pointer', transition: '0.2s', marginBottom: 4
  },
  avatarSmall: { width: 40, height: 40, borderRadius: '50%' },
  itemName: { fontSize: 15, fontWeight: 600, color: '#374151' },
  itemSub: { fontSize: 13, color: '#6b7280' },
  emptySearch: { textAlign: 'center', marginTop: 20, color: '#9ca3af', fontSize: 14 },

  // CỘT PHẢI
  rightPanel: {
    flex: 1, background: '#fff', borderRadius: 16, padding: 30,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', overflowY: 'auto'
  },
  panelTitle: { fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 20 },
  selectedCard: {
    background: 'linear-gradient(to right, #eff6ff, #fff)',
    border: '1px solid #bfdbfe', borderRadius: 12, padding: 20, marginBottom: 24
  },
  cardRow: { display: 'flex', alignItems: 'center', gap: 16 },
  avatarLarge: { width: 64, height: 64, borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  selectedName: { fontSize: 20, fontWeight: 700, color: '#1e3a8a' },
  selectedSub: { fontSize: 14, color: '#1e40af' },

  formGroup: { marginBottom: 20 },
  label: { display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#374151' },
  select: { width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #d1d5db', outline: 'none', background: '#fff' },
  input: { width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #d1d5db', outline: 'none' },
  moneyInput: {
    width: '100%', padding: '14px', fontSize: 28, fontWeight: 700, 
    color: '#2563eb', border: '2px solid #bfdbfe', borderRadius: 10, outline: 'none'
  },
  summaryBox: { background: '#f8fafc', padding: 20, borderRadius: 12, marginBottom: 24 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 },
  divider: { borderTop: '1px solid #bfdbfe', margin: '10px 0' },
  errorAlert: {
    marginBottom: 20, padding: '10px', background: '#fef2f2', color: '#dc2626', 
    border: '1px solid #fecaca', borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'center'
  },

  btnConfirm: {
    width: '100%', padding: '16px', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, 
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)', transition: '0.3s'
  },
  placeholderRight: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'
  },
  placeholderIcon: { fontSize: 60, marginBottom: 16, color: '#e5e7eb' }
};

export default BillPayments;