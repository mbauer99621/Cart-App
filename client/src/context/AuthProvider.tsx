import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import AuthService from "../utils/auth";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Load user from localStorage on initial load
  const [user, setUser] = useState<{ username: string; email: string } | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<{ username: string; email: string }>(token);
        //const userData = { username: decoded.username, email: decoded.email };
  
        // Send request with Authorization token
        fetch(`http://localhost:3001/api/get-user/${decoded.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}` // Ensure request is authorized
            "Authorization": `Bearer ${localStorage.getItem("id_token")}`
          }
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("🔹 Server Response:", data);
          if (data.success) {
            setUser({ username: data.username, email: data.email });
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(data)); // Save user data
          }
        })
        .catch((err) => console.error("Error fetching user data:", err));
  
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const login = (token: string) => {
    AuthService.login(token);
    const decoded = jwtDecode<{ username: string; email: string }>(token);

    fetch(`http://localhost:3001/api/get-user/${decoded.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setUser({ username: data.username, email: data.email });
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuthenticated", "true");
      }
    })
    .catch(err => console.error("Error fetching user data:", err));
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);

    // Clear from localStorage
    localStorage.removeItem("user");
    //localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};