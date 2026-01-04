import React from 'react';

const RegisterLoan = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hồ sơ đăng ký vay đã được gửi! Nhân viên tín dụng sẽ liên hệ bạn sớm.");
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '20px' }}>Đăng ký khoản vay mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Mục đích vay</label>
          <select style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
            <option>Vay mua nhà</option>
            <option>Vay mua xe</option>
            <option>Vay kinh doanh</option>
            <option>Vay tiêu dùng</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Số tiền mong muốn (VND)</label>
          <input type="number" placeholder="Ví dụ: 100000000" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Thu nhập hàng tháng (VND)</label>
          <input type="number" placeholder="Ví dụ: 15000000" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#6c5ce7', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
          Đăng ký vay
        </button>
      </form>
    </div>
  );
};
export default RegisterLoan;