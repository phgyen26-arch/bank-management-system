import { useState } from "react";

import { useAuth } from "../context/AuthContext";


export default function CustomerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} onNavigate={setActiveTab} />

      <div className="main-content">
        <Header user={user} />

        <div className="content-area">
          <h2>{activeTab}</h2>
        </div>
      </div>
    </div>
  );
}
