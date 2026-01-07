import React, { useState, useMemo } from "react";
import { FiSearch, FiDollarSign, FiUser, FiCheckCircle } from "react-icons/fi";
import { mockData } from "../../mockdata"; // Đảm bảo đường dẫn import đúng

const CashDeposit = () => {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");

  // --- LOGIC QUAN TRỌNG: GHÉP DATA CUSTOMER VÀ ACCOUNT ---
  const fullList = useMemo(() => {
    // Duyệt qua danh sách Customers
    return mockData.customers.map(cus => {
      // Tìm Account tương ứng dựa vào customer_id
      const acc = mockData.accounts.find(a => a.customer_id === cus.customer_id);
      
      return {
        ...cus,
        // Nếu có tài khoản thì lấy số dư và số TK, nếu không thì để mặc định
        accountNumber: acc ? acc.account_number : "Chưa có TK",
        balance: acc ? acc.balance : 0, 
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cus.full_name)}&background=random&color=fff`
      };
    });
  }, []);

  // Lọc danh sách hiển thị theo từ khóa
  const filteredList = fullList.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id_card.includes(searchTerm) ||
    item.phone.includes(searchTerm) ||
    item.accountNumber.includes(searchTerm)
  );

  // --- HANDLERS ---
  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    setAmount(""); // Reset số tiền nhập khi chọn người mới
  };

  const handleConfirm = () => {
    if (!selectedCustomer) return;
    const depositAmount = Number(amount);
    
    if (depositAmount <= 0) {
        alert("Vui lòng nhập số tiền hợp lệ!");
        return;
    }

    // Ở đây chỉ giả lập thông báo, thực tế sẽ gọi API cập nhật lại Database
    alert(`GIAO DỊCH THÀNH CÔNG!
    ---------------------------
    Khách hàng: ${selectedCustomer.full_name}
    Số tiền nạp: ${depositAmount.toLocaleString()} VND
    Số dư mới (dự kiến): ${(selectedCustomer.balance + depositAmount).toLocaleString()} VND`);
    
    // Reset form
    setAmount("");
    setSelectedCustomer(null);
  };

  // Tính toán hiển thị tức thời
  const currentBalance = selectedCustomer ? selectedCustomer.balance : 0;
  const newBalance = currentBalance + Number(amount || 0);

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiDollarSign /></div>
        <div>
          <div style={styles.headerTitle}>Nạp Tiền Mặt (Cash Deposit)</div>
          <div style={styles.headerSub}>Giao dịch nạp tiền vào tài khoản (Core Banking)</div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        
        {/* --- CỘT TRÁI: DANH SÁCH KHÁCH HÀNG --- */}
        <div style={styles.leftPanel}>
          {/* Ô tìm kiếm */}
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

          {/* Danh sách cuộn */}
          <div style={styles.scrollList}>
            {filteredList.map((item) => (
              <div 
                key={item.customer_id} 
                style={{
                  ...styles.userItem,
                  backgroundColor: selectedCustomer?.customer_id === item.customer_id ? '#dcfce7' : 'transparent',
                  borderLeft: selectedCustomer?.customer_id === item.customer_id ? '4px solid #16a34a' : '4px solid transparent'
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

        {/* --- CỘT PHẢI: FORM NẠP TIỀN --- */}
        <div style={styles.rightPanel}>
          {selectedCustomer ? (
            <>
              <h3 style={styles.panelTitle}>Thông tin giao dịch</h3>
              
              {/* Card thông tin khách được chọn */}
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

              {/* Form nhập tiền */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Số tiền nạp (VND)</label>
                <input
                  style={styles.moneyInput}
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Tính toán số dư */}
              <div style={styles.summaryBox}>
                <div style={styles.summaryRow}>
                  <span>Số dư hiện tại</span>
                  <span>{currentBalance.toLocaleString()} VND</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Số tiền nạp</span>
                  <span style={{color: '#16a34a'}}>+ {Number(amount || 0).toLocaleString()} VND</span>
                </div>
                <div style={styles.divider}></div>
                <div style={styles.summaryRow}>
                  <strong>Số dư mới</strong>
                  <strong style={{fontSize: 18, color: '#16a34a'}}>{newBalance.toLocaleString()} VND</strong>
                </div>
              </div>

              <button style={styles.btnConfirm} onClick={handleConfirm}>
                <FiCheckCircle style={{marginRight: 8}}/> Xác nhận nạp tiền
              </button>
            </>
          ) : (
            // Màn hình chờ khi chưa chọn khách
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

// --- STYLES (Giữ nguyên style 2 cột của bạn) ---
const styles = {
  wrapper: {
    height: "100%", 
    padding: "30px", 
    background: "#f0fdf4", // Nền xanh lá nhạt
    fontFamily: "'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  headerIcon: {
    width: 48, height: 48, borderRadius: 12,
    background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#14532d" },
  headerSub: { fontSize: 14, color: "#166534" },

  gridContainer: { display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' },

  // CỘT TRÁI
  leftPanel: {
    flex: '0 0 350px', 
    background: '#fff', 
    borderRadius: 16, 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
    display: 'flex', 
    flexDirection: 'column',
    overflow: 'hidden' 
  },
  searchBox: {
    padding: '20px 20px 10px 20px',
    display: 'flex', alignItems: 'center', position: 'relative'
  },
  searchIcon: { position: 'absolute', left: 35, color: '#9ca3af' },
  searchInput: {
    width: '100%', padding: '12px 12px 12px 40px', borderRadius: 10,
    border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb', fontSize: 14
  },
  listHeader: {
    padding: '0 20px 10px 20px', fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase'
  },
  scrollList: {
    flex: 1, overflowY: 'auto', padding: '0 10px 10px 10px'
  },
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
    flex: 1, 
    background: '#fff', 
    borderRadius: 16, 
    padding: 30,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
    display: 'flex', 
    flexDirection: 'column',
    overflowY: 'auto'
  },
  panelTitle: { fontSize: 18, fontWeight: 700, color: '#374151', marginBottom: 20 },
  selectedCard: {
    background: 'linear-gradient(to right, #f0fdf4, #fff)',
    border: '1px solid #bbf7d0', borderRadius: 12, padding: 20, marginBottom: 24
  },
  cardRow: { display: 'flex', alignItems: 'center', gap: 16 },
  avatarLarge: { width: 64, height: 64, borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  selectedName: { fontSize: 20, fontWeight: 700, color: '#166534' },
  selectedSub: { fontSize: 14, color: '#15803d' },

  formGroup: { marginBottom: 20 },
  label: { display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#374151' },
  moneyInput: {
    width: '100%', padding: '14px', fontSize: 28, fontWeight: 700, 
    color: '#16a34a', border: '2px solid #bbf7d0', borderRadius: 10, outline: 'none'
  },
  summaryBox: { background: '#f9fafb', padding: 20, borderRadius: 12, marginBottom: 24 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 },
  divider: { borderTop: '1px solid #e5e7eb', margin: '10px 0' },
  
  btnConfirm: {
    width: '100%', padding: '16px', background: '#16a34a', color: '#fff',
    border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, 
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
  },
  placeholderRight: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'
  },
  placeholderIcon: { fontSize: 60, marginBottom: 16, color: '#e5e7eb' }
};

export default CashDeposit;