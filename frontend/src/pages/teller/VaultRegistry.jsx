import React, { useState, useEffect } from "react";
import { FiBriefcase, FiArrowUpCircle, FiArrowDownCircle, FiFilter, FiSearch } from "react-icons/fi";
import { mockData } from "../../mockdata";

const VaultRegistry = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalIn: 0,
    totalOut: 0,
    balance: 0,
  });

  // --- FILTER STATE ---
  const [filterType, setFilterType] = useState("ALL"); // ALL, IN, OUT
  const [filterAccount, setFilterAccount] = useState(""); // Search by Account or Name
  const [filterDate, setFilterDate] = useState(""); // Search by Date (YYYY-MM-DD)

  const OPENING_BALANCE = 500000000; 

  /* ================= INIT DATA ================= */
  useEffect(() => {
    // 1. Get data from MockData
    const cashTxns = mockData.transactions
      .filter(tx => ["DEPOSIT", "WITHDRAW"].includes(tx.transaction_type))
      .map(tx => {
        const accountId = tx.receiver_account_id || tx.sender_account_id;
        const account = mockData.accounts.find(a => a.account_id === accountId);
        const customer = account 
            ? mockData.customers.find(c => c.customer_id === account.customer_id) 
            : { full_name: "Unknown" };

        return {
            id: `VREG-${tx.transaction_id}`,
            // Format date for display
            time: tx.transaction_time.replace("T", " "), 
            rawDate: tx.transaction_time.split("T")[0], // Raw date for filtering
            type: tx.transaction_type === "DEPOSIT" ? "CASH_IN" : "CASH_OUT",
            amount: tx.amount,
            customer: customer.full_name,
            account: account ? account.account_number : "N/A",
            description: tx.description
        };
    });

    // 2. Calculate Stats
    let totalIn = 0;
    let totalOut = 0;

    cashTxns.forEach(tx => {
        if (tx.type === "CASH_IN") totalIn += tx.amount;
        else totalOut += tx.amount;
    });

    setLogs(cashTxns);
    setStats({
        totalIn,
        totalOut,
        balance: OPENING_BALANCE + totalIn - totalOut
    });
  }, []);

  /* ================= FILTER LOGIC ================= */
  const getFilteredLogs = () => {
    return logs.filter(log => {
      // 1. Filter by Type
      const matchType = filterType === "ALL" || 
                        (filterType === "IN" && log.type === "CASH_IN") || 
                        (filterType === "OUT" && log.type === "CASH_OUT");

      // 2. Filter by Account or Name (Case insensitive)
      const searchKey = filterAccount.toLowerCase();
      const matchAccount = filterAccount === "" || 
                           log.account.includes(searchKey) || 
                           log.customer.toLowerCase().includes(searchKey);

      // 3. Filter by Date
      const matchDate = filterDate === "" || log.rawDate === filterDate;

      return matchType && matchAccount && matchDate;
    });
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  /* ================= STYLES ================= */
  const styles = {
    wrapper: {
      marginLeft: "10px", // 260px Sidebar + 10px Gap
      padding: "30px",
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    titleGroup: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "800",
      color: "#0f172a",
      margin: 0,
    },
    subTitle: {
      fontSize: "14px",
      color: "#64748b",
      marginTop: "4px",
    },
    iconBox: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      backgroundColor: "#0f172a",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    },

    // Stats Grid
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      marginBottom: "30px",
    },
    statCard: (bg, border) => ({
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      border: `1px solid ${border}`,
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      position: "relative",
      overflow: "hidden",
    }),
    statLabel: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#64748b",
      textTransform: "uppercase",
    },
    statValue: (color) => ({
      fontSize: "24px",
      fontWeight: "800",
      color: color,
      marginTop: "8px",
    }),
    statDecor: {
      position: "absolute",
      right: "-10px",
      bottom: "-10px",
      opacity: 0.1,
      fontSize: "80px",
    },

    // Toolbar & Inputs
    tableCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
    },
    toolbar: {
      padding: "20px",
      borderBottom: "1px solid #f1f5f9",
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    filterGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    inputIcon: {
      position: "absolute",
      left: "12px",
      color: "#94a3b8",
    },
    textInput: {
      padding: "10px 10px 10px 36px", // Space for icon
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "14px",
      width: "220px",
      outline: "none",
    },
    dateInput: {
      padding: "9px 12px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "14px",
      outline: "none",
      color: "#475569",
    },
    filterBtn: (active) => ({
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      backgroundColor: active ? "#0f172a" : "#f1f5f9",
      color: active ? "#fff" : "#64748b",
      marginLeft: "5px",
      transition: "all 0.2s",
    }),

    // Table
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    },
    th: {
      textAlign: "left",
      padding: "16px 24px",
      borderBottom: "2px solid #f1f5f9",
      color: "#475569",
      fontWeight: "600",
      backgroundColor: "#f8fafc",
    },
    td: {
      padding: "16px 24px",
      borderBottom: "1px solid #f1f5f9",
      color: "#334155",
    },
    amount: (type) => ({
      fontWeight: "700",
      color: type === "CASH_IN" ? "#16a34a" : "#dc2626",
    }),
    typeBadge: (type) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
        backgroundColor: type === "CASH_IN" ? "#dcfce7" : "#fee2e2",
        color: type === "CASH_IN" ? "#166534" : "#991b1b",
    })
  };

  /* ================= RENDER ================= */
  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.titleGroup}>
          <div style={styles.iconBox}><FiBriefcase /></div>
          <div>
            <h2 style={styles.title}>Vault Registry</h2>
            <div style={styles.subTitle}>Cash Management & Vault Balance</div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard("#fff", "#e2e8f0")}>
            <div style={styles.statLabel}>Current Vault Balance</div>
            <div style={styles.statValue("#0f172a")}>{formatCurrency(stats.balance)}</div>
            <FiBriefcase style={styles.statDecor} />
        </div>
        <div style={styles.statCard("#fff", "#dcfce7")}>
            <div style={styles.statLabel}>Total Cash In</div>
            <div style={styles.statValue("#16a34a")}>+ {formatCurrency(stats.totalIn)}</div>
            <FiArrowUpCircle style={{...styles.statDecor, color: "#16a34a"}} />
        </div>
        <div style={styles.statCard("#fff", "#fee2e2")}>
            <div style={styles.statLabel}>Total Cash Out</div>
            <div style={styles.statValue("#dc2626")}>- {formatCurrency(stats.totalOut)}</div>
            <FiArrowDownCircle style={{...styles.statDecor, color: "#dc2626"}} />
        </div>
      </div>

      {/* TABLE & FILTER */}
      <div style={styles.tableCard}>
        <div style={styles.toolbar}>
            {/* INPUT FILTER GROUP */}
            <div style={styles.filterGroup}>
                <div style={styles.inputWrapper}>
                    <FiSearch style={styles.inputIcon} />
                    <input 
                        style={styles.textInput} 
                        placeholder="Search Account, Customer..."
                        value={filterAccount}
                        onChange={(e) => setFilterAccount(e.target.value)}
                    />
                </div>
                <div style={styles.inputWrapper}>
                    <input 
                        type="date"
                        style={styles.dateInput}
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
                {(filterAccount || filterDate) && (
                    <button 
                        onClick={() => {setFilterAccount(""); setFilterDate("");}}
                        style={{border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: '600'}}
                    >
                        Clear Filter
                    </button>
                )}
            </div>

            {/* TYPE FILTER GROUP */}
            <div>
                <button style={styles.filterBtn(filterType === "ALL")} onClick={() => setFilterType("ALL")}>All</button>
                <button style={styles.filterBtn(filterType === "IN")} onClick={() => setFilterType("IN")}>Cash In</button>
                <button style={styles.filterBtn(filterType === "OUT")} onClick={() => setFilterType("OUT")}>Cash Out</button>
            </div>
        </div>

        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Log ID</th>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Customer / Account</th>
                    <th style={styles.th}>Description</th>
                    <th style={{...styles.th, textAlign: 'right'}}>Amount</th>
                </tr>
            </thead>
            <tbody>
                {getFilteredLogs().length > 0 ? (
                    getFilteredLogs().map(log => (
                        <tr key={log.id}>
                            <td style={{...styles.td, fontFamily: 'monospace', fontSize: '13px'}}>{log.id}</td>
                            <td style={styles.td}>{log.time}</td>
                            <td style={styles.td}>
                                <span style={styles.typeBadge(log.type)}>
                                    {log.type === "CASH_IN" ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}
                                    {log.type === "CASH_IN" ? "Deposit" : "Withdraw"}
                                </span>
                            </td>
                            <td style={styles.td}>
                                <div style={{fontWeight: '600'}}>{log.customer}</div>
                                <div style={{fontSize: '12px', color: '#94a3b8'}}>{log.account}</div>
                            </td>
                            <td style={{...styles.td, maxWidth: '200px'}}>{log.description}</td>
                            <td style={{...styles.td, textAlign: 'right', ...styles.amount(log.type)}}>
                                {log.type === "CASH_IN" ? "+" : "-"}{formatCurrency(log.amount)}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} style={{padding: '60px', textAlign: 'center', color: '#94a3b8'}}>
                            <div style={{marginBottom: '10px', fontSize: '24px'}}><FiFilter/></div>
                            No matching transactions found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaultRegistry;