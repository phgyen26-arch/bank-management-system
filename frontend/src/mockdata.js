/**
 * MOCK DATA – BANKING APP
 * - 1 Teller
 * - 5 Customers
 * - 5 Accounts
 * - ~500 Transactions (100 / customer)
 * - Loans (>= 3 / customer)
 */

/* =======================
   1. ROLES
======================= */
const roles = [
  { role_id: 1, role_name: "Teller", description: "Giao dịch viên ngân hàng" },
  { role_id: 2, role_name: "Customer", description: "Khách hàng cá nhân" },
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
    branch: "Chi nhánh Hội sở Hà Nội",
    hire_date: "2023-01-10",
  },
];

/* =======================
   4. CUSTOMERS
======================= */
const customers = [
  { customer_id: 1, user_id: 101, full_name: "Nguyễn Văn An", address: "Hà Nội" },
  { customer_id: 2, user_id: 102, full_name: "Trần Thị Bình", address: "TP HCM" },
  { customer_id: 3, user_id: 103, full_name: "Lê Văn Cường", address: "Đà Nẵng" },
  { customer_id: 4, user_id: 104, full_name: "Phạm Thị Dung", address: "Cần Thơ" },
  { customer_id: 5, user_id: 105, full_name: "Hoàng Văn Đức", address: "Hải Phòng" },
];

/* =======================
   5. ACCOUNTS
======================= */
const accounts = [
  { account_id: 1, customer_id: 1, account_number: "1111000001", balance: 50_000_000, currency: "VND" },
  { account_id: 2, customer_id: 2, account_number: "2222000002", balance: 120_000_000, currency: "VND" },
  { account_id: 3, customer_id: 3, account_number: "3333000003", balance: 5_000_000, currency: "VND" },
  { account_id: 4, customer_id: 4, account_number: "4444000004", balance: 890_000_000, currency: "VND" },
  { account_id: 5, customer_id: 5, account_number: "5555000005", balance: 34_000_000, currency: "VND" },
];

/* =======================
   6. LOANS (>= 3 / CUSTOMER)
======================= */
const loans = [
  // Customer 1
  { loan_id: 1, customer_id: 1, loan_type: "Vay mua nhà", principal_amount: 1_200_000_000, interest_rate: 7.2, duration_months: 240, status: "ACTIVE" },
  { loan_id: 2, customer_id: 1, loan_type: "Vay tiêu dùng", principal_amount: 80_000_000, interest_rate: 11.5, duration_months: 36, status: "ACTIVE" },
  { loan_id: 3, customer_id: 1, loan_type: "Thẻ tín dụng", principal_amount: 30_000_000, interest_rate: 18.0, duration_months: 12, status: "ACTIVE" },

  // Customer 2
  { loan_id: 4, customer_id: 2, loan_type: "Vay mua ô tô", principal_amount: 600_000_000, interest_rate: 8.3, duration_months: 72, status: "ACTIVE" },
  { loan_id: 5, customer_id: 2, loan_type: "Vay kinh doanh", principal_amount: 250_000_000, interest_rate: 10.5, duration_months: 48, status: "ACTIVE" },
  { loan_id: 6, customer_id: 2, loan_type: "Vay thấu chi", principal_amount: 20_000_000, interest_rate: 15.0, duration_months: 12, status: "ACTIVE" },

  // Customer 3
  { loan_id: 7, customer_id: 3, loan_type: "Vay mua nhà", principal_amount: 2_000_000_000, interest_rate: 7.0, duration_months: 300, status: "ACTIVE" },
  { loan_id: 8, customer_id: 3, loan_type: "Vay học tập", principal_amount: 60_000_000, interest_rate: 5.0, duration_months: 48, status: "ACTIVE" },
  { loan_id: 9, customer_id: 3, loan_type: "Vay tiêu dùng", principal_amount: 40_000_000, interest_rate: 12.0, duration_months: 24, status: "ACTIVE" },

  // Customer 4
  { loan_id: 10, customer_id: 4, loan_type: "Vay mua ô tô", principal_amount: 850_000_000, interest_rate: 8.0, duration_months: 84, status: "ACTIVE" },
  { loan_id: 11, customer_id: 4, loan_type: "Vay tiêu dùng", principal_amount: 120_000_000, interest_rate: 11.0, duration_months: 36, status: "ACTIVE" },
  { loan_id: 12, customer_id: 4, loan_type: "Vay trả góp 0%", principal_amount: 20_000_000, interest_rate: 0.0, duration_months: 6, status: "ACTIVE" },

  // Customer 5
  { loan_id: 13, customer_id: 5, loan_type: "Vay kinh doanh nhỏ", principal_amount: 180_000_000, interest_rate: 10.0, duration_months: 36, status: "ACTIVE" },
  { loan_id: 14, customer_id: 5, loan_type: "Vay y tế", principal_amount: 50_000_000, interest_rate: 6.0, duration_months: 24, status: "ACTIVE" },
  { loan_id: 15, customer_id: 5, loan_type: "Vay tiêu dùng", principal_amount: 35_000_000, interest_rate: 12.5, duration_months: 18, status: "ACTIVE" },
];

/* =======================
   7. TRANSACTIONS (FIXED)
======================= */
const transactions = (() => {
  const txs = [];
  let txId = 1;

  const IN_TYPES = ["DEPOSIT", "TRANSFER_IN", "REFUND"];
  const OUT_TYPES = ["PAYMENT", "TRANSFER_OUT", "WITHDRAW"];

  accounts.forEach((account) => {
    const BALANCE = account.balance;

    // 1. Tổng tiền ra (random nhưng hợp lý)
    const totalOutTarget =
      Math.floor(Math.random() * BALANCE * 0.8) + BALANCE * 0.5;

    // 2. Tổng tiền vào = tiền ra + số dư
    const totalInTarget = totalOutTarget + BALANCE;

    let totalIn = 0;
    let totalOut = 0;

    /* ===== IN TRANSACTIONS ===== */
    for (let i = 0; i < 50; i++) {
      const amount =
        i === 49
          ? totalInTarget - totalIn
          : Math.floor(Math.random() * 5_000_000) + 500_000;

      totalIn += amount;

      txs.push({
        transaction_id: txId++,
        sender_account_id: null,
        receiver_account_id: account.account_id,
        transaction_type:
          IN_TYPES[Math.floor(Math.random() * IN_TYPES.length)],
        amount,
        transaction_time: randomDate(),
        description: "Nhận tiền",
        status: "SUCCESS",
      });
    }

    /* ===== OUT TRANSACTIONS ===== */
    for (let i = 0; i < 50; i++) {
      const amount =
        i === 49
          ? totalOutTarget - totalOut
          : Math.floor(Math.random() * 3_000_000) + 100_000;

      totalOut += amount;

      txs.push({
        transaction_id: txId++,
        sender_account_id: account.account_id,
        receiver_account_id: null,
        transaction_type:
          OUT_TYPES[Math.floor(Math.random() * OUT_TYPES.length)],
        amount,
        transaction_time: randomDate(),
        description: "Chi tiêu",
        status: "SUCCESS",
      });
    }

    // DEBUG CHECK (có thể xoá khi ổn)
    if (totalIn - totalOut !== BALANCE) {
      console.error("❌ Balance mismatch:", {
        account: account.account_number,
        totalIn,
        totalOut,
        balance: BALANCE,
      });
    }
  });

  return txs.sort(
    (a, b) => new Date(b.transaction_time) - new Date(a.transaction_time)
  );

  function randomDate() {
    const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const d = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `2025-${m}-${d}T10:00:00`;
  }
})();


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
};
