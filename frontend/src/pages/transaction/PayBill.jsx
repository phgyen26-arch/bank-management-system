import React, { useState } from 'react';
import { FiZap, FiDroplet, FiWifi, FiTv, FiSmartphone, FiCheckCircle, FiSearch, FiArrowRight } from "react-icons/fi";

const PayBill = () => {
  const [step, setStep] = useState(1); // 1: Select Service, 2: Input Info, 3: Success
  const [selectedService, setSelectedService] = useState(null);
  const [customerCode, setCustomerCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock Providers
  const services = [
    { id: 'elec', name: 'Electricity', icon: <FiZap />, color: '#f1c40f', bg: '#fff9db' },
    { id: 'water', name: 'Water Utility', icon: <FiDroplet />, color: '#0984e3', bg: '#e7f5ff' },
    { id: 'internet', name: 'Internet', icon: <FiWifi />, color: '#6c5ce7', bg: '#f3f0ff' },
    { id: 'tv', name: 'Cable TV', icon: <FiTv />, color: '#e84393', bg: '#fff0f6' },
    { id: 'mobile', name: 'Postpaid Mobile', icon: <FiSmartphone />, color: '#00b894', bg: '#e6fffa' },
  ];

  const handleCheckBill = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setStep(3); // Chuyển thẳng sang success để demo
    }, 1500);
  };

  // --- STYLES ---
  const styles = {
    container: { padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Inter', sans-serif" },
    header: { textAlign: 'center', marginBottom: '40px' },
    title: { fontSize: '28px', fontWeight: '800', color: '#2d3436' },
    subtitle: { color: '#636e72', marginTop: '10px' },
    // Service Grid
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' },
    serviceCard: {
        backgroundColor: 'white', padding: '20px', borderRadius: '16px',
        border: '2px solid transparent', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'all 0.2s',
        textAlign: 'center'
    },
    iconBox: {
        width: '50px', height: '50px', borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
    },
    // Form Styles
    formCard: {
        backgroundColor: 'white', padding: '40px', borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginTop: '20px'
    },
    inputGroup: { marginBottom: '25px' },
    label: { display: 'block', marginBottom: '10px', fontWeight: '600', color: '#2d3436' },
    inputWrapper: {
        position: 'relative', display: 'flex', alignItems: 'center'
    },
    input: {
        width: '100%', padding: '16px 16px 16px 45px', borderRadius: '12px',
        border: '1px solid #dfe6e9', fontSize: '16px', outline: 'none'
    },
    btn: {
        width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
        background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
        color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(108, 92, 231, 0.2)', transition: 'opacity 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Bill Payment</h2>
        <p style={styles.subtitle}>Pay your utility bills quickly and securely.</p>
      </div>

      {/* STEP 1: SELECT SERVICE */}
      {step === 1 && (
        <div style={styles.grid}>
            {services.map(s => (
                <div 
                    key={s.id} 
                    style={styles.serviceCard}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = s.color;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onClick={() => { setSelectedService(s); setStep(2); }}
                >
                    <div style={{...styles.iconBox, backgroundColor: s.bg, color: s.color}}>
                        {s.icon}
                    </div>
                    <div style={{fontWeight: '600', fontSize: '14px', color: '#2d3436'}}>{s.name}</div>
                </div>
            ))}
        </div>
      )}

      {/* STEP 2: INPUT FORM */}
      {step === 2 && selectedService && (
        <div style={{maxWidth: '500px', margin: '0 auto'}}>
             <button 
                onClick={() => setStep(1)}
                style={{background: 'none', border: 'none', color: '#636e72', cursor: 'pointer', marginBottom: '15px', fontWeight: '600'}}
            >
                &larr; Back to Services
            </button>
            
            <div style={styles.formCard}>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px'}}>
                    <div style={{...styles.iconBox, backgroundColor: selectedService.bg, color: selectedService.color}}>
                        {selectedService.icon}
                    </div>
                    <div>
                        <div style={{fontSize: '18px', fontWeight: 'bold'}}>{selectedService.name}</div>
                        <div style={{fontSize: '13px', color: '#b2bec3'}}>Utility Payment</div>
                    </div>
                </div>

                <form onSubmit={handleCheckBill}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer Code / Contract ID</label>
                        <div style={styles.inputWrapper}>
                            <FiSearch style={{position: 'absolute', left: '15px', color: '#b2bec3'}} size={20}/>
                            <input 
                                style={styles.input} 
                                placeholder="e.g. PE123456789" 
                                value={customerCode}
                                onChange={(e) => setCustomerCode(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <button type="submit" style={styles.btn} disabled={isLoading}>
                        {isLoading ? 'Checking Bill...' : 'Check Bill & Pay'}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 3 && (
         <div style={{maxWidth: '500px', margin: '0 auto', textAlign: 'center'}}>
            <div style={styles.formCard}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e6fffa', 
                    color: '#00b894', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '40px', margin: '0 auto 20px auto'
                }}>
                    <FiCheckCircle />
                </div>
                <h2 style={{color: '#00b894', marginBottom: '10px'}}>Payment Successful!</h2>
                <p style={{color: '#636e72', marginBottom: '30px'}}>
                    You have successfully paid your <strong>{selectedService?.name}</strong> bill.
                </p>
                <button 
                    style={styles.btn}
                    onClick={() => { setStep(1); setCustomerCode(''); }}
                >
                    Pay Another Bill
                </button>
            </div>
         </div>
      )}
    </div>
  );
};

export default PayBill;