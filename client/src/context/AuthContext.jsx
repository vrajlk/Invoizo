"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, logout as apiLogout, checkAuth } from "../api/authApi"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const verifyAuth = async () => {
      try {
        setLoading(true)
        const userData = await checkAuth()
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth verification error:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const userData = await apiLogin(email, password)
      setUser(userData)
      setIsAuthenticated(true)
      return userData
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiLogout()
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
