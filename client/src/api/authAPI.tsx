import { UserData } from '../interfaces/UserData';
//import { UserLogin } from '../interfaces/UserLogin';

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: UserData;
}

export const login = async (formData: { username: string; password: string }): Promise<LoginResponse> => {
  //export const login = async (formData: UserLogin): Promise<LoginResponse> => {
  try {
    console.log("🔍 Sending login request with formData:", formData);

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log("🔍 Raw response:", response);

    let data;
    try{
    data = await response.json();
    console.log("🛠️ Server response:", data); // Debugging
  } catch (jsonError) {
    console.error("❌ Error parsing JSON response:", jsonError);
    throw new Error("Invalid JSON response from server.");
  }

  // Log when an incorrect response structure is received
  if (typeof data !== "object") {
    console.error("❌ Unexpected response format:", data);
    throw new Error("Unexpected response format from server.");
  }

  if (!response.ok) {
    console.error("❌ Server returned an error", data);
    return { success: false, message: data.message || "Login failed." };
  }

  if (!data.token) {
    console.error("❌ No token received.");
    return { success: false, message: "Server response did not include a token." };
  }

    // the form was expecting a message, and by adding it to the return statement, it is now also included
    //however, when logging in, I don't see the email, userId or username displayed at this time
    console.log("✅ Received token:", data.token);
    return { success: true, token: data.token, user: data.user, message: "Login successful!" };
    
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};
