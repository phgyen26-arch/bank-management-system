import React, { useState } from "react";
import { FiSearch, FiMinusCircle } from "react-icons/fi";
import { mockData } from "../../mockdata";

const CashWithdraw = () => {
  /* ================= STATE ================= */
  const [searchInput, setSearchInput] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  /* ================= LOGIC ================= */
  const currentBalance = customerData ? customerData.balance : 0;
  const withdrawAmount = Number(amount || 0);
  const newBalance = currentBalance - withdrawAmount;

  /* ================= HANDLERS ================= */
  const handleSearch = () => {
    if (!searchInput.trim()) return;

    setError("");
    setCustomerData(null);
    setAmount("");

    const keyword = searchInput.trim().toLowerCase();

    let foundAccount = mockData.accounts.find(
      (a) => a.account_number === keyword
    );
    let foundCustomer = null;

    if (foundAccount) {
      foundCustomer = mockData.customers.find(
        (c) => c.customer_id === foundAccount.customer_id
      );
    } else {
      foundCustomer = mockData.customers.find(
        (c) =>
          c.id_card.includes(keyword) ||
          c.full_name.toLowerCase().includes(keyword) ||
          c.phone.includes(keyword)
      );
      if (foundCustomer) {
        foundAccount = mockData.accounts.find(
          (a) => a.customer_id === foundCustomer.customer_id
        );
      }
    }

    if (foundCustomer && foundAccount) {
      setCustomerData({
        ...foundCustomer,
        accountNumber: foundAccount.account_number,
        balance: foundAccount.balance,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          foundCustomer.full_name
        )}&background=random&color=fff`,
      });
    } else {
      setError("Customer or Account not found in system.");
    }
  };

  const handleConfirm = () => {
    if (!customerData) return;

    if (withdrawAmount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (withdrawAmount > currentBalance) {
      alert("Insufficient balance!");
      return;
    }

    alert(
      `Successfully withdrew ${withdrawAmount.toLocaleString()} VND for ${
        customerData.full_name
      }`
    );

    setSearchInput("");
    setCustomerData(null);
    setAmount("");
  };

  /* ================= STYLES ================= */
  const styles = {
    wrapper: {
      marginLeft: "10px",
      height: "100vh",
      overflowY: "auto",
      background: "linear-gradient(180deg, #f4f6fb, #eef2f7)",
      padding: "32px 40px",
      fontFamily: "'Inter', sans-serif",
    },

    header: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 32,
      paddingBottom: 20,
      borderBottom: "1px solid #e5e7eb",
    },
    headerIcon: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: "linear-gradient(135deg, #7c2d12, #dc2626)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 26,
    },
    headerTitle: {
      fontSize: 26,
      fontWeight: 700,
      color: "#0f172a",
    },
    headerSub: {
      fontSize: 14,
      color: "#64748b",
      marginTop: 4,
    },

    card: {
      background: "#fff",
      borderRadius: 20,
      padding: "28px 32px",
      boxShadow: "0 15px 40px rgba(15,23,42,0.1)",
      marginBottom: 28,
    },

    searchRow: {
      display: "flex",
      gap: 16,
    },
    input: {
      flex: 1,
      height: 52,
      padding: "0 18px",
      borderRadius: 14,
      border: "1px solid #e2e8f0",
      fontSize: 15,
      outline: "none",
    },
    button: {
      height: 52,
      padding: "0 28px",
      borderRadius: 14,
      border: "none",
      fontWeight: 600,
      background: "#0f172a",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },

    customerRow: {
      display: "flex",
      alignItems: "center",
      gap: 24,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: "50%",
      objectFit: "cover",
    },
    customerName: {
      fontSize: 18,
      fontWeight: 700,
      color: "#0f172a",
    },
    customerMeta: {
      fontSize: 14,
      color: "#64748b",
      marginTop: 4,
    },
    balanceBox: {
      marginLeft: "auto",
      textAlign: "right",
    },
    balanceLabel: {
      fontSize: 13,
      color: "#94a3b8",
    },
    balanceValue: {
      fontSize: 22,
      fontWeight: 700,
      color: "#dc2626",
    },

    depositGrid: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 32,
    },
    moneyInput: {
      width: "100%",
      height: 64,
      borderRadius: 16,
      border: "2px solid #e2e8f0",
      fontSize: 28,
      fontWeight: 700,
      padding: "0 20px",
      color: "#dc2626",
      outline: "none",
    },

    summary: {
      background: "#f8fafc",
      borderRadius: 16,
      padding: 24,
      border: "1px solid #e2e8f0",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 14,
      fontSize: 15,
    },
    summaryHighlight: {
      fontSize: 18,
      fontWeight: 700,
      color: "#dc2626",
    },

    actionRow: {
      marginTop: 36,
      textAlign: "right",
    },
    confirmBtn: {
      height: 56,
      padding: "0 36px",
      borderRadius: 16,
      border: "none",
      fontSize: 16,
      fontWeight: 700,
      background: "linear-gradient(135deg, #dc2626, #ef4444)",
      color: "#fff",
      cursor: "pointer",
      boxShadow: "0 10px 25px rgba(220,38,38,0.4)",
    },
    errorMsg: {
      color: "#ef4444",
      marginTop: 10,
      fontSize: 14,
    },
  };

  /* ================= RENDER ================= */
  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <FiMinusCircle />
        </div>
        <div>
          <div style={styles.headerTitle}>Cash Withdrawal</div>
          <div style={styles.headerSub}>
            Teller cash-out transaction (Core Banking)
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div style={styles.card}>
        <div style={styles.searchRow}>
          <input
            style={styles.input}
            placeholder="Enter Account No, ID Card, or Name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button style={styles.button} onClick={handleSearch}>
            <FiSearch /> Search
          </button>
        </div>
        {error && <div style={styles.errorMsg}>{error}</div>}
      </div>

      {customerData && (
        <>
          {/* CUSTOMER INFO */}
          <div style={styles.card}>
            <div style={styles.customerRow}>
              <img
                src={customerData.avatarUrl}
                alt="avatar"
                style={styles.avatar}
              />
              <div>
                <div style={styles.customerName}>
                  {customerData.full_name}
                </div>
                <div style={styles.customerMeta}>
                  Account No: {customerData.accountNumber}
                </div>
                <div style={{ ...styles.customerMeta, fontSize: 13 }}>
                  ID: {customerData.id_card} • Phone: {customerData.phone}
                </div>
              </div>
              <div style={styles.balanceBox}>
                <div style={styles.balanceLabel}>Current Balance</div>
                <div style={styles.balanceValue}>
                  {currentBalance.toLocaleString()} VND
                </div>
              </div>
            </div>
          </div>

          {/* WITHDRAW */}
          <div style={styles.card}>
            <div style={styles.depositGrid}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>
                  Withdrawal Amount
                </div>
                <input
                  style={styles.moneyInput}
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div style={styles.summary}>
                <div style={styles.summaryRow}>
                  <span>Current Balance</span>
                  <span>{currentBalance.toLocaleString()} VND</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Withdrawal Amount</span>
                  <span>{withdrawAmount.toLocaleString()} VND</span>
                </div>
                <div style={styles.summaryRow}>
                  <strong>Remaining Balance</strong>
                  <strong style={styles.summaryHighlight}>
                    {newBalance.toLocaleString()} VND
                  </strong>
                </div>
              </div>
            </div>

            <div style={styles.actionRow}>
              <button style={styles.confirmBtn} onClick={handleConfirm}>
                Confirm Cash Withdrawal
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CashWithdraw;
