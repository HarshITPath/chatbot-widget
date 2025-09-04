// import axios from 'axios';
// import { BASE_URL, METHODS } from '../utils/constant';

// const axiosConfig = {
//     baseURL: BASE_URL + '/api',
//     withCredentials: false
// };

// // Create a single Axios instance
// const axiosInstance = axios.create(axiosConfig);

// // Set up request interceptor
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// // Set up response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const { response } = error;
//         if (!response) return Promise.reject(error);
//         const { status } = response;

//         if ([401].includes(status)) {
//             let accessToken = localStorage.getItem('token') || sessionStorage.getItem('token');
//             window.location.href = '/login';
//             localStorage.clear();
//             sessionStorage.clear();
//             return Promise.reject(response?.data);
//         }

//         return Promise.reject(response?.data);
//     }
// );

// const client = ({ method = METHODS.GET, url, data, auth, ...rest }) => {
//     return axiosInstance({
//         method,
//         url,
//         data,
//         withCredentials: false,
//         auth,
//         responseType: 'stream',
//         ...rest
//     });
// };

// export default client;



import { BASE_URL } from '../utils/constant';

// Helper to get token (same as your axios interceptor did)
function getAuthToken() {
  return localStorage.getItem("support-agent");
}

// Custom fetch wrapper
async function apiFetch(endpoint, options = {}, stream = false) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle unauthorized (like Axios interceptor did)
    if (response.status === 401) {
      localStorage.removeItem("support-agent");
      window.location.href = "/login"; // navigate to login
      throw new Error("Unauthorized, redirected to login");
    }

    if (stream) {
      // Return the raw response for streaming
      return response;
    } else {
      // Standard JSON response
      return response.json();
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

// Chat API functions
export const chatAPI = {
  // Start a new chat session
  startChat: async (initialMessage, useStreaming = false) => {
    const requestBody = { initialMessage };
    if (useStreaming) {
      requestBody.useStreaming = true;
    }

    if (useStreaming) {
      // Return raw response for streaming
      return apiFetch('/start-chat', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      }, true);
    } else {
      // Return JSON response for non-streaming
      return apiFetch('/start-chat', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });
    }
  },

  // Continue existing chat session
  continueChat: async (sessionId, message, useStreaming = false) => {
    const requestBody = { message };
    if (useStreaming) {
      requestBody.useStreaming = true;
    }

    if (useStreaming) {
      // Return raw response for streaming
      return apiFetch(`/chat/${sessionId}/continue`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
      }, true);
    } else {
      // Return JSON response for non-streaming
      return apiFetch(`/chat/${sessionId}/continue`, {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });
    }
  },

  // Get messages by session ID
  getSessionMessages: async (sessionId) => {
    return apiFetch(`/sessions/${sessionId}/messages`);
  },

  // Generic send message function that handles session logic
  sendMessage: async (message, sessionId = null, useStreaming = false) => {
    if (sessionId) {
      return chatAPI.continueChat(sessionId, message, useStreaming);
    } else {
      return chatAPI.startChat(message, useStreaming);
    }
  }
};

export default apiFetch;
