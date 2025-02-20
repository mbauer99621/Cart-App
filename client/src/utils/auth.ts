// Importing specific types and functions from the 'jwt-decode' library.
// JwtPayload: A type definition representing the structure of a JSON Web Token payload.
// jwtDecode: A function used to decode a JSON Web Token (JWT) and extract its payload.
import { jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {

  // Decode the JSON Web Token (JWT) using the jwtDecode function, specifying the expected payload type as UserData.
    // The getToken() method is called to retrieve the JWT, which is then passed to jwtDecode to extract and return its payload.
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
    //return jwtDecode<{ username: string; email: string }>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<{ exp: number }>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        this.logout();
        return true;
      }
    } catch (err) {
      // If decoding fails (e.g., due to an invalid token format), catch the error and return false.
      return false;
    }
  }

  getToken(): string {
    return sessionStorage.getItem("token") || "";
  }

  login(idToken: string) {
    sessionStorage.setItem("token", idToken);
    window.location.assign('/');
  }

  logout() {
    sessionStorage.removeItem("token");
    window.location.assign('/');
  }
}

export default new AuthService();
