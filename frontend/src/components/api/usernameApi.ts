/**
 * API client for username availability related requests
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

/**
 * Checks if a username is available.
 * @param username - The username to check.
 * @returns Object containing availability status.
 */
export const checkUsernameAvailability = async (username: string) => {
  try {
    // pass the username as the query parameter to the backend
    const response = await fetch(`${API_BASE_URL}/check-username?username=${encodeURIComponent(username)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to check username");
    }

    return data;
  } catch (error) {
    console.error("Check Username API error:", error);
    throw error;
  }
};
