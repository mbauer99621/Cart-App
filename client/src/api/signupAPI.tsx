export interface SignUpResponse {
  success: boolean;
  message: string;
}

export const signup = async (userInfo: { username: string; email: string; password: string }): Promise<SignUpResponse> => {
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Signup API error:", errorData.message);
        return { success: false, message: errorData.message || "Signup request failed." };
      }  
  
      console.log("✅ Signup API request successful");
      return { success: true, message: "User registered successfully." }
    } catch (err) {
      console.error("❌ Signup API error:", err);
      return { success: false, message: "Signup request failed." };
    }
  };