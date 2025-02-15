export const signup = async (userInfo: { username: string; email: string; password: string }) => {
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
  
      return await response.json();
    } catch (err) {
      console.error("Signup API error:", err);
      return { success: false, message: "Signup request failed." };
    }
  };