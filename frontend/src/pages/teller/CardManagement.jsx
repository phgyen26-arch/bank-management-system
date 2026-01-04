import React, { useState, useEffect } from "react";
// Đảm bảo đường dẫn import mockData đúng với cấu trúc thư mục của bạn
import { mockData } from "../../mockdata"; 

const CardManagement = () => {
  /* ================= INIT DATA TỪ MOCKDATA ================= */
  // Hàm tạo dữ liệu thẻ giả lập từ danh sách tài khoản có sẵn
  const generateCardsFromMock = () => {
    return mockData.accounts.map((acc) => {
      const customer = mockData.customers.find((c) => c.customer_id === acc.customer_id);
      return {
        id: `CARD-${acc.account_id}`, // Tạo ID thẻ dựa trên ID tài khoản
        customer: customer ? customer.full_name : "Unknown",
        cardNumber: `**** **** **** ${acc.account_number.slice(-4)}`, // Lấy 4 số cuối TK làm số thẻ
        type: acc.balance > 100000000 ? "Platinum Debit" : "Standard Debit", // Giả lập loại thẻ theo số dư
        status: "Active", // Mặc định là Active
        issueDate: acc.open_date,
      };
    });
  };

  const [cards, setCards] = useState([]);

  // Load dữ liệu khi component được mount
  useEffect(() => {
    const initialCards = generateCardsFromMock();
    setCards(initialCards);
  }, []);

  /* ================= HANDLERS ================= */
  const toggleLock = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, status: card.status === "Active" ? "Locked" : "Active" }
          : card
      )
    );
  };

  /* ================= STYLES ================= */
  const styles = {
    wrapper: {
      marginLeft: "10px", // 260px (Sidebar) + 10px (Khoảng cách)
      padding: "20px",     // Padding bên trong
      minHeight: "100vh",
      backgroundColor: "#f4f6fb",
      fontFamily: "'Inter', sans-serif",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "20px",
    },
    cardContainer: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      overflowX: "auto", // Để table không bị vỡ trên màn hình nhỏ
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    },
    th: {
      textAlign: "left",
      padding: "12px 16px",
      borderBottom: "2px solid #e2e8f0",
      color: "#64748b",
      fontWeight: "600",
    },
    td: {
      padding: "16px",
      borderBottom: "1px solid #f1f5f9",
      color: "#334155",
    },
    statusBadge: (status) => ({
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      backgroundColor: status === "Active" ? "#dcfce7" : "#fee2e2",
      color: status === "Active" ? "#166534" : "#991b1b",
    }),
    btn: (status) => ({
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s",
      backgroundColor: status === "Active" ? "#ef4444" : "#22c55e",
      color: "#fff",
      width: "80px",
    }),
  };

  /* ================= RENDER ================= */
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Card Management</h2>

      <div style={styles.cardContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Card ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Card Number</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Issue Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 ? (
              cards.map((card) => (
                <tr key={card.id}>
                  <td style={styles.td}>{card.id}</td>
                  <td style={{...styles.td, fontWeight: 'bold'}}>{card.customer}</td>
                  <td style={{...styles.td, fontFamily: 'monospace'}}>{card.cardNumber}</td>
                  <td style={styles.td}>{card.type}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(card.status)}>
                      {card.status}
                    </span>
                  </td>
                  <td style={styles.td}>{card.issueDate}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.btn(card.status)}
                      onClick={() => toggleLock(card.id)}
                    >
                      {card.status === "Active" ? "Lock" : "Unlock"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{...styles.td, textAlign: 'center'}}>Loading data from MockData...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardManagement;