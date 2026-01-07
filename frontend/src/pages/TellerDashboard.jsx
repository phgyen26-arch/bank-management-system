import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { FiMapPin, FiActivity, FiCheckCircle } from "react-icons/fi";

const TellerDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isDashboardHome =
    location.pathname === '/teller' || location.pathname === '/teller/';

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div style={styles.container}>
      <Sidebar role="teller" />

      <div style={styles.mainContent}>
        {isDashboardHome ? (
          <div style={styles.heroSection}>
            <div style={styles.purpleBlob} />
            <div style={styles.blueBlob} />

            <div style={styles.welcomeCard}>
              {/* Header */}
              <div style={styles.cardHeader}>
                <div style={styles.statusBadge}>
                  <FiCheckCircle style={{ marginRight: 6 }} />
                  Available for service
                </div>
                <div style={styles.dateTime}>
                  {formattedDate} • {formattedTime}
                </div>
              </div>

              {/* Greeting */}
              <div style={styles.textContainer}>
                <h3 style={styles.subTitle}>Welcome back,</h3>
                <h1 style={styles.gradientName}>
                  {user?.profile?.full_name || 'Phạm Hoàng Yến'}
                </h1>
                <p style={styles.quote}>
                  “Customer satisfaction is our top priority.”
                </p>
              </div>

              {/* Stats */}
              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <div style={styles.iconCircleBlue}>
                    <FiMapPin />
                  </div>
                  <div>
                    <div style={styles.statLabel}>Location</div>
                    <div style={styles.statValue}>
                      Counter 05 – Hanoi Branch
                    </div>
                  </div>
                </div>

                <div style={styles.statBox}>
                  <div style={styles.iconCirclePurple}>
                    <FiActivity />
                  </div>
                  <div>
                    <div style={styles.statLabel}>Performance</div>
                    <div style={styles.statValue}>Stable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.outletContainer}>
            <div style={styles.outletPaper}>
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  /* ================= LAYOUT ROOT ================= */
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    minHeight: '100vh',
    overflow: 'hidden',
    fontFamily:
      "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#F4F7FE',
  },

  mainContent: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },

  /* ================= HERO SECTION ================= */
  heroSection: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  purpleBlob: {
    position: 'absolute',
    top: '10%',
    right: '15%',
    width: '300px',
    height: '300px',
    background: 'linear-gradient(180deg, #E0C6FD 0%, #ACAAFF 100%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    opacity: 0.7,
    zIndex: 0,
  },

  blueBlob: {
    position: 'absolute',
    bottom: '10%',
    left: '15%',
    width: '350px',
    height: '350px',
    background: 'linear-gradient(180deg, #A8C5DA 0%, #C4E6FF 100%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    opacity: 0.6,
    zIndex: 0,
  },

  /* ================= WELCOME CARD ================= */
  welcomeCard: {
    position: 'relative',
    zIndex: 1,
    width: '65%',
    maxWidth: '700px',
    maxHeight: '85vh',
    padding: '32px 40px',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px -10px rgba(67, 24, 255, 0.15)',
    textAlign: 'center',
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#A3AED0',
  },

  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: 'rgba(5, 205, 153, 0.1)',
    color: '#05CD99',
    fontWeight: 600,
  },

  dateTime: {
    fontFamily: 'monospace',
    color: '#707EAE',
    fontSize: '14px',
  },

  textContainer: {
    marginBottom: '36px',
  },

  subTitle: {
    fontSize: '16px',
    color: '#707EAE',
    marginBottom: '6px',
  },

  gradientName: {
    fontSize: '42px',
    fontWeight: 800,
    margin: '10px 0',
    background: 'linear-gradient(90deg, #4318FF 0%, #9C27B0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-1px',
  },

  quote: {
    fontSize: '15px',
    color: '#A3AED0',
    fontStyle: 'italic',
  },

  /* ================= STATS ================= */
  statsGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '28px',
    borderTop: '1px solid #F4F7FE',
  },

  statBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    textAlign: 'left',
  },

  iconCircleBlue: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#F4F7FE',
    color: '#4318FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },

  iconCirclePurple: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#F4F7FE',
    color: '#9C27B0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },

  statLabel: {
    fontSize: '12px',
    color: '#A3AED0',
  },

  statValue: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#2B3674',
  },

  /* ================= OUTLET ================= */
  outletContainer: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },

  outletPaper: {
    minHeight: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
  },
};

export default TellerDashboard;
