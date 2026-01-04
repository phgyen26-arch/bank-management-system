import React, { useState } from 'react';

const LockUnlockAccount = () => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center' }}>
      <h2 style={{ color: isLocked ? 'red' : 'green' }}>{isLocked ? "TÀI KHOẢN ĐANG KHÓA" : "TÀI KHOẢN ĐANG HOẠT ĐỘNG"}</h2>
      <p style={{ margin: '20px 0' }}>Sử dụng chức năng này để khóa tạm thời tài khoản của bạn nếu nghi ngờ có xâm nhập.</p>
      
      <button 
        onClick={() => setIsLocked(!isLocked)}
        style={{ 
          backgroundColor: isLocked ? '#00b894' : '#d63031', 
          color: 'white', padding: '15px 30px', border: 'none', borderRadius: '8px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' 
        }}
      >
        {isLocked ? "MỞ KHÓA TÀI KHOẢN" : "KHÓA TÀI KHOẢN NGAY"}
      </button>
    </div>
  );
};
export default LockUnlockAccount;