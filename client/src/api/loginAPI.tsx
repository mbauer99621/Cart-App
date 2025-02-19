import { UserData } from "../interfaces/UserData";

export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
    user?: UserData;
  }
  
  export const login = async (formData: { username: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("❌ Login API error:", data.message);
        return { success: false, message: data.message || "Login failed." };
      }

      if (!data.token || !data.user) {
        return { success: false, message: "Invalid response from server." };
      }
  
      console.log("✅ Login successful, token received.");
      return data;
    } catch (err) {
      console.error("❌ Login API error:", err);
      return { success: false, message: "Login request failed." };
    }
  };
  