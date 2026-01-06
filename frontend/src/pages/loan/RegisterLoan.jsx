import React, { useState } from 'react';

const RegisterLoan = () => {
  const [formData, setFormData] = useState({
    loanType: '', // Để trống ban đầu để người dùng tự nhập hoặc chọn
    amount: '',
    income: '',
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Loan Application:", formData);
    alert(`Application submitted!\nPurpose: ${formData.loanType}\nAmount: ${formData.amount}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Apply for a Loan</h2>
          <p style={styles.subtitle}>Quick approval for your financial needs</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Loan Purpose - Đã sửa thành Input + Datalist */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Loan Purpose</label>
            <input
              type="text"
              name="loanType"
              list="loan-options" // Liên kết với datalist bên dưới
              value={formData.loanType}
              onChange={handleChange}
              placeholder="Select or type your purpose..."
              style={styles.input}
              required
            />
            {/* Danh sách gợi ý */}
            <datalist id="loan-options">
              <option value="Home Loan" />
              <option value="Car Loan" />
              <option value="Business Loan" />
              <option value="Consumer Loan" />
              <option value="Student Loan" />
              <option value="Medical Expenses" />
              <option value="Wedding Expenses" />
            </datalist>
          </div>

          {/* Desired Amount */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Desired Amount (VND)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 500,000,000"
              style={styles.input}
              required
            />
          </div>

          {/* Monthly Income */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Monthly Income (VND)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="e.g. 20,000,000"
              style={styles.input}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

// CSS Styles (Giữ nguyên vẻ đẹp cũ)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7f6',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#2d3436',
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    margin: 0,
    color: '#636e72',
    fontSize: '14px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#2d3436',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #dfe6e9',
    fontSize: '15px',
    color: '#2d3436',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#6c5ce7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#5a4ad1',
    transform: 'translateY(-1px)',
  },
};

export default RegisterLoan;