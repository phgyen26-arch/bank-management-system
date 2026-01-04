import React, { useState } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";
import { mockData } from "../../mockdata";

const BillPayment = () => {
  /* ================= STATE ================= */
  const [searchInput, setSearchInput] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [billType, setBillType] = useState("Electricity");
  const [billCode, setBillCode] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  /* ================= LOGIC ================= */
  const currentBalance = customerData ? customerData.balance : 0;
  const paymentAmount = Number(amount || 0);
  const remainingBalance = currentBalance - paymentAmount;

  /* ================= HANDLERS ================= */
  const handleSearch = () => {
    if (!searchInput.trim()) return;

    setError("");
    setCustomerData(null);
    setAmount("");
    setBillCode("");

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
    if (!billCode.trim()) return alert("Please enter bill code!");
    if (paymentAmount <= 0) return alert("Invalid payment amount!");
    if (paymentAmount > currentBalance) return alert("Insufficient balance!");

    alert(`Bill payment successful!
Customer: ${customerData.full_name}
Bill Type: ${billType}
Bill Code: ${billCode}
Amount: ${paymentAmount.toLocaleString()} VND`);

    setSearchInput("");
    setCustomerData(null);
    setAmount("");
    setBillCode("");
  };

  /* ================= STYLES ================= */
  const styles = {
    wrapper: {
      marginLeft: "10px",
      height: "100vh",          // ✅ GIỐNG CreateAccount
      overflowY: "auto",        // ✅ GIỐNG CreateAccount
      background: "#f9fafb",
      padding: "40px",
      boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      paddingBottom: "80px",
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
      background: "linear-gradient(135deg, #003366, #2563eb)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 26,
    },
    headerTitle: {
      fontSize: 26,
      fontWeight: 800,
      color: "#111827",
    },
    headerSub: {
      fontSize: 14,
      color: "#6b7280",
      marginTop: 4,
    },

    card: {
      background: "#fff",
      borderRadius: 16,
      padding: "32px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      border: "1px solid #f3f4f6",
      marginBottom: 28,
    },

    searchRow: {
      display: "flex",
      gap: 16,
    },
    input: {
      flex: 1,
      height: 52,
      padding: "0 16px",
      borderRadius: 10,
      border: "1px solid #d1d5db",
      fontSize: 14,
      outline: "none",
    },
    select: {
      width: "100%",
      height: 52,
      borderRadius: 10,
      border: "1px solid #d1d5db",
      padding: "0 14px",
      fontSize: 14,
      background: "#fff",
    },
    button: {
      height: 52,
      padding: "0 28px",
      borderRadius: 10,
      border: "none",
      fontWeight: 600,
      background: "#003366",
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
    },
    customerName: {
      fontSize: 18,
      fontWeight: 700,
    },
    customerMeta: {
      fontSize: 14,
      color: "#6b7280",
    },
    balanceBox: {
      marginLeft: "auto",
      textAlign: "right",
    },
    balanceValue: {
      fontSize: 22,
      fontWeight: 800,
      color: "#059669",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 32,
    },
    moneyInput: {
      width: "100%",
      height: 60,
      borderRadius: 12,
      border: "2px solid #d1d5db",
      fontSize: 24,
      fontWeight: 700,
      padding: "0 18px",
      color: "#003366",
    },

    summary: {
      background: "#f9fafb",
      borderRadius: 12,
      padding: 24,
      border: "1px solid #e5e7eb",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 14,
      fontSize: 14,
    },

    actionRow: {
      marginTop: 36,
      textAlign: "right",
    },
    confirmBtn: {
      height: 56,
      padding: "0 36px",
      borderRadius: 12,
      border: "none",
      fontSize: 15,
      fontWeight: 700,
      background: "#003366",
      color: "#fff",
      cursor: "pointer",
    },
    errorMsg: {
      color: "#dc2626",
      marginTop: 12,
      fontSize: 14,
    },
  };

  /* ================= RENDER ================= */
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <FiFileText />
          </div>
          <div>
            <div style={styles.headerTitle}>Bill Payments</div>
            <div style={styles.headerSub}>
              Utility Bill Processing (Core Banking)
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div style={styles.card}>
          <div style={styles.searchRow}>
            <input
              style={styles.input}
              placeholder="Account No, ID Card, or Name..."
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
                <img src={customerData.avatarUrl} alt="" style={styles.avatar} />
                <div>
                  <div style={styles.customerName}>{customerData.full_name}</div>
                  <div style={styles.customerMeta}>
                    Account No: {customerData.accountNumber}
                  </div>
                  <div style={styles.customerMeta}>
                    ID: {customerData.id_card} • {customerData.phone}
                  </div>
                </div>
                <div style={styles.balanceBox}>
                  <div>Balance</div>
                  <div style={styles.balanceValue}>
                    {currentBalance.toLocaleString()} VND
                  </div>
                </div>
              </div>
            </div>

            {/* BILL PAYMENT */}
            <div style={styles.card}>
              <div style={styles.grid}>
                <div>
                  <select
                    style={styles.select}
                    value={billType}
                    onChange={(e) => setBillType(e.target.value)}
                  >
                    <option>Electricity</option>
                    <option>Water</option>
                    <option>Internet</option>
                    <option>Television</option>
                  </select>

                  <input
                    style={{ ...styles.input, marginTop: 16 }}
                    placeholder="Bill Code"
                    value={billCode}
                    onChange={(e) => setBillCode(e.target.value)}
                  />

                  <input
                    style={{ ...styles.moneyInput, marginTop: 16 }}
                    type="number"
                    placeholder="Payment Amount"
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
                    <span>Payment Amount</span>
                    <span>{paymentAmount.toLocaleString()} VND</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <b>Remaining</b>
                    <b>{remainingBalance.toLocaleString()} VND</b>
                  </div>
                </div>
              </div>

              <div style={styles.actionRow}>
                <button style={styles.confirmBtn} onClick={handleConfirm}>
                  Confirm Bill Payment
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillPayment;
