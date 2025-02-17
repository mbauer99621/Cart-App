import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import AuthService from "../utils/auth";
import { jwtDecode } from "jwt-decode";

// Define the expected shape of the decoded JWT payload
interface DecodedToken {
  username: string;
  exp: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setUser({ username: decoded.username });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const login = (token: string) => {
    AuthService.login(token);
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    setUser({ username: decoded.username });
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};