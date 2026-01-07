import React, { useState, useEffect } from 'react';
import {
  FiZap, FiDroplet, FiWifi, FiTv, FiSmartphone,
  FiCheckCircle, FiArrowLeft, FiUser, FiCalendar, FiMapPin, FiCreditCard
} from "react-icons/fi";

// CHÚ Ý: Đảm bảo đường dẫn đúng với file của bạn (chữ thường mockdata)
import { mockData, generateBills } from '../../mockdata';

const PayBill = () => {
  // --- 1. GIẢ LẬP NGƯỜI DÙNG ĐANG ĐĂNG NHẬP (Ví dụ: Nguyễn Văn An - ID 1) ---
  const LOGGED_IN_CUSTOMER_ID = 1; 

  // --- STATE ---
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State dữ liệu
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [billsList, setBillsList] = useState([]);
  const [foundBill, setFoundBill] = useState(null);

  // --- KHỞI TẠO DỮ LIỆU KHI VÀO TRANG ---
  useEffect(() => {
    // 1. Lấy thông tin người dùng đang đăng nhập từ MockData
    const user = mockData.customers.find(c => c.customer_id === LOGGED_IN_CUSTOMER_ID);
    const account = mockData.accounts.find(a => a.customer_id === LOGGED_IN_CUSTOMER_ID);
    
    // 2. Tạo danh sách hóa đơn ảo
    const bills = generateBills(mockData.customers);

    setCurrentUser(user);
    setCurrentAccount(account);
    setBillsList(bills);
  }, []);

  const services = [
    { id: 'elec', name: 'Electricity', icon: <FiZap />, color: '#f59f00', bg: '#fff9db' },
    { id: 'water', name: 'Water Utility', icon: <FiDroplet />, color: '#1864ab', bg: '#e7f5ff' },
    { id: 'internet', name: 'Internet', icon: <FiWifi />, color: '#5f3dc4', bg: '#f3f0ff' },
    { id: 'tv', name: 'Cable TV', icon: <FiTv />, color: '#c2255c', bg: '#fff0f6' },
    { id: 'mobile', name: 'Postpaid Mobile', icon: <FiSmartphone />, color: '#087f5b', bg: '#e6fffa' },
  ];

  /* ================= XỬ LÝ LOGIC TỰ ĐỘNG ================= */

  // Khi bấm vào một dịch vụ -> Tự check hóa đơn của người đang đăng nhập
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsLoading(true);

    // Giả lập thời gian chờ API (0.5s)
    setTimeout(() => {
      // Tìm hóa đơn của "Tôi" (currentUser) trong danh sách bills
      const bill = billsList.find(b => 
        b.customer_id === currentUser.customer_id && 
        b.type === service.id
      );

      setIsLoading(false);

      if (bill && bill.amount > 0) {
        // CÓ NỢ -> Sang bước xác nhận thanh toán (Step 2)
        setFoundBill(bill);
        setStep(2);
      } else {
        // KHÔNG NỢ -> Thông báo ngay tại chỗ
        alert(`Xin chào ${currentUser.full_name}, bạn không có hóa đơn ${service.name} nào cần thanh toán!`);
        setSelectedService(null); // Reset lại
      }
    }, 500);
  };

  // Xác nhận thanh toán
  const handleConfirmPayment = () => {
    if (!currentAccount || !foundBill) return;

    if (currentAccount.balance < foundBill.amount) {
      alert("Số dư tài khoản không đủ để thanh toán!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Trừ tiền ảo (Cập nhật state cục bộ để hiển thị)
      const newBalance = currentAccount.balance - foundBill.amount;
      setCurrentAccount({ ...currentAccount, balance: newBalance });
      
      setIsLoading(false);
      setStep(3); // Sang màn hình thành công
    }, 1500);
  };

  // Reset về màn hình chính
  const resetForm = () => {
    setStep(1); 
    setSelectedService(null); 
    setFoundBill(null);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  /* ================= STYLES ================= */
  const styles = {
    container: {
      padding: '40px 20px', maxWidth: '900px', margin: '0 auto',
      fontFamily: "'Inter', sans-serif", color: '#343a40'
    },
    header: { textAlign: 'center', marginBottom: '40px' },
    title: { fontSize: '28px', fontWeight: 800, color: '#212529', marginBottom: '10px' },
    subtitle: { color: '#868e96', fontSize: '16px' },
    userInfo: { 
        textAlign: 'center', marginBottom: '20px', padding: '10px', 
        backgroundColor: '#e9ecef', borderRadius: '10px', display: 'inline-block' 
    },

    servicesRow: {
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px'
    },
    serviceCard: {
      flex: '0 0 calc(33.333% - 20px)', minWidth: '200px',
      backgroundColor: 'white', padding: '25px', borderRadius: '20px',
      border: '1px solid #e9ecef', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'all 0.2s ease', textAlign: 'center'
    },
    iconBox: {
      width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '5px'
    },
    formWrapper: {
      maxWidth: '450px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f3f5'
    },
    invoiceCard: {
      background: '#fff', borderRadius: '16px', padding: '25px', border: '2px dashed #dee2e6', position: 'relative'
    },
    invoiceRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' },
    invoiceLabel: { color: '#868e96' },
    invoiceValue: { fontWeight: 600, color: '#212529', textAlign: 'right' },
    divider: { height: '1px', background: '#e9ecef', margin: '15px 0' },
    totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
    totalAmount: { fontSize: '20px', fontWeight: 800, color: '#e03131' },
    balanceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', fontSize: '13px', color: '#2f9e44' },
    
    btn: {
      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: 'white', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '15px',
      opacity: isLoading ? 0.7 : 1
    },
    backBtn: {
      background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', color: '#868e96', cursor: 'pointer', marginBottom: '15px', fontSize: '14px', fontWeight: 500
    },
    loadingOverlay: {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.6)', 
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999
    }
  };

  return (
    <div style={styles.container}>
      {isLoading && (
          <div style={styles.loadingOverlay}>Đang xử lý...</div>
      )}

      <div style={styles.header}>
        <h2 style={styles.title}>Thanh Toán Hóa Đơn</h2>
        {currentUser && (
            <div style={{color: '#868e96'}}>
                Xin chào, <strong>{currentUser.full_name}</strong>
            </div>
        )}
      </div>

      {/* STEP 1: CHỌN DỊCH VỤ (Tự động check khi bấm) */}
      {step === 1 && (
        <div style={styles.servicesRow}>
          {services.map(s => (
            <div
              key={s.id}
              style={styles.serviceCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = s.color;
                e.currentTarget.style.boxShadow = `0 10px 20px -5px ${s.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e9ecef';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
              onClick={() => handleServiceClick(s)}
            >
              <div style={{ ...styles.iconBox, backgroundColor: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#495057' }}>{s.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2: XÁC NHẬN THANH TOÁN (INVOICE) */}
      {step === 2 && foundBill && currentUser && (
        <div style={styles.formWrapper}>
           <button style={styles.backBtn} onClick={resetForm}><FiArrowLeft /> Chọn dịch vụ khác</button>
          
          <div style={styles.invoiceCard}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
               <h3 style={{margin: 0, color: '#343a40'}}>Hóa Đơn {selectedService?.name}</h3>
               <span style={{fontSize: '12px', color: '#868e96'}}>Mã GD: #BILL-{foundBill.id}</span>
            </div>

            <div style={styles.invoiceRow}>
              <span style={styles.invoiceLabel}><FiUser style={{marginRight: 5, verticalAlign: 'middle'}}/>Khách hàng</span>
              <span style={styles.invoiceValue}>{currentUser.full_name}</span>
            </div>
            <div style={styles.invoiceRow}>
              <span style={styles.invoiceLabel}><FiMapPin style={{marginRight: 5, verticalAlign: 'middle'}}/>Địa chỉ</span>
              <span style={{...styles.invoiceValue, maxWidth: '60%', textAlign: 'right'}}>{currentUser.address}</span>
            </div>
            <div style={styles.invoiceRow}>
              <span style={styles.invoiceLabel}><FiCalendar style={{marginRight: 5, verticalAlign: 'middle'}}/>Kỳ cước</span>
              <span style={styles.invoiceValue}>{foundBill.period}</span>
            </div>
            
            <div style={styles.divider}></div>
            
            <div style={styles.totalRow}>
              <span style={{fontWeight: 700}}>Tổng tiền nợ</span>
              <span style={styles.totalAmount}>{formatCurrency(foundBill.amount)}</span>
            </div>

            {/* Hiển thị số dư hiện tại */}
            {currentAccount && (
                <div style={styles.balanceRow}>
                    <span><FiCreditCard style={{marginRight: 5, verticalAlign: 'middle'}}/>Số dư khả dụng:</span>
                    <span>{formatCurrency(currentAccount.balance)}</span>
                </div>
            )}

          </div>
          
          <button style={styles.btn} onClick={handleConfirmPayment} disabled={isLoading}>
            Thanh toán ngay
          </button>
        </div>
      )}

      {/* STEP 3: THÀNH CÔNG */}
      {step === 3 && (
        <div style={{ ...styles.formWrapper, textAlign: 'center', padding: '50px 20px' }}>
          <FiCheckCircle size={70} color="#2f9e44" />
          <h2 style={{ color: '#2f9e44', marginTop: '20px', marginBottom: '10px' }}>Thanh Toán Thành Công!</h2>
          <p style={{color: '#868e96', marginBottom: '30px'}}>
             Đã trừ {formatCurrency(foundBill?.amount || 0)} từ tài khoản.<br/>
             Số dư mới: <strong>{currentAccount ? formatCurrency(currentAccount.balance) : '---'}</strong>
          </p>
          <button style={styles.btn} onClick={resetForm}>Về trang chính</button>
        </div>
      )}
    </div>
  );
};

export default PayBill;