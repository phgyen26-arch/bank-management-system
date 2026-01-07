import React, { useState, useMemo } from "react";
import { FiSearch, FiMinusCircle, FiUser, FiCheckCircle } from "react-icons/fi";
import { mockData } from "../../mockdata";

const CashWithdraw = () => {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");

  // --- LOGIC GHÉP DATA (Customer + Account) ---
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

  // Lọc danh sách hiển thị
  const filteredList = fullList.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id_card.includes(searchTerm) ||
    item.phone.includes(searchTerm) ||
    item.accountNumber.includes(searchTerm)
  );

  // --- HANDLERS ---
  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    setAmount(""); // Reset số tiền
  };

  const handleConfirm = () => {
    if (!selectedCustomer) return;
    const withdrawAmount = Number(amount);

    if (withdrawAmount <= 0) return alert("Vui lòng nhập số tiền hợp lệ!");
    if (withdrawAmount > selectedCustomer.balance) return alert("Số dư tài khoản không đủ!");

    // Giả lập giao dịch thành công
    alert(`RÚT TIỀN THÀNH CÔNG!
    ---------------------------
    Khách hàng: ${selectedCustomer.full_name}
    Số tiền rút: ${withdrawAmount.toLocaleString()} VND
    Số dư còn lại: ${(selectedCustomer.balance - withdrawAmount).toLocaleString()} VND`);
    
    // Reset form
    setAmount("");
    setSelectedCustomer(null);
  };

  // Tính toán số dư
  const currentBalance = selectedCustomer ? selectedCustomer.balance : 0;
  const newBalance = currentBalance - Number(amount || 0);

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiMinusCircle /></div>
        <div>
          <div style={styles.headerTitle}>Rút Tiền Mặt (Cash Withdrawal)</div>
          <div style={styles.headerSub}>Giao dịch rút tiền từ tài khoản (Core Banking)</div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        
        {/* --- CỘT TRÁI: DANH SÁCH KHÁCH --- */}
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
                  // Style active màu đỏ nhạt
                  backgroundColor: selectedCustomer?.customer_id === item.customer_id ? '#fee2e2' : 'transparent',
                  borderLeft: selectedCustomer?.customer_id === item.customer_id ? '4px solid #dc2626' : '4px solid transparent'
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

        {/* --- CỘT PHẢI: FORM RÚT TIỀN --- */}
        <div style={styles.rightPanel}>
          {selectedCustomer ? (
            <>
              <h3 style={styles.panelTitle}>Thông tin giao dịch</h3>
              
              {/* Card khách hàng (Red Theme) */}
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

              {/* Input tiền */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Số tiền rút (VND)</label>
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
                  <span>Số tiền rút</span>
                  <span style={{color: '#dc2626'}}>- {Number(amount || 0).toLocaleString()} VND</span>
                </div>
                <div style={styles.divider}></div>
                <div style={styles.summaryRow}>
                  <strong>Số dư còn lại</strong>
                  <strong style={{fontSize: 18, color: '#b91c1c'}}>{newBalance.toLocaleString()} VND</strong>
                </div>
              </div>

              {/* Cảnh báo nếu rút quá số dư */}
              {newBalance < 0 && (
                 <div style={styles.errorAlert}>⚠️ Số dư không đủ để thực hiện giao dịch này!</div>
              )}

              <button 
                style={{...styles.btnConfirm, opacity: newBalance < 0 ? 0.5 : 1, cursor: newBalance < 0 ? 'not-allowed' : 'pointer'}} 
                onClick={handleConfirm}
                disabled={newBalance < 0}
              >
                <FiCheckCircle style={{marginRight: 8}}/> Xác nhận rút tiền
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

// --- STYLES (Red Theme) ---
const styles = {
  wrapper: {
    height: "100%", padding: "30px", background: "#fef2f2", // Nền đỏ rất nhạt
    fontFamily: "'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column',
  },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  headerIcon: {
    width: 48, height: 48, borderRadius: 12,
    background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#7f1d1d" },
  headerSub: { fontSize: 14, color: "#991b1b" },

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
    background: 'linear-gradient(to right, #fef2f2, #fff)',
    border: '1px solid #fecaca', borderRadius: 12, padding: 20, marginBottom: 24
  },
  cardRow: { display: 'flex', alignItems: 'center', gap: 16 },
  avatarLarge: { width: 64, height: 64, borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  selectedName: { fontSize: 20, fontWeight: 700, color: '#991b1b' },
  selectedSub: { fontSize: 14, color: '#b91c1c' },

  formGroup: { marginBottom: 20 },
  label: { display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#374151' },
  moneyInput: {
    width: '100%', padding: '14px', fontSize: 28, fontWeight: 700, 
    color: '#dc2626', border: '2px solid #fecaca', borderRadius: 10, outline: 'none'
  },
  summaryBox: { background: '#fff5f5', padding: 20, borderRadius: 12, marginBottom: 24 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 },
  divider: { borderTop: '1px solid #fecaca', margin: '10px 0' },
  errorAlert: {
    marginBottom: 20, padding: '10px', background: '#fef2f2', color: '#dc2626', 
    border: '1px solid #fecaca', borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'center'
  },

  btnConfirm: {
    width: '100%', padding: '16px', background: '#dc2626', color: '#fff',
    border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, 
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)', transition: '0.3s'
  },
  placeholderRight: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'
  },
  placeholderIcon: { fontSize: 60, marginBottom: 16, color: '#e5e7eb' }
};

export default CashWithdraw;