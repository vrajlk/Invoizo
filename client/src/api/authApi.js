// Mock authentication API for demo purposes
// In a real application, this would make actual API calls to your backend

// Simulated user data
const MOCK_USER = {
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatar.jpg",
}

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(email, password) {
  // Simulate API call
  await delay(1500)

  // For demo purposes, accept any email with a password of at least 6 characters
  if (password.length >= 6) {
    // Store auth token in localStorage
    localStorage.setItem("auth-token", "mock-jwt-token")
    return MOCK_USER
  } else {
    throw new Error("Invalid credentials")
  }
}

export async function logout() {
  // Simulate API call
  await delay(500)

  // Remove auth token from localStorage
  localStorage.removeItem("auth-token")
  return true
}

export async function checkAuth() {
  // Simulate API call
  await delay(1000)

  // Check if auth token exists in localStorage
  const token = localStorage.getItem("auth-token")

  if (token) {
    return MOCK_USER
  } else {
    return null
  }
}
