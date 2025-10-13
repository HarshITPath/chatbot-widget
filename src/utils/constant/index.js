export const BASE_URL = "http://192.168.0.90:3000/api"

export const METHODS = {
    GET: 'get',
    DELETE: 'delete',
    HEAD: 'head',
    OPTIONS: 'options',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch'
};

// Default configuration
export const CONFIG = {
  useStreaming: true,
  apiUrl: "http://192.168.0.90:3000/api",
  botName: "IT Path Assistant",
  botAvatar: "🤖",
  userAvatar: "👤",
  placeholder: "Type your message...",
  greeting: "Hi! 👋 How can I help you today?",
  windowSize: {
    width: { xs: 'calc(100vw - 16px)', sm: 'min(90vw, 540px)', md: 'min(50vw, 650px)' },
    height: { xs: 'calc(100vh - 32px)', sm: 'min(90vh, 720px)', md: 'min(85vh, 750px)' }
  },
  borderRadius: 3,
  shadow: "0 8px 32px rgba(0,0,0,0.12)",
  zIndex: 1300
};

export const USER_TYPE = {
  BOT: "bot",
  USER:"user"
}

export const QUICK_REPLIES = [
  {
    id: 1,
    icon: "💼",
    label: "I want to apply for a job",
    isJobApplication: true, // Flag to indicate this is a job application
  },
  {
    id: 2,
    icon: "🛠️",
    label: "What services do you offer?",
    useStaticResponse: false, // Send to API
  },
  {
    id: 3,
    icon: "📱",
    label: "Can you build a mobile app for my business?",
    useStaticResponse: false, // Send to API
  },
  // {
  //   id: 4,
  //   icon: "📍",
  //   label: "Where is your company located?",
  //   useStaticResponse: false, // Send to API
  // },
  // {
  //   id: 5,
  //   icon: "👨‍�",
  //   label: "Want to hire dedicated developer",
  //   useStaticResponse: false, // Send to API
  // },
  {
    id: 6,
    icon: "🌐",
    label: "Want to know about IT Path Solutions",
    useStaticResponse: false, // Send to API
  },
];