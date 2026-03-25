/**
 * API client for authentication related requests
 * This handles registration, login, and Google OAuth
 */

const API_BASE_URL = "http://localhost:4000";

/**
 * Handles user registration
 * @param username - The username of the user
 * @param email - The email of the user
 * @returns The response from the server
 */
export const registerUser = async (username: string, email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    console.log("user data", data);

    return data;
  } catch (error) {
    console.error("Register API error:", error);
    throw error;
  }
};

/**
 * Handles user login
 * @param email - The email of the user
 * @returns The response from the server
 */
export const loginUser = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

/**
 * Redirects user to Google OAuth flow
 */
export const loginWithGoogle = () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};

/**
 * Fetches current user details
 * @param token - The access token
 * @returns The user data
 */
export const getMe = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user data");
    }

    return data;
  } catch (error) {
    console.error("GetMe API error:", error);
    throw error;
  }
};
