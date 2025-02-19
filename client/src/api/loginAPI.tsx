export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
  }
  
  export const login = async (userInfo: { username: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await fetch("/auth/LoginPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("❌ Login API error:", data.message);
        return { success: false, message: data.message || "Login failed." };
      }
  
      console.log("✅ Login successful, token received.");
      return { success: true, token: data.token };
    } catch (err) {
      console.error("❌ Login API error:", err);
      return { success: false, message: "Login request failed." };
    }
  };
  