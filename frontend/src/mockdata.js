/**
 * MOCK DATA CHO REACT APP
 * - 1 Teller (Có thông tin chi tiết trong employees)
 * - 5 Customers (Có thông tin chi tiết, liên kết Users -> Customers)
 * - 5 Accounts (Mỗi Customer 1 account)
 * - ~250 Transactions (Mỗi Account thực hiện 50 giao dịch)
 * - Loans (Mỗi Customer 3-4 khoản vay)
 */

export const mockData = {
  // --- 1. PHÂN QUYỀN ---
  roles: [
    { role_id: 1, role_name: "Teller", description: "Giao dịch viên ngân hàng" },
    { role_id: 2, role_name: "Customer", description: "Khách hàng cá nhân" }
  ],

  // --- 2. TÀI KHOẢN ĐĂNG NHẬP ---
  users: [
    // Teller User
    { user_id: 100, role_id: 1, username: "teller_main", password_hash: "phamyen123", status: "ACTIVE", created_at: "2025-01-01" },
    // Customer Users
    { user_id: 101, role_id: 2, username: "nguyenvanan", password_hash: "hash_cust_01", status: "ACTIVE", created_at: "2025-01-01" },
    { user_id: 102, role_id: 2, username: "tranthibinh", password_hash: "hash_cust_02", status: "ACTIVE", created_at: "2025-01-01" },
    { user_id: 103, role_id: 2, username: "levancuong", password_hash: "hash_cust_03", status: "ACTIVE", created_at: "2025-01-01" },
    { user_id: 104, role_id: 2, username: "phamthidung", password_hash: "hash_cust_04", status: "ACTIVE", created_at: "2025-01-01" },
    { user_id: 105, role_id: 2, username: "hoangvanduc", password_hash: "hash_cust_05", status: "ACTIVE", created_at: "2025-01-01" }
  ],

  // --- 3. THÔNG TIN NHÂN VIÊN (TELLER) ---
  teller: [
    { 
      teller_id: 1, 
      user_id: 100, // Link với user teller
      full_name: "Phạm Hoàng Yến", 
      email: "yen.ph.bank@gmail.com", 
      phone: "0988888888", 
      position: "Senior Teller", 
      branch: "Chi nhánh Hội sở Hà Nội",
      date_of_birth: "1995-08-15",
      hire_date: "2023-01-10"
    }
  ],

  // --- 4. THÔNG TIN KHÁCH HÀNG ---
  customers: [
    { customer_id: 1, user_id: 101, full_name: "Nguyễn Văn An", email: "an.nguyen@gmail.com", phone: "0901111111", address: "Hà Nội", date_of_birth: "1990-01-01", id_card: "001090000001" },
    { customer_id: 2, user_id: 102, full_name: "Trần Thị Bình", email: "binh.tran@gmail.com", phone: "0902222222", address: "TP HCM", date_of_birth: "1992-05-15", id_card: "001092000002" },
    { customer_id: 3, user_id: 103, full_name: "Lê Văn Cường", email: "cuong.le@gmail.com", phone: "0903333333", address: "Đà Nẵng", date_of_birth: "1988-09-20", id_card: "001088000003" },
    { customer_id: 4, user_id: 104, full_name: "Phạm Thị Dung", email: "dung.pham@gmail.com", phone: "0904444444", address: "Cần Thơ", date_of_birth: "1995-12-12", id_card: "001095000004" },
    { customer_id: 5, user_id: 105, full_name: "Hoàng Văn Đức", email: "duc.hoang@gmail.com", phone: "0905555555", address: "Hải Phòng", date_of_birth: "1991-03-30", id_card: "001091000005" }
  ],

  // --- 5. TÀI KHOẢN THANH TOÁN (Mỗi khách 1 tài khoản) ---
  accounts: [
    { account_id: 1, customer_id: 1, account_number: "1111000001", balance: 50000000, currency: "VND", status: "ACTIVE", open_date: "2024-01-01" },
    { account_id: 2, customer_id: 2, account_number: "2222000002", balance: 120000000, currency: "VND", status: "ACTIVE", open_date: "2024-01-01" },
    { account_id: 3, customer_id: 3, account_number: "3333000003", balance: 5000000, currency: "VND", status: "ACTIVE", open_date: "2024-01-01" },
    { account_id: 4, customer_id: 4, account_number: "4444000004", balance: 890000000, currency: "VND", status: "ACTIVE", open_date: "2024-01-01" },
    { account_id: 5, customer_id: 5, account_number: "5555000005", balance: 34000000, currency: "VND", status: "ACTIVE", open_date: "2024-01-01" }
  ],

  // --- 6. KHOẢN VAY (LOANS) ---
  loans: [
    // Customer 1
    { loan_id: 1, customer_id: 1, loan_type: "Vay mua nhà", principal_amount: 1000000000, interest_rate: 7.5, start_date: "2024-01-01", duration_months: 120, status: "ACTIVE" },
    { loan_id: 2, customer_id: 1, loan_type: "Vay tiêu dùng", principal_amount: 50000000, interest_rate: 12.0, start_date: "2025-01-01", duration_months: 24, status: "ACTIVE" },
    { loan_id: 3, customer_id: 1, loan_type: "Thẻ tín dụng", principal_amount: 20000000, interest_rate: 18.0, start_date: "2025-06-01", duration_months: 12, status: "ACTIVE" },
    // Customer 2
    { loan_id: 4, customer_id: 2, loan_type: "Vay mua xe", principal_amount: 500000000, interest_rate: 8.5, start_date: "2024-05-15", duration_months: 60, status: "ACTIVE" },
    { loan_id: 5, customer_id: 2, loan_type: "Vay kinh doanh", principal_amount: 200000000, interest_rate: 10.5, start_date: "2024-11-20", duration_months: 36, status: "ACTIVE" },
    { loan_id: 6, customer_id: 2, loan_type: "Vay thấu chi", principal_amount: 10000000, interest_rate: 15.0, start_date: "2025-02-01", duration_months: 12, status: "ACTIVE" },
    // Customer 3
    { loan_id: 7, customer_id: 3, loan_type: "Vay mua nhà", principal_amount: 2500000000, interest_rate: 7.2, start_date: "2023-01-01", duration_months: 240, status: "ACTIVE" },
    { loan_id: 8, customer_id: 3, loan_type: "Vay sửa nhà", principal_amount: 300000000, interest_rate: 9.0, start_date: "2024-08-01", duration_months: 48, status: "ACTIVE" },
    { loan_id: 9, customer_id: 3, loan_type: "Vay học tập", principal_amount: 50000000, interest_rate: 5.0, start_date: "2025-09-01", duration_months: 48, status: "ACTIVE" },
    // Customer 4
    { loan_id: 10, customer_id: 4, loan_type: "Vay mua ô tô", principal_amount: 800000000, interest_rate: 8.0, start_date: "2024-03-10", duration_months: 72, status: "ACTIVE" },
    { loan_id: 11, customer_id: 4, loan_type: "Vay tiêu dùng", principal_amount: 100000000, interest_rate: 11.5, start_date: "2025-01-20", duration_months: 36, status: "ACTIVE" },
    { loan_id: 12, customer_id: 4, loan_type: "Vay trả góp", principal_amount: 15000000, interest_rate: 0.0, start_date: "2025-10-10", duration_months: 6, status: "ACTIVE" },
    // Customer 5
    { loan_id: 13, customer_id: 5, loan_type: "Vay kinh doanh nhỏ", principal_amount: 150000000, interest_rate: 10.0, start_date: "2024-06-01", duration_months: 24, status: "ACTIVE" },
    { loan_id: 14, customer_id: 5, loan_type: "Vay y tế", principal_amount: 40000000, interest_rate: 6.0, start_date: "2025-04-01", duration_months: 12, status: "ACTIVE" },
    { loan_id: 15, customer_id: 5, loan_type: "Vay tiêu dùng", principal_amount: 25000000, interest_rate: 12.5, start_date: "2025-11-15", duration_months: 18, status: "ACTIVE" }
  ],

  // --- 7. LỊCH SỬ GIAO DỊCH (250 GIAO DỊCH, 50 per User) ---
  // Sử dụng một hàm IIFE (Immediately Invoked Function Expression) để sinh dữ liệu tĩnh gọn gàng trong file này
  transactions: (() => {
    const txs = [];
    const accounts = [1, 2, 3, 4, 5];
    const types = ["TRANSFER", "PAYMENT", "DEPOSIT"];
    const descriptions = ["Chuyển tiền", "Thanh toán hóa đơn", "Mua sắm online", "Trả nợ", "Ăn uống"];
    let idCounter = 1;

    // Sinh 50 giao dịch cho mỗi tài khoản
    accounts.forEach(senderId => {
      for (let i = 0; i < 50; i++) {
        // Chọn ngẫu nhiên người nhận (không trùng người gửi)
        let receiverId = senderId;
        while (receiverId === senderId) {
          receiverId = accounts[Math.floor(Math.random() * accounts.length)];
        }

        txs.push({
          transaction_id: idCounter++,
          sender_account_id: senderId,
          receiver_account_id: receiverId,
          transaction_type: types[Math.floor(Math.random() * types.length)],
          amount: Math.floor(Math.random() * 50) * 100000 + 50000, // Random từ 50k đến 5tr
          transaction_time: `2025-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}T${Math.floor(Math.random() * 23)}:${Math.floor(Math.random() * 59)}:00`,
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          status: "SUCCESS"
        });
      }
    });
    
    // Sắp xếp lại theo ID để dễ nhìn (hoặc theo ngày tháng nếu muốn)
    return txs.sort((a, b) => a.transaction_id - b.transaction_id);
  })()
};