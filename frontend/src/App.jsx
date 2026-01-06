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

/* ================= PAGES ================= */

// Auth
import Login from "./pages/Login";

// Dashboard
import TellerDashboard from "./pages/TellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// ================= TELLER =================
import CreateAccount from "./pages/teller/CreateAccount";
import CashDeposit from "./pages/teller/CashDeposit";
import CashWithdraw from "./pages/teller/CashWithdraw";
import BillPayments from "./pages/teller/BillPayments";

// 🔐 SECURITY
import CardManagement from "./pages/teller/CardManagement";
import VaultRegistry from "./pages/teller/VaultRegistry";

// ================= CUSTOMER =================

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
import TransferMoney from "./pages/transaction/transferMoney"; // <--- MỚI THÊM (Lưu ý: Tên file phải là transferMoney.jsx)

/* ================= PROTECTED ROUTE ================= */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (user.role_id !== allowedRole) return <div>Access Denied</div>;

  return children;
};

/* ================= MAIN LAYOUT (CÓ SCROLL) ================= */
const MainLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          marginLeft: "250px",
          marginTop: "64px",
          overflowY: "auto",
          background: "#f4f6f9",
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
          {/* LOGIN */}
          <Route path="/" element={<Login />} />

          {/* ================= TELLER ================= */}
          <Route
            element={
              <ProtectedRoute allowedRole={1}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/teller" element={<TellerDashboard />} />

            {/* ACCOUNT SERVICES */}
            <Route path="/teller/create-account" element={<CreateAccount />} />

            {/* TRANSACTIONS */}
            <Route path="/teller/deposit" element={<CashDeposit />} />
            <Route path="/teller/withdraw" element={<CashWithdraw />} />
            <Route path="/teller/bill-payments" element={<BillPayments />} />

            {/* 🔐 VAULT & SECURITY */}
            <Route
              path="/teller/card-management"
              element={<CardManagement />}
            />
            <Route
              path="/teller/vault-registry"
              element={<VaultRegistry />}
            />
          </Route>

          {/* ================= CUSTOMER ================= */}
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

            {/* Transaction */}
            <Route
              path="/transaction/statement"
              element={<ViewAccountStatement />}
            />
            <Route path="/transaction/pay-bill" element={<PayBill />} />
            
            {/* ---> ROUTE MỚI THÊM Ở ĐÂY <--- */}
            <Route path="/transaction/transfer" element={<TransferMoney />} />
            
          </Route>

          {/* 404 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;