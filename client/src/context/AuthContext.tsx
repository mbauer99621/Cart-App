import { createContext } from "react";

// Define AuthContext Props
export interface AuthContextProps {
  user: { username: string; email: string } | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Export the context, without logic
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


