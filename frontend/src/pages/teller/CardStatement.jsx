import React, { useState, useMemo } from "react";
import { FiSearch, FiFileText, FiFilter, FiArrowDownLeft, FiArrowUpRight, FiClock, FiCalendar, FiRefreshCw } from "react-icons/fi";
import { mockData } from "../../mockdata";

const CardStatement = () => {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Filter States
  const [filterType, setFilterType] = useState("ALL"); // ALL, DEPOSIT, WITHDRAW
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- LOGIC MERGE DATA ---
  const fullList = useMemo(() => {
    return mockData.customers.map(cus => {
      const acc = mockData.accounts.find(a => a.customer_id === cus.customer_id);
      return {
        ...cus,
        accountId: acc ? acc.account_id : null,
        accountNumber: acc ? acc.account_number : "No Account",
        balance: acc ? acc.balance : 0,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cus.full_name)}&background=random&color=fff`
      };
    });
  }, []);

  // Filter customers list
  const filteredCustomers = fullList.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id_card.includes(searchTerm) ||
    item.accountNumber.includes(searchTerm)
  );

  // --- LOGIC FETCH & FILTER TRANSACTIONS ---
  const customerTransactions = useMemo(() => {
    if (!selectedCustomer || !selectedCustomer.accountId) return [];

    // 1. Get all transactions for this customer
    let txs = mockData.transactions.filter(tx => 
      tx.sender_account_id === selectedCustomer.accountId || 
      tx.receiver_account_id === selectedCustomer.accountId
    );

    // 2. Filter by Date Range
    if (startDate) {
        const start = new Date(startDate).setHours(0,0,0,0);
        txs = txs.filter(tx => new Date(tx.transaction_time).setHours(0,0,0,0) >= start);
    }
    if (endDate) {
        const end = new Date(endDate).setHours(23,59,59,999);
        txs = txs.filter(tx => new Date(tx.transaction_time) <= end);
    }

    // 3. Filter by Type
    if (filterType !== "ALL") {
        if (filterType === "DEPOSIT") {
            txs = txs.filter(tx => tx.transaction_type === "DEPOSIT");
        } else if (filterType === "WITHDRAW") {
            txs = txs.filter(tx => tx.transaction_type === "WITHDRAW");
        }
    }

    // 4. Sort by latest
    return txs.sort((a, b) => new Date(b.transaction_time) - new Date(a.transaction_time));
  }, [selectedCustomer, startDate, endDate, filterType]);

  // --- HANDLERS ---
  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    // Reset filters
    setFilterType("ALL");
    setStartDate("");
    setEndDate("");
  };

  const resetFilters = () => {
      setFilterType("ALL");
      setStartDate("");
      setEndDate("");
  };

  // Helper: Format Currency
  const formatCurrency = (amount) => amount.toLocaleString() + " VND";
  
  // Helper: Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US');
  };

  // Helper: Determine Color, Sign, and Label
  const getTxStyle = (tx, currentAccountId) => {
    const isIncoming = tx.receiver_account_id === currentAccountId;
    
    if (tx.transaction_type === "DEPOSIT") {
        return { color: "#16a34a", icon: <FiArrowDownLeft />, sign: "+", label: "Deposit" };
    }
    if (tx.transaction_type === "WITHDRAW") {
        return { color: "#dc2626", icon: <FiArrowUpRight />, sign: "-", label: "Withdrawal" };
    }
    if (isIncoming) {
        return { color: "#2563eb", icon: <FiArrowDownLeft />, sign: "+", label: "Received" };
    }
    return { color: "#ea580c", icon: <FiArrowUpRight />, sign: "-", label: "Transfer Out" };
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerIcon}><FiFileText /></div>
        <div>
          <div style={styles.headerTitle}>Card & Account Statement</div>
          <div style={styles.headerSub}>View transaction history and details</div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        
        {/* --- LEFT COLUMN: SEARCH --- */}
        <div style={styles.leftPanel}>
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Search customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.listHeader}>Customers ({filteredCustomers.length})</div>

          <div style={styles.scrollList}>
            {filteredCustomers.map((item) => (
              <div 
                key={item.customer_id} 
                style={{
                  ...styles.userItem,
                  backgroundColor: selectedCustomer?.customer_id === item.customer_id ? '#f3f4f6' : 'transparent',
                  borderLeft: selectedCustomer?.customer_id === item.customer_id ? '4px solid #4b5563' : '4px solid transparent'
                }}
                onClick={() => handleSelect(item)}
              >
                <img src={item.avatarUrl} alt="" style={styles.avatarSmall} />
                <div>
                  <div style={styles.itemName}>{item.full_name}</div>
                  <div style={styles.itemSub}>{item.accountNumber}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: TRANSACTION HISTORY --- */}
        <div style={styles.rightPanel}>
          {selectedCustomer ? (
            <>
              {/* Customer Info */}
              <div style={styles.customerInfoBar}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                     <img src={selectedCustomer.avatarUrl} alt="" style={styles.avatarMedium} />
                     <div>
                        <div style={styles.infoName}>{selectedCustomer.full_name}</div>
                        <div style={styles.infoSub}>Acc No: {selectedCustomer.accountNumber}</div>
                     </div>
                  </div>
                  <div style={styles.balanceBox}>
                      <div style={{fontSize: 12, color: '#6b7280'}}>Current Balance</div>
                      <div style={{fontSize: 18, fontWeight: 700, color: '#111827'}}>
                          {formatCurrency(selectedCustomer.balance)}
                      </div>
                  </div>
              </div>

              {/* FILTER BAR (Category & Date) */}
              <div style={styles.filterBar}>
                  <div style={styles.filterLeft}>
                      {/* Type Filter */}
                      <div style={styles.filterLabel}><FiFilter /> Type:</div>
                      <div style={styles.filterGroup}>
                          <button 
                            style={filterType === "ALL" ? styles.filterBtnActive : styles.filterBtn}
                            onClick={() => setFilterType("ALL")}
                          >All</button>
                          <button 
                            style={filterType === "DEPOSIT" ? styles.filterBtnActive : styles.filterBtn}
                            onClick={() => setFilterType("DEPOSIT")}
                          >Deposit</button>
                          <button 
                            style={filterType === "WITHDRAW" ? styles.filterBtnActive : styles.filterBtn}
                            onClick={() => setFilterType("WITHDRAW")}
                          >Withdrawal</button>
                      </div>
                  </div>

                  <div style={styles.filterRight}>
                      {/* Date Filter */}
                      <div style={styles.filterLabel}><FiCalendar /> Date:</div>
                      <input 
                        type="date" 
                        style={styles.dateInput} 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <span style={{color: '#9ca3af'}}>-</span>
                      <input 
                        type="date" 
                        style={styles.dateInput}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      
                      {/* Reset Button */}
                      <button style={styles.resetBtn} onClick={resetFilters} title="Reset Filters">
                          <FiRefreshCw />
                      </button>
                  </div>
              </div>

              {/* Transactions Table */}
              <div style={styles.tableWrapper}>
                {customerTransactions.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Date/Time</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Description</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerTransactions.map(tx => {
                                const style = getTxStyle(tx, selectedCustomer.accountId);
                                return (
                                    <tr key={tx.transaction_id} style={styles.tr}>
                                        <td style={styles.td}>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                                                <FiClock size={12} color="#9ca3af"/> 
                                                {formatDate(tx.transaction_time)}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.badge, 
                                                color: style.color, 
                                                borderColor: style.color,
                                                backgroundColor: `${style.color}10`
                                            }}>
                                                {style.icon} {style.label}
                                            </span>
                                        </td>
                                        <td style={{...styles.td, fontWeight: 700, color: style.color}}>
                                            {style.sign} {formatCurrency(tx.amount)}
                                        </td>
                                        <td style={styles.td}>{tx.description}</td>
                                        <td style={styles.td}>
                                            <span style={styles.statusSuccess}>Success</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div style={styles.emptyTable}>No transactions found for this period.</div>
                )}
              </div>
            </>
          ) : (
            <div style={styles.placeholderRight}>
              <div style={styles.placeholderIcon}><FiFileText /></div>
              <p>Select a customer to view statement</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  wrapper: {
    height: "100%", padding: "30px", background: "#f3f4f6",
    fontFamily: "'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column',
  },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  headerIcon: {
    width: 48, height: 48, borderRadius: 12,
    background: "#374151", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: 700, color: "#111827" },
  headerSub: { fontSize: 14, color: "#4b5563" },

  gridContainer: { display: 'flex', gap: 24, flex: 1, minHeight: 0, overflow: 'hidden' },

  // LEFT PANEL
  leftPanel: {
    flex: '0 0 320px', background: '#fff', borderRadius: 16, 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
  },
  searchBox: { padding: '20px 20px 10px 20px', display: 'flex', alignItems: 'center', position: 'relative' },
  searchIcon: { position: 'absolute', left: 35, color: '#9ca3af' },
  searchInput: {
    width: '100%', padding: '12px 12px 12px 40px', borderRadius: 10,
    border: '1px solid #e5e7eb', outline: 'none', background: '#f9fafb', fontSize: 14
  },
  listHeader: { padding: '0 20px 10px 20px', fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' },
  scrollList: { flex: 1, overflowY: 'auto', padding: '0 10px 10px 10px' },
  userItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px',
    borderRadius: 8, cursor: 'pointer', transition: '0.2s', marginBottom: 4
  },
  avatarSmall: { width: 40, height: 40, borderRadius: '50%' },
  itemName: { fontSize: 15, fontWeight: 600, color: '#374151' },
  itemSub: { fontSize: 13, color: '#6b7280' },

  // RIGHT PANEL
  rightPanel: {
    flex: 1, background: '#fff', borderRadius: 16, padding: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
  },
  customerInfoBar: {
      padding: '20px 30px', borderBottom: '1px solid #e5e7eb', 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  avatarMedium: { width: 50, height: 50, borderRadius: '50%' },
  infoName: { fontSize: 18, fontWeight: 700, color: '#111827' },
  infoSub: { fontSize: 14, color: '#6b7280' },
  balanceBox: { textAlign: 'right' },
  
  // Filter Bar Styles
  filterBar: {
      padding: '15px 30px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15
  },
  filterLeft: { display: 'flex', alignItems: 'center', gap: 15 },
  filterRight: { display: 'flex', alignItems: 'center', gap: 10 },
  
  filterLabel: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#374151' },
  filterGroup: { display: 'flex', gap: 8 },
  filterBtn: {
      padding: '6px 14px', borderRadius: 20, border: '1px solid #d1d5db', 
      background: '#fff', color: '#4b5563', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: '0.2s'
  },
  filterBtnActive: {
      padding: '6px 14px', borderRadius: 20, border: '1px solid #1f2937', 
      background: '#1f2937', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: '0.2s'
  },
  dateInput: {
      padding: '6px 10px', borderRadius: 8, border: '1px solid #d1d5db',
      fontSize: 13, outline: 'none', background: '#fff', color: '#374151'
  },
  resetBtn: {
      padding: '8px', borderRadius: '50%', border: 'none', background: '#e5e7eb',
      color: '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },

  tableWrapper: { 
      flex: 1, overflow: 'auto' 
  },
  table: { 
      width: '100%', borderCollapse: 'collapse', minWidth: '600px'
  },
  th: {
      position: 'sticky', top: 0, background: '#fff', zIndex: 1,
      textAlign: 'left', padding: '15px 30px', fontSize: 13, 
      fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb',
      whiteSpace: 'nowrap'
  },
  tr: { borderBottom: '1px solid #f3f4f6' },
  td: { 
      padding: '15px 30px', fontSize: 14, color: '#374151',
      whiteSpace: 'nowrap'
  },
  
  badge: {
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
      border: '1px solid transparent', whiteSpace: 'nowrap'
  },
  statusSuccess: {
      padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
      background: '#dcfce7', color: '#166534', whiteSpace: 'nowrap'
  },
  emptyTable: { textAlign: 'center', padding: 50, color: '#9ca3af' },

  placeholderRight: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'
  },
  placeholderIcon: { fontSize: 60, marginBottom: 16, color: '#e5e7eb' }
};

export default CardStatement;