// file: src/mockData.js

/* =======================
   1. ROLES
======================= */
const roles = [
  { role_id: 1, role_name: "Teller", description: "Bank Teller" },
  { role_id: 2, role_name: "Customer", description: "Personal Customer" },
];

/* =======================
   2. USERS
======================= */
const users = [
  { user_id: 100, role_id: 1, username: "teller_main", password_hash: "phamyen123", status: "ACTIVE", created_at: "2025-01-01" },
  { user_id: 101, role_id: 2, username: "dobiettoilaai", password_hash: "toilahuyne", status: "ACTIVE", created_at: "2025-01-01" },
  { user_id: 102, role_id: 2, username: "tranthibinh", password_hash: "hash_02", status: "ACTIVE", created_at: "2025-01-01" },
  { user_id: 103, role_id: 2, username: "levancuong", password_hash: "hash_03", status: "ACTIVE", created_at: "2025-01-01" },
  { user_id: 104, role_id: 2, username: "phamthidung", password_hash: "hash_04", status: "ACTIVE", created_at: "2025-01-01" },
  { user_id: 105, role_id: 2, username: "hoangvanduc", password_hash: "hash_05", status: "ACTIVE", created_at: "2025-01-01" },
];

/* =======================
   3. TELLER
======================= */
const teller = [
  {
    teller_id: 1,
    user_id: 100,
    full_name: "Phạm Hoàng Yến",
    email: "yen.ph.bank@gmail.com",
    phone: "0988888888",
    position: "Senior Teller",
    branch: "Hanoi Head Office Branch",
    hire_date: "2023-01-10",
  },
];

/* =======================
   4. CUSTOMERS (FULL INFO)
======================= */
const customers = [
  {
    customer_id: 1,
    user_id: 101,
    full_name: "Nguyễn Văn An",
    date_of_birth: "1998-05-12",
    id_card: "001098000111", // Dùng mã này để test Bill Điện
    phone: "0901234567",
    email: "an.nguyen@example.com",
    address: "123 Nguyễn Trãi, Quận 1, TP.HCM",
  },
  {
    customer_id: 2,
    user_id: 102,
    full_name: "Trần Thị Bình",
    date_of_birth: "1997-08-22",
    id_card: "001097000222", // Dùng mã này để test Bill Nước
    phone: "0912345678",
    email: "binh.tran@example.com",
    address: "45 Lê Lợi, Quận Hải Châu, Đà Nẵng",
  },
  {
    customer_id: 3,
    user_id: 103,
    full_name: "Lê Văn Cường",
    date_of_birth: "2000-01-15",
    id_card: "001100000333",
    phone: "0923456789",
    email: "cuong.le@example.com",
    address: "78 Trần Phú, TP Nha Trang, Khánh Hòa",
  },
  {
    customer_id: 4,
    user_id: 104,
    full_name: "Phạm Thị Dung",
    date_of_birth: "1995-11-30",
    id_card: "001095000444",
    phone: "0934567890",
    email: "dung.pham@example.com",
    address: "256 Hai Bà Trưng, Quận 3, TP.HCM",
  },
  {
    customer_id: 5,
    user_id: 105,
    full_name: "Hoàng Văn Đức",
    date_of_birth: "1999-03-09",
    id_card: "001099000555",
    phone: "0945678901",
    email: "duc.hoang@example.com",
    address: "12 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
  },
];

/* =======================
   5. ACCOUNTS
======================= */
const accounts = [
  { account_id: 1, customer_id: 1, account_number: "1111000001", balance: 50_000_000, currency: "VND", open_date: "2022-01-01" },
  { account_id: 2, customer_id: 2, account_number: "2222000002", balance: 120_000_000, currency: "VND", open_date: "2021-06-15" },
  { account_id: 3, customer_id: 3, account_number: "3333000003", balance: 5_000_000, currency: "VND", open_date: "2023-03-10" },
  { account_id: 4, customer_id: 4, account_number: "4444000004", balance: 890_000_000, currency: "VND", open_date: "2020-09-20" },
  { account_id: 5, customer_id: 5, account_number: "5555000005", balance: 34_000_000, currency: "VND", open_date: "2022-12-05" },
];

/* =======================
   6. LOANS
======================= */
const loans = [
  { loan_id: 1, customer_id: 1, loan_type: "Home Loan", principal_amount: 1_200_000_000, interest_rate: 7.2, duration_months: 240, status: "ACTIVE" },
  { loan_id: 2, customer_id: 1, loan_type: "Consumer Loan", principal_amount: 80_000_000, interest_rate: 11.5, duration_months: 36, status: "ACTIVE" },
  { loan_id: 3, customer_id: 1, loan_type: "Credit Card", principal_amount: 30_000_000, interest_rate: 18.0, duration_months: 12, status: "ACTIVE" },

  { loan_id: 4, customer_id: 2, loan_type: "Car Loan", principal_amount: 600_000_000, interest_rate: 8.3, duration_months: 72, status: "ACTIVE" },
  { loan_id: 5, customer_id: 2, loan_type: "Business Loan", principal_amount: 250_000_000, interest_rate: 10.5, duration_months: 48, status: "ACTIVE" },
  { loan_id: 6, customer_id: 2, loan_type: "Overdraft", principal_amount: 20_000_000, interest_rate: 15.0, duration_months: 12, status: "ACTIVE" },

  { loan_id: 7, customer_id: 3, loan_type: "Home Loan", principal_amount: 2_000_000_000, interest_rate: 7.0, duration_months: 300, status: "ACTIVE" },
  { loan_id: 8, customer_id: 3, loan_type: "Student Loan", principal_amount: 60_000_000, interest_rate: 5.0, duration_months: 48, status: "ACTIVE" },
  { loan_id: 9, customer_id: 3, loan_type: "Consumer Loan", principal_amount: 40_000_000, interest_rate: 12.0, duration_months: 24, status: "ACTIVE" },

  { loan_id: 10, customer_id: 4, loan_type: "Car Loan", principal_amount: 850_000_000, interest_rate: 8.0, duration_months: 84, status: "ACTIVE" },
  { loan_id: 11, customer_id: 4, loan_type: "Consumer Loan", principal_amount: 120_000_000, interest_rate: 11.0, duration_months: 36, status: "ACTIVE" },
  { loan_id: 12, customer_id: 4, loan_type: "0% Installment Loan", principal_amount: 20_000_000, interest_rate: 0.0, duration_months: 6, status: "ACTIVE" },

  { loan_id: 13, customer_id: 5, loan_type: "Small Business Loan", principal_amount: 180_000_000, interest_rate: 10.0, duration_months: 36, status: "ACTIVE" },
  { loan_id: 14, customer_id: 5, loan_type: "Medical Loan", principal_amount: 50_000_000, interest_rate: 6.0, duration_months: 24, status: "ACTIVE" },
  { loan_id: 15, customer_id: 5, loan_type: "Consumer Loan", principal_amount: 35_000_000, interest_rate: 12.5, duration_months: 18, status: "ACTIVE" },
];

/* =======================
   7. TRANSACTIONS
======================= */
const transactions = (() => {
  const txs = [];
  let txId = 1;

  // Helper date function
  function randomDate() {
    const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const d = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `2025-${m}-${d}T10:00:00`;
  }

  const IN_TYPES = ["DEPOSIT", "TRANSFER_IN", "REFUND"];
  const OUT_TYPES = ["PAYMENT", "TRANSFER_OUT", "WITHDRAW"];

  accounts.forEach((account) => {
    const BALANCE = account.balance;
    const totalOutTarget = Math.floor(Math.random() * BALANCE * 0.8) + BALANCE * 0.5;
    const totalInTarget = totalOutTarget + BALANCE;

    let totalIn = 0;
    let totalOut = 0;

    // Generate Incoming
    for (let i = 0; i < 50; i++) {
      const amount = i === 49 ? totalInTarget - totalIn : Math.floor(Math.random() * 5_000_000) + 500_000;
      totalIn += amount;

      txs.push({
        transaction_id: txId++,
        sender_account_id: null,
        receiver_account_id: account.account_id,
        transaction_type: IN_TYPES[Math.floor(Math.random() * IN_TYPES.length)],
        amount: Math.abs(amount), // Ensure positive
        transaction_time: randomDate(),
        description: "Receive Money",
        status: "SUCCESS",
      });
    }

    // Generate Outgoing
    for (let i = 0; i < 50; i++) {
      const amount = i === 49 ? totalOutTarget - totalOut : Math.floor(Math.random() * 3_000_000) + 100_000;
      totalOut += amount;

      txs.push({
        transaction_id: txId++,
        sender_account_id: account.account_id,
        receiver_account_id: null,
        transaction_type: OUT_TYPES[Math.floor(Math.random() * OUT_TYPES.length)],
        amount: Math.abs(amount), // Ensure positive
        transaction_time: randomDate(),
        description: "Payment",
        status: "SUCCESS",
      });
    }
  });

  return txs.sort((a, b) => new Date(b.transaction_time) - new Date(a.transaction_time));
})();

/* =======================
   8. BILL GENERATION (NEW)
   Hàm này tạo hóa đơn nợ cước cho chức năng PayBill
======================= */
export const generateBills = (customerList) => {
  const bills = [];
  let billId = 1000;
  const currentPeriod = "05/2026";

  customerList.forEach((cust) => {
    // 1. Nguyễn Văn An (ID: 1) -> Nợ Điện & Net
    if (cust.customer_id === 1) {
      bills.push({ id: billId++, customer_id: 1, type: 'elec', amount: 1250000, period: currentPeriod });
      bills.push({ id: billId++, customer_id: 1, type: 'internet', amount: 220000, period: currentPeriod });
    }
    
    // 2. Trần Thị Bình (ID: 2) -> Nợ Nước & Mobile
    else if (cust.customer_id === 2) {
      bills.push({ id: billId++, customer_id: 2, type: 'water', amount: 85000, period: currentPeriod });
      bills.push({ id: billId++, customer_id: 2, type: 'mobile', amount: 450000, period: currentPeriod });
    }
    
    // 3. Lê Văn Cường (ID: 3) -> Nợ Truyền hình cáp
    else if (cust.customer_id === 3) {
      bills.push({ id: billId++, customer_id: 3, type: 'tv', amount: 165000, period: currentPeriod });
    }

    // 4. Các khách còn lại -> Random nợ hoặc không
    else {
      if (Math.random() > 0.5) {
        bills.push({ id: billId++, customer_id: cust.customer_id, type: 'elec', amount: Math.floor(Math.random() * 1000000) + 200000, period: currentPeriod });
      }
    }
  });
  
  return bills;
};

/* =======================
   EXPORT
======================= */
export const mockData = {
  roles,
  users,
  teller,
  customers,
  accounts,
  loans,
  transactions,
  // Lưu ý: bills sẽ được tạo động bằng hàm generateBills ở component để cập nhật state
};