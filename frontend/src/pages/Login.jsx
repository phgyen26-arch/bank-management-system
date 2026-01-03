import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const success = login(username, password);

    if (success) {
      if (username === "teller_main") {
        navigate("/teller");
      } else {
        navigate("/customer");
      }
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-container">
      {/* Background icons */}
      <div className="bg-icon bg-icon-1"></div>
      <div className="bg-icon bg-icon-2"></div>
      <div className="bg-icon bg-icon-3"></div>
      <div className="bg-icon bg-icon-4"></div>

      {/* Login card */}
      <div className="login-card">
        <div className="login-header">
          <h2>SecureBanking</h2>
          <p>Đăng nhập hệ thống quản lý</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              className="form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
