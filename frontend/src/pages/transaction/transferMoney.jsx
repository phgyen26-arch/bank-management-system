import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../mockdata';
import { FiCreditCard, FiUser, FiCheckCircle, FiAlertCircle } from "react-icons/fi"; 
import '../../css/TransferMoney.css';

const TransferMoney = () => {
  const { user } = useAuth();

  // Source Account State
  const [myAccount, setMyAccount] = useState({
    accountNumber: '',
    balance: 0,
    ownerName: ''
  });

  // Form State
  const [formData, setFormData] = useState({
    recipientAccount: '',
    amount: '',
    message: ''
  });

  // Recipient Name State
  const [recipientName, setRecipientName] = useState('');
  
  // Notification State
  const [notification, setNotification] = useState({ type: '', message: '' });

  // 1. Fetch Source Account on Load
  useEffect(() => {
    if (user) {
      const customerInfo = mockData.customers.find(c => c.user_id === user.user_id);
      if (customerInfo) {
        const accountInfo = mockData.accounts.find(a => a.customer_id === customerInfo.customer_id);
        if (accountInfo) {
          setMyAccount({
            accountNumber: accountInfo.account_number,
            balance: accountInfo.balance,
            ownerName: customerInfo.full_name
          });
        }
      }
    }
  }, [user]);

  // 2. Handle Input Change & Auto-detect Name
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Auto-detect Beneficiary Name
    if (name === 'recipientAccount') {
        if (value.length >= 3) { 
            checkRecipientName(value);
        } else {
            setRecipientName(''); 
        }
    }
  };

  // Check Recipient in Mock Data
  const checkRecipientName = (accNumber) => {
      const targetAcc = mockData.accounts.find(acc => acc.account_number === accNumber);
      
      if (targetAcc) {
          const targetCustomer = mockData.customers.find(cus => cus.customer_id === targetAcc.customer_id);
          if (targetCustomer) {
              setRecipientName(targetCustomer.full_name);
          }
      } else {
          setRecipientName(''); 
      }
  };

  // 3. Handle Transfer Submit
  const handleTransfer = (e) => {
    e.preventDefault();
    const amountNumber = parseFloat(formData.amount);

    // Validation (Translated)
    if (!formData.recipientAccount || !formData.amount) {
      setNotification({ type: 'error', message: 'Please fill in all required fields!' });
      return;
    }
    if (formData.recipientAccount === myAccount.accountNumber) {
        setNotification({ type: 'error', message: 'Cannot transfer money to your own source account!' });
        return;
    }
    if (!recipientName) {
         setNotification({ type: 'error', message: 'Invalid or non-existent beneficiary account!' });
         return;
    }
    if (amountNumber <= 0) {
        setNotification({ type: 'error', message: 'Amount must be greater than 0!' });
        return;
    }
    if (amountNumber > myAccount.balance) {
      setNotification({ type: 'error', message: 'Insufficient balance to perform this transaction!' });
      return;
    }

    // Success Logic (Mock)
    const newBalance = myAccount.balance - amountNumber;
    setMyAccount(prev => ({ ...prev, balance: newBalance })); 

    setNotification({ type: 'success', message: 'Transaction successful!' });
    
    // Reset form
    setFormData({ recipientAccount: '', amount: '', message: '' });
    setRecipientName('');
    
    // Auto-hide notification
    setTimeout(() => setNotification({ type: '', message: '' }), 3000);
  };

  return (
    <div className="transfer-page-container">
      <div className="transfer-card">
        <h2 className="page-title">Internal Transfer</h2>

        {/* SOURCE ACCOUNT CARD */}
        <div className="source-account-card">
            <div className="card-bg-overlay"></div>
            <div className="card-content">
                <div className="card-label">Source Account</div>
                <div className="card-number">{myAccount.accountNumber || 'Loading...'}</div>
                <div className="card-balance">
                    {myAccount.balance.toLocaleString('vi-VN')} <span className="currency">VND</span>
                </div>
                <div className="card-owner">{myAccount.ownerName}</div>
                <FiCreditCard className="card-icon-bg" />
            </div>
        </div>

        {/* NOTIFICATION */}
        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleTransfer} className="transfer-form">
          
          {/* Beneficiary Account */}
          <div className="form-group">
            <label>Beneficiary Account</label>
            <div className="input-with-icon">
                <input
                type="text"
                name="recipientAccount"
                value={formData.recipientAccount}
                onChange={handleChange}
                placeholder="Enter account number..."
                autoComplete="off"
                className={recipientName ? 'input-valid' : ''}
                />
                <FiUser className="input-icon" />
            </div>
            {/* Display Beneficiary Name */}
            <div className={`recipient-name-display ${recipientName ? 'show' : ''}`}>
                {recipientName ? `Beneficiary: ${recipientName.toUpperCase()}` : ''}
            </div>
          </div>

          <div className="form-group">
            <label>Amount (VND)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ex: Rent payment for Jan..."
              rows="2"
            ></textarea>
          </div>

          <button type="submit" className="btn-transfer">
            Confirm Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferMoney;