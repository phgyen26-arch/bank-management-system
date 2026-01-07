import React, { useState, useMemo } from "react";
import { FiSearch, FiCheckCircle, FiXCircle, FiFilter, FiBriefcase } from "react-icons/fi";
import { mockData } from "../../mockdata";

const TellerLoanApproval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, PENDING, ACTIVE, CLOSED, REJECTED
  
  // State quản lý danh sách (để giả lập việc Approve/Reject thay đổi UI ngay lập tức)
  const [loans, setLoans] = useState(mockData.loans);

  // --- MERGE DATA ---
  // Ghép thông tin Khách hàng vào từng khoản vay để hiển thị tên
  const enrichedLoans = useMemo(() => {
    return loans.map(loan => {
      const customer = mockData.customers.find(c => c.customer_id === loan.customer_id);
      return {
        ...loan,
        customerName: customer ? customer.full_name : "Unknown",
        customerIdCard: customer ? customer.id_card : "N/A"
      };
    });
  }, [loans]);

  // --- FILTER ---
  const filteredLoans = enrichedLoans.filter(loan => {
    const matchSearch = 
      loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customerIdCard.includes(searchTerm) ||
      loan.loan_id.toString().includes(searchTerm);
    
    if (statusFilter === "ALL") return matchSearch;
    return matchSearch && loan.status === statusFilter;
  });

  // --- ACTIONS ---
  const handleUpdateStatus = (id, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this loan application?`)) {
      setLoans(prev => prev.map(loan => 
        loan.loan_id === id ? { ...loan, status: newStatus } : loan
      ));
      alert(`Loan #${id} has been ${newStatus}.`);
    }
  };

  // Helper: Màu status
  const getStatusBadge = (status) => {
    const s = status.toUpperCase();
    if (s === 'ACTIVE') return { bg: '#dcfce7', color: '#166534' };
    if (s === 'PENDING') return { bg: '#fef9c3', color: '#854d0e' };
    if (s === 'CLOSED') return { bg: '#e5e7eb', color: '#374151' };
    if (s === 'REJECTED') return { bg: '#fee2e2', color: '#991b1b' };
    return { bg: '#f3f4f6', color: '#1f2937' };
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiBriefcase /></div>
        <div>
          <div style={styles.headerTitle}>Loan Approval & Status</div>
          <div style={styles.headerSub}>Manage loan applications and active contracts</div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <FiSearch style={styles.searchIcon} />
          <input 
            style={styles.input} 
            placeholder="Search by Name, ID, Loan ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={styles.filterGroup}>
          <FiFilter style={{color: '#6b7280'}} />
          {['ALL', 'PENDING', 'ACTIVE', 'CLOSED', 'REJECTED'].map(status => (
            <button
              key={status}
              style={statusFilter === status ? styles.filterBtnActive : styles.filterBtn}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Principal</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Interest</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? filteredLoans.map(loan => {
              const badgeStyle = getStatusBadge(loan.status);
              return (
                <tr key={loan.loan_id} style={styles.tr}>
                  <td style={styles.td}>#{loan.loan_id}</td>
                  <td style={styles.td}>
                    <div style={{fontWeight: 600, color: '#374151'}}>{loan.customerName}</div>
                    <div style={{fontSize: 12, color: '#6b7280'}}>{loan.customerIdCard}</div>
                  </td>
                  <td style={styles.td}>{loan.loan_type}</td>
                  <td style={{...styles.td, fontWeight: 700}}>
                    {loan.principal_amount.toLocaleString()} VND
                  </td>
                  <td style={styles.td}>{loan.duration_months} months</td>
                  <td style={styles.td}>{loan.interest_rate}%</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      backgroundColor: badgeStyle.bg, color: badgeStyle.color
                    }}>
                      {loan.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {loan.status === 'PENDING' ? (
                      <div style={{display: 'flex', gap: 8}}>
                        <button 
                          style={styles.btnApprove} 
                          onClick={() => handleUpdateStatus(loan.loan_id, 'ACTIVE')}
                          title="Approve"
                        ><FiCheckCircle /></button>
                        <button 
                          style={styles.btnReject} 
                          onClick={() => handleUpdateStatus(loan.loan_id, 'REJECTED')}
                          title="Reject"
                        ><FiXCircle /></button>
                      </div>
                    ) : (
                      <span style={{color: '#9ca3af', fontSize: 12}}>No actions</span>
                    )}
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="8" style={{padding: 30, textAlign: 'center', color: '#9ca3af'}}>No loans found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { height: "100%", padding: "30px", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column' },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 24 },
  headerIcon: { width: 48, height: 48, borderRadius: 12, background: "#0f172a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#0f172a" },
  headerSub: { fontSize: 14, color: "#64748b" },
  
  toolbar: { display: 'flex', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 15 },
  searchBox: { position: 'relative', width: 300 },
  searchIcon: { position: 'absolute', left: 12, top: 12, color: '#9ca3af' },
  input: { width: '100%', padding: '10px 10px 10px 36px', borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none' },
  
  filterGroup: { display: 'flex', gap: 8, alignItems: 'center' },
  filterBtn: { padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: 13, color: '#64748b' },
  filterBtnActive: { padding: '8px 16px', borderRadius: 6, border: '1px solid #0f172a', background: '#0f172a', cursor: 'pointer', fontSize: 13, color: 'white', fontWeight: 600 },

  tableWrapper: { flex: 1, overflow: 'auto', background: 'white', borderRadius: 16, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 800 },
  th: { padding: '16px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', fontSize: 13, fontWeight: 600, position: 'sticky', top: 0 },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '16px', fontSize: 14, color: '#334155' },

  btnApprove: { width: 32, height: 32, borderRadius: 6, border: 'none', background: '#dcfce7', color: '#16a34a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  btnReject: { width: 32, height: 32, borderRadius: 6, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

export default TellerLoanApproval;