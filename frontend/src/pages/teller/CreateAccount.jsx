import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockData } from '../../mockdata'; 

const CreateAccount = () => {
  // --- 1. QUẢN LÝ TAB BẰNG URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'open';

  const switchTab = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  // --- 2. STATE ---
  // State cho Form tạo mới
  const [formData, setFormData] = useState({
    fullName: '', dob: '', idCard: '', phone: '', email: '',
    address: '', initialDeposit: '', currency: 'VND', accountType: 'Premium Savings'
  });

  // State cho Search
  const [searchTerm, setSearchTerm] = useState('');

  // --- NEW: STATE CHO MODAL EDIT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Xử lý thay đổi input form tạo mới
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi input trong Modal Edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer(prev => ({ ...prev, [name]: value }));
  };

  // Mở modal và nạp dữ liệu khách hàng vào
  const handleOpenEditModal = (customerData) => {
    setEditingCustomer(customerData);
    setIsModalOpen(true);
  };

  // Lưu thay đổi (Giả lập)
  const handleSaveEdit = () => {
    alert(`Updated info for: ${editingCustomer.full_name}\nPhone: ${editingCustomer.phone}`);
    setIsModalOpen(false);
  };

  // --- 3. STYLES ---
  const styles = {
    wrapper: {
      marginLeft: '10px',
      height: '100vh',
      overflowY: 'auto',
      backgroundColor: '#f9fafb',
      padding: '40px',
      boxSizing: 'border-box',
      fontFamily: "'Inter', sans-serif",
    },
    container: { maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' },
    
    // Tabs
    tabContainer: { display: 'flex', gap: '40px', borderBottom: '2px solid #e5e7eb', marginBottom: '32px' },
    tabButton: (isActive) => ({
      padding: '16px 0', background: 'none', border: 'none',
      borderBottom: isActive ? '3px solid #003366' : '3px solid transparent',
      color: isActive ? '#003366' : '#9ca3af', fontWeight: isActive ? '700' : '500',
      cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease',
    }),

    // Card & Header
    card: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' },
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' },
    sectionTitle: { fontSize: '22px', fontWeight: '800', color: '#111827', margin: 0 },
    badge: { backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' },

    // Inputs & Grid
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '28px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '13px', fontWeight: '600', color: '#4b5563', marginLeft: '2px' },
    input: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', transition: 'all 0.2s ease', color: '#1f2937', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box' },
    
    // Buttons
    buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #f3f4f6' },
    btnSecondary: { padding: '12px 24px', backgroundColor: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
    btnPrimary: { padding: '12px 32px', backgroundColor: '#003366', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(0, 51, 102, 0.2)' },

    // Table
    tableContainer: { marginTop: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
    th: { backgroundColor: '#f9fafb', padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#4b5563', borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px 16px', borderBottom: '1px solid #f3f4f6', color: '#1f2937' },
    actionBtn: { padding: '6px 12px', fontSize: '12px', borderRadius: '4px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', color: '#003366', fontWeight: '600' },

    // --- MODAL STYLES (NEW) ---
    modalOverlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      backdropFilter: 'blur(2px)' // Hiệu ứng mờ nền
    },
    modalContent: {
      backgroundColor: '#fff', borderRadius: '16px', width: '800px', maxWidth: '95%',
      maxHeight: '90vh', overflowY: 'auto', padding: '32px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)', animation: 'fadeIn 0.2s ease-out'
    },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #eee' },
    closeBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }
  };

  // --- 4. RENDER FORMS ---
  
  const renderOpenAccountForm = () => (
    <div className="animate-fade-in">
      <div style={styles.headerRow}>
        <h2 style={styles.sectionTitle}>Customer Enrollment</h2>
        <span style={styles.badge}>AML/KYC Verified</span>
      </div>
      <div style={styles.formGrid}>
        <div style={styles.formGroup}><label style={styles.label}>Full Legal Name</label><input style={styles.input} name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ex: Nguyen Van An" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Date of Birth</label><input type="date" style={styles.input} name="dob" value={formData.dob} onChange={handleChange} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Identity Document</label><input style={styles.input} name="idCard" value={formData.idCard} onChange={handleChange} placeholder="ID Number" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Phone Number</label><input style={styles.input} name="phone" value={formData.phone} onChange={handleChange} placeholder="09xxx..." /></div>
        <div style={styles.formGroup}><label style={styles.label}>Email Address</label><input type="email" style={styles.input} name="email" value={formData.email} onChange={handleChange} placeholder="customer@example.com" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Account Category</label><select style={styles.input} name="accountType" value={formData.accountType} onChange={handleChange}><option>Premium Savings</option><option>Standard Checking</option></select></div>
        <div style={styles.formGroup}><label style={styles.label}>Initial Deposit</label><input type="number" style={styles.input} name="initialDeposit" value={formData.initialDeposit} onChange={handleChange} placeholder="50,000,000" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Currency</label><select style={styles.input} name="currency" value={formData.currency} onChange={handleChange}><option value="VND">VND</option><option value="USD">USD</option></select></div>
      </div>
      <div style={{ ...styles.formGroup, marginBottom: '24px' }}><label style={styles.label}>Residential Address</label><textarea rows="3" style={{ ...styles.input, resize: 'vertical' }} name="address" value={formData.address} onChange={handleChange} placeholder="Address..." ></textarea></div>
      <div style={styles.buttonGroup}>
        <button style={styles.btnSecondary}>Save Draft</button>
        <button style={styles.btnPrimary} onClick={() => alert("Creating Account...")}>Authorize & Create</button>
      </div>
    </div>
  );

  const renderUpdateForm = () => {
    // Merge Account + Customer Data
    const tableData = mockData.accounts.map(acc => {
        const customer = mockData.customers.find(c => c.customer_id === acc.customer_id);
        return {
            ...acc,
            full_name: customer?.full_name || '',
            id_card: customer?.id_card || '',
            phone: customer?.phone || '',
            email: customer?.email || '',
            address: customer?.address || '',
            date_of_birth: customer?.date_of_birth || ''
        };
    });

    const filteredData = tableData.filter(item => 
        item.account_number.includes(searchTerm) ||
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id_card.includes(searchTerm)
    );

    return (
        <div className="animate-fade-in">
            <div style={styles.headerRow}>
                <h2 style={styles.sectionTitle}>Update Customer Info</h2>
                <span style={{...styles.badge, backgroundColor: '#fef3c7', color: '#d97706'}}>Requires Approval</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input 
                    style={styles.input} 
                    placeholder="Search by Name, Account Number, or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button style={styles.btnPrimary}>Search</button>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Account No.</th>
                            <th style={styles.th}>Full Name</th>
                            <th style={styles.th}>ID Card</th>
                            <th style={styles.th}>Balance</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.account_id}>
                                    <td style={styles.td}><b>{item.account_number}</b></td>
                                    <td style={styles.td}>{item.full_name}</td>
                                    <td style={styles.td}>{item.id_card}</td>
                                    <td style={{...styles.td, color: '#059669', fontWeight: 'bold'}}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: item.currency }).format(item.balance)}
                                    </td>
                                    <td style={{...styles.td, textAlign: 'right'}}>
                                        {/* NÚT EDIT GỌI MODAL */}
                                        <button 
                                            style={styles.actionBtn}
                                            onClick={() => handleOpenEditModal(item)}
                                        >
                                            Edit Info
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{...styles.td, textAlign: 'center', padding: '30px', color: '#666'}}>
                                    No accounts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  const renderLockForm = () => (
    <div className="animate-fade-in">
      <div style={styles.headerRow}>
        <h2 style={{...styles.sectionTitle, color: '#dc2626'}}>Lock Account</h2>
        <span style={{...styles.badge, backgroundColor: '#fee2e2', color: '#dc2626'}}>Urgent</span>
      </div>
      <div style={{ marginBottom: '20px' }}>
          <label style={styles.label}>Target Account</label>
          <input style={{...styles.input, marginTop: '8px'}} placeholder="Enter Account Number..." />
      </div>
      <div style={styles.formGroup}>
          <label style={styles.label}>Reason for Suspension</label>
          <textarea rows="4" style={{...styles.input, resize: 'vertical'}} placeholder="Reason details..."></textarea>
      </div>
      <div style={styles.buttonGroup}>
        <button style={{...styles.btnPrimary, backgroundColor: '#dc2626'}}>LOCK ACCOUNT</button>
      </div>
    </div>
  );

  // --- 5. RENDER MODAL EDIT ---
  const renderEditModal = () => {
    if (!editingCustomer) return null;

    return (
      <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
        {/* Click vào overlay để đóng, click vào content không đóng */}
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          
          <div style={styles.modalHeader}>
            <h3 style={{ margin: 0, color: '#003366' }}>Edit Customer & Account</h3>
            <button style={styles.closeBtn} onClick={() => setIsModalOpen(false)}>&times;</button>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Legal Name</label>
              <input style={styles.input} name="full_name" value={editingCustomer.full_name} onChange={handleEditChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input type="date" style={styles.input} name="date_of_birth" value={editingCustomer.date_of_birth} onChange={handleEditChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>ID Card</label>
              <input style={styles.input} name="id_card" value={editingCustomer.id_card} onChange={handleEditChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} name="phone" value={editingCustomer.phone} onChange={handleEditChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} name="email" value={editingCustomer.email} onChange={handleEditChange} />
            </div>
             {/* Account Number (Read-only thường không sửa được) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Account Number (Read-only)</label>
              <input style={{...styles.input, backgroundColor: '#f3f4f6'}} value={editingCustomer.account_number} disabled />
            </div>
             {/* Balance (Read-only) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Balance (Read-only)</label>
              <input style={{...styles.input, backgroundColor: '#f3f4f6'}} value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: editingCustomer.currency }).format(editingCustomer.balance)} disabled />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Currency</label>
              <select style={styles.input} name="currency" value={editingCustomer.currency} onChange={handleEditChange}>
                  <option value="VND">VND</option>
                  <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div style={{ ...styles.formGroup, marginBottom: '24px' }}>
            <label style={styles.label}>Address</label>
            <textarea rows="3" style={{ ...styles.input, resize: 'vertical' }} name="address" value={editingCustomer.address} onChange={handleEditChange}></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid #eee', paddingTop: '24px' }}>
            <button style={styles.btnSecondary} onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button style={styles.btnPrimary} onClick={handleSaveEdit}>Save Changes</button>
          </div>

        </div>
      </div>
    );
  };

  // --- MAIN RETURN ---
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.tabContainer}>
          <button style={styles.tabButton(activeTab === 'open')} onClick={() => switchTab('open')}>Open New Account</button>
          <button style={styles.tabButton(activeTab === 'update')} onClick={() => switchTab('update')}>Update Account</button>
          <button style={styles.tabButton(activeTab === 'lock')} onClick={() => switchTab('lock')}>Lock / Suspend</button>
        </div>
        
        <div style={styles.card}>
          {activeTab === 'open' && renderOpenAccountForm()}
          {activeTab === 'update' && renderUpdateForm()}
          {activeTab === 'lock' && renderLockForm()}
        </div>
      </div>

      {/* RENDER MODAL NẾU ĐANG MỞ */}
      {isModalOpen && renderEditModal()}
    </div>
  );
};

export default CreateAccount;