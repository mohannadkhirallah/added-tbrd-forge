import { msalInstance } from "@/components/auth/AuthProvider";
import { tokenRequest } from "./msal-config";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function getAuthToken(): Promise<string> {
  try {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      throw new Error("No active account");
    }

    const response = await msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account,
    });
    
    return response.accessToken;
  } catch (error) {
    console.error("Token acquisition failed:", error);
    throw error;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Handle token refresh or re-authentication
        throw new Error("Authentication failed. Please sign in again.");
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    // Handle empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export async function apiUpload<T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<T> {
  try {
    const token = await getAuthToken();
    
    const formData = new FormData();
    formData.append("file", file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
