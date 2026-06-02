import { createContext, useContext, useState } from "react";
import api from "../services/api";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("voyse-user") || "null"));
  const authenticate = async (credentials, register = false) => {
    const { data } = await api.post(`/auth/${register ? "register" : "login"}`, credentials);
    localStorage.setItem("voyse-token", data.token);
    localStorage.setItem("voyse-user", JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => { localStorage.removeItem("voyse-token"); localStorage.removeItem("voyse-user"); setUser(null); };
  return <AuthContext.Provider value={{ user, authenticate, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
