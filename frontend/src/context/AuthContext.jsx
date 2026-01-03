import { createContext, useContext, useEffect, useState } from "react";
import { mockData } from "../mockdata";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("bank_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    const foundUser = mockData.users.find(
      (u) => u.username === username && u.password_hash === password
    );

    if (!foundUser) return false;

    const profile =
      foundUser.role_id === 1
        ? mockData.teller.find((t) => t.user_id === foundUser.user_id)
        : mockData.customers.find((c) => c.user_id === foundUser.user_id);

    const userData = { ...foundUser, profile };
    setUser(userData);
    localStorage.setItem("bank_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bank_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
