import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";

// Pages
import Login from "./pages/Login";
import TellerDashboard from "./pages/TellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// Account
import ViewAccountInfo from "./pages/account/ViewAccountInfo";
import UpdateAccountInfo from "./pages/account/UpdateAccountInfo";
import LockUnlockAccount from "./pages/account/LockUnlockAccount";

// Loan
import ViewLoanStatus from "./pages/loan/ViewLoanStatus";
import RegisterLoan from "./pages/loan/RegisterLoan";
import RecordLoanPayment from "./pages/loan/RecordLoanPayment";

// Card
import ViewCardInfo from "./pages/card/ViewCardInfo";
import ReportLostStolen from "./pages/card/ReportLostStolen";
import UpdateCard from "./pages/card/UpdateCard";

// Transaction
import ViewAccountStatement from "./pages/transaction/ViewAccountStatement";
import PayBill from "./pages/transaction/PayBill";

/* ================= PROTECTED ROUTE ================= */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (user.role_id !== allowedRole) return <div>Access Denied</div>;

  return children;
};

/* ================= MAIN LAYOUT (FIX SCROLL) ================= */
const MainLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f9fafb",
        overflow: "hidden", // ❗ khóa layout ngoài
      }}
    >
      {/* Sidebar cố định */}
      <Sidebar />

      {/* CONTENT SCROLL */}
      <div
        style={{
          flex: 1,
          marginLeft: "280px", // đúng với width sidebar
          overflowY: "auto",   // ✅ CUỘN Ở ĐÂY
          padding: "30px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

/* ================= APP ================= */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Teller */}
          <Route
            path="/teller"
            element={
              <ProtectedRoute allowedRole={1}>
                <TellerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Customer */}
          <Route
            element={
              <ProtectedRoute allowedRole={2}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/customer" element={<CustomerDashboard />} />

            {/* Account */}
            <Route path="/account/view-info" element={<ViewAccountInfo />} />
            <Route path="/account/update-info" element={<UpdateAccountInfo />} />
            <Route path="/account/lock-unlock" element={<LockUnlockAccount />} />

            {/* Loan */}
            <Route path="/loan/payment" element={<RecordLoanPayment />} />
            <Route path="/loan/status" element={<ViewLoanStatus />} />
            <Route path="/loan/register" element={<RegisterLoan />} />

            {/* Card */}
            <Route path="/card/report" element={<ReportLostStolen />} />
            <Route path="/card/info" element={<ViewCardInfo />} />
            <Route path="/card/update" element={<UpdateCard />} />
            <Route path="/card/activation" element={<h2>Đang phát triển</h2>} />
            <Route path="/card/add" element={<h2>Đang phát triển</h2>} />

            {/* Transaction */}
            <Route
              path="/transaction/statement"
              element={<ViewAccountStatement />}
            />
            <Route path="/transaction/pay-bill" element={<PayBill />} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
