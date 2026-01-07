import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";

// Pages
import Login from "./pages/Login";
import TellerDashboard from "./pages/TellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// Teller
import CreateAccount from "./pages/teller/CreateAccount";
import CashDeposit from "./pages/teller/CashDeposit";
import CashWithdraw from "./pages/teller/CashWithdraw";
import BillPayments from "./pages/teller/BillPayments";
import CardManagement from "./pages/teller/CardManagement";
import CardStatement from "./pages/teller/CardStatement";

// Teller - Loan
import TellerLoanApproval from "./pages/teller/TellerLoanApproval";
import TellerLoanPayment from "./pages/teller/TellerLoanPayment";
import TellerCreateLoan from "./pages/teller/TellerCreateLoan"; // <--- 1. MỚI THÊM IMPORT

// Customer
import ViewAccountInfo from "./pages/account/ViewAccountInfo";
import UpdateAccountInfo from "./pages/account/UpdateAccountInfo";
import LockUnlockAccount from "./pages/account/LockUnlockAccount";
import ViewLoanStatus from "./pages/loan/ViewLoanStatus";
import RegisterLoan from "./pages/loan/RegisterLoan";
import RecordLoanPayment from "./pages/loan/RecordLoanPayment";
import ViewCardInfo from "./pages/card/ViewCardInfo";
import ReportLostStolen from "./pages/card/ReportLostStolen";
import UpdateCard from "./pages/card/UpdateCard";
import ViewAccountStatement from "./pages/transaction/ViewAccountStatement";
import PayBill from "./pages/transaction/PayBill";
import TransferMoney from "./pages/transaction/TransferMoney";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role_id !== allowedRole) return <div>Access Denied</div>;
  return children;
};

const MainLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: "250px", overflowY: "auto", background: "#f4f6f9" }}>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* TELLER ROUTES */}
          <Route element={<ProtectedRoute allowedRole={1}><MainLayout /></ProtectedRoute>}>
            <Route path="/teller" element={<TellerDashboard />} />
            <Route path="/teller/create-account" element={<CreateAccount />} />
            <Route path="/teller/deposit" element={<CashDeposit />} />
            <Route path="/teller/withdraw" element={<CashWithdraw />} />
            <Route path="/teller/bill-payments" element={<BillPayments />} />
            
            {/* LOAN SERVICES */}
            <Route path="/teller/loan-approval" element={<TellerLoanApproval />} />
            <Route path="/teller/loan-payment" element={<TellerLoanPayment />} />
            <Route path="/teller/create-loan" element={<TellerCreateLoan />} /> {/* <--- 2. MỚI THÊM ROUTE */}

            <Route path="/teller/card-management" element={<CardManagement />} />
            <Route path="/teller/card-statement" element={<CardStatement />} />
          </Route>

          {/* CUSTOMER ROUTES */}
          <Route element={<ProtectedRoute allowedRole={2}><MainLayout /></ProtectedRoute>}>
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/account/view-info" element={<ViewAccountInfo />} />
            <Route path="/account/update-info" element={<UpdateAccountInfo />} />
            <Route path="/account/lock-unlock" element={<LockUnlockAccount />} />
            <Route path="/loan/payment" element={<RecordLoanPayment />} />
            <Route path="/loan/status" element={<ViewLoanStatus />} />
            <Route path="/loan/register" element={<RegisterLoan />} />
            <Route path="/card/report" element={<ReportLostStolen />} />
            <Route path="/card/info" element={<ViewCardInfo />} />
            <Route path="/card/update" element={<UpdateCard />} />
            <Route path="/transaction/statement" element={<ViewAccountStatement />} />
            <Route path="/transaction/pay-bill" element={<PayBill />} />
            <Route path="/transaction/transfer" element={<TransferMoney />} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;