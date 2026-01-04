import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { mockData } from "../../mockdata";
import {
  FiDownload,
  FiCalendar,
  FiFilter,
  FiArrowDownLeft,
  FiArrowUpRight,
  FiPrinter,
} from "react-icons/fi";

const ViewAccountStatement = () => {
  const { user } = useAuth();

  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  /* ================= CUSTOMER & ACCOUNT ================= */
  const customer = mockData.customers.find(
    (c) => c.user_id === user?.user_id
  );

  const account = customer
    ? mockData.accounts.find((a) => a.customer_id === customer.customer_id)
    : null;

  /* ================= DATE RANGE CONFIG ================= */
  const rangeConfig = {
    "Last 7 Days": 7,
    "Last 30 Days": 30,
    "Last 90 Days": 90,
    "All Time": null,
  };

  /* ================= TRANSACTIONS ================= */
  const transactions = useMemo(() => {
    if (!account) return [];

    let data = mockData.transactions.filter(
      (t) =>
        t.sender_account_id === account.account_id ||
        t.receiver_account_id === account.account_id
    );

    const days = rangeConfig[dateRange];
    if (days) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      data = data.filter(
        (t) => new Date(t.transaction_time) >= cutoff
      );
    }

    if (typeFilter === "CREDIT") {
      data = data.filter(
        (t) => t.receiver_account_id === account.account_id
      );
    }

    if (typeFilter === "DEBIT") {
      data = data.filter(
        (t) => t.sender_account_id === account.account_id
      );
    }

    return data.sort(
      (a, b) =>
        new Date(b.transaction_time) - new Date(a.transaction_time)
    );
  }, [account, dateRange, typeFilter]);

  /* ================= TOTAL ================= */
  const totalIn = transactions
    .filter((t) => t.receiver_account_id === account?.account_id)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter((t) => t.sender_account_id === account?.account_id)
    .reduce((sum, t) => sum + t.amount, 0);

  /* ================= EXPORT CSV ================= */
  const handleExport = () => {
    const rows = [
      ["Date", "Description", "Type", "Amount"],
      ...transactions.map((t) => [
        t.transaction_time.slice(0, 10),
        getDescription(t),
        t.transaction_type,
        t.amount,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "account_statement.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ================= HELPERS ================= */
  const formatCurrency = (val) =>
  `${Number(val).toLocaleString("en-US")} Đ`;

  const formatDate = (d) => d.replace("T", " ").slice(0, 10);

  const getDescription = (t) =>
    t.receiver_account_id === account.account_id
      ? "Incoming Transaction"
      : "Outgoing Transaction";

  if (!account) return <div>Loading account data...</div>;

  /* ================= STYLES (GIỮ NGUYÊN) ================= */
  const styles = {
    pageWrapper: { height: "100%", overflowY: "auto" },
    container: {
      padding: "30px",
      fontFamily: "'Inter', sans-serif",
      color: "#2d3436",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    title: { fontSize: "28px", fontWeight: "800", margin: 0 },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    summaryCard: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      border: "1px solid #f0f2f5",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    toolbar: { display: "flex", gap: "15px", marginBottom: "20px" },
    btnAction: {
      padding: "10px 20px",
      borderRadius: "10px",
      border: "1px solid #dfe6e9",
      backgroundColor: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontWeight: "600",
      fontSize: "14px",
    },
    btnPrimary: { backgroundColor: "#6c5ce7", color: "white", border: "none" },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
      border: "1px solid #f0f2f5",
      marginBottom: "50px",
    },
    tableHeader: {
      display: "grid",
      gridTemplateColumns: "1.5fr 3fr 1.5fr 1.5fr",
      padding: "15px 25px",
      backgroundColor: "#f8f9fa",
      fontWeight: "700",
      fontSize: "13px",
      color: "#636e72",
      textTransform: "uppercase",
    },
    tableRow: {
      display: "grid",
      gridTemplateColumns: "1.5fr 3fr 1.5fr 1.5fr",
      padding: "20px 25px",
      borderBottom: "1px solid #f1f2f6",
      alignItems: "center",
    },
  };

  const dropdownStyle = {
    position: "absolute",
    top: "45px",
    left: 0,
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    border: "1px solid #eee",
    overflow: "hidden",
    zIndex: 20,
    minWidth: "180px",
  };

  const dropdownItem = {
    padding: "12px 16px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Account Statement</h2>
            <p style={{ color: "#636e72" }}>
              Account: <strong>{account.account_number}</strong>
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", fontWeight: "700" }}>
              CURRENT BALANCE
            </div>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c5ce7" }}>
              {formatCurrency(account.balance)}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <div style={{ display: "flex", gap: "10px", color: "#00b894" }}>
              <FiArrowDownLeft /> TOTAL CREDIT
            </div>
            <div style={{ fontSize: "20px", fontWeight: "800" }}>
              + {formatCurrency(totalIn)}
            </div>
          </div>

          <div style={styles.summaryCard}>
            <div style={{ display: "flex", gap: "10px", color: "#ff7675" }}>
              <FiArrowUpRight /> TOTAL DEBIT
            </div>
            <div style={{ fontSize: "20px", fontWeight: "800" }}>
              - {formatCurrency(totalOut)}
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div style={styles.toolbar}>
          <div style={{ position: "relative" }}>
            <button
              style={styles.btnAction}
              onClick={() => {
                setShowDateMenu(!showDateMenu);
                setShowTypeMenu(false);
              }}
            >
              <FiCalendar /> {dateRange}
            </button>

            {showDateMenu && (
              <div style={dropdownStyle}>
                {Object.keys(rangeConfig).map((r) => (
                  <div
                    key={r}
                    style={dropdownItem}
                    onClick={() => {
                      setDateRange(r);
                      setShowDateMenu(false);
                    }}
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button
              style={styles.btnAction}
              onClick={() => {
                setShowTypeMenu(!showTypeMenu);
                setShowDateMenu(false);
              }}
            >
              <FiFilter />{" "}
              {typeFilter === "ALL"
                ? "All Transactions"
                : typeFilter === "CREDIT"
                ? "Credit Only"
                : "Debit Only"}
            </button>

            {showTypeMenu && (
              <div style={dropdownStyle}>
                {[
                  { label: "All Transactions", value: "ALL" },
                  { label: "Credit Only", value: "CREDIT" },
                  { label: "Debit Only", value: "DEBIT" },
                ].map((o) => (
                  <div
                    key={o.value}
                    style={dropdownItem}
                    onClick={() => {
                      setTypeFilter(o.value);
                      setShowTypeMenu(false);
                    }}
                  >
                    {o.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: 1 }} />

          <button style={styles.btnAction} onClick={() => window.print()}>
            <FiPrinter /> Print
          </button>

          <button
            style={{ ...styles.btnAction, ...styles.btnPrimary }}
            onClick={handleExport}
          >
            <FiDownload /> Export CSV
          </button>
        </div>

        {/* TABLE */}
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <div>Date</div>
            <div>Description</div>
            <div>Reference</div>
            <div style={{ textAlign: "right" }}>Amount</div>
          </div>

          {transactions.map((t) => {
            const isIn = t.receiver_account_id === account.account_id;
            return (
              <div key={t.transaction_id} style={styles.tableRow}>
                <div>{formatDate(t.transaction_time)}</div>
                <div>
                  <strong>{getDescription(t)}</strong>
                  <div style={{ fontSize: "12px", color: "#b2bec3" }}>
                    {t.transaction_type}
                  </div>
                </div>
                <div style={{ fontFamily: "monospace" }}>
                  #{t.transaction_id}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: "700",
                    color: isIn ? "#00b894" : "#ff7675",
                  }}
                >
                  {isIn ? "+" : "-"} {formatCurrency(t.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewAccountStatement;
