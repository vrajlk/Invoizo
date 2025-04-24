
import React, { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "../components/hero.components/ui/button"
import { Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"

import {
  Container,
  SignUpContainer,
  SignInContainer,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  RightOverlayPanel,
  Form,
  Title,
  Input,
  NewButton,
  GhostButton,
  Anchor,
  Paragraph,
} from "../components/login/LoginComponents";

// Lazy load the 3D scene
const LazyThreeScene = lazy(() => import("../components/LazyThreeScene"))

export default function HeroSection() {
  const [darkMode, setDarkMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [Signupnumber, setSignupNumber] = useState("");//signupnumber
  const [Signuppassword, setSignupPassword] = useState("");//signuppassword
  const [username, setUsername] = useState("");//signup username
  const [password, setPassword] = useState("");//login password
  const [number, setNumber] = useState("");//login number
  const Signupnavigate = useNavigate();//signup navigation
  const navigate = useNavigate();//login navigation
  const { login } = useAuth()




  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://65.2.129.154:3000/api/admin/signup", {
        username,
        number: Signupnumber,
        password: Signuppassword,
      },
        { withCredentials: true }
      );
      localStorage.setItem("adminId", res.data.adminId);
      alert("Signup Successful!");
      await login
      Signupnavigate("/dashboard");
      // Store JWT Token (Optional)
      localStorage.setItem("token", res.data.token);

      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://65.2.129.154:3000/api/admin/login", {
        number,
        password,
      },
        { withCredentials: true });
        localStorage.setItem("adminId", res.data.adminId);

        await login
      alert("Login Successful!");

      navigate("/dashboard");

      console.log(res.data);
      // Store JWT Token (Optional)
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])


  return (
    <>

      <div
        className={`relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 ${darkMode ? "dark" : ""}`}
      >
        {/* Large Text Behind */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center text-[20vw] font-bold tracking-tighter text-slate-200 dark:text-slate-900">
            <span>Beyond</span>
            <div className="w-[25vw]" />
            <span>Bills</span>
          </div>
        </div>

        {/* Lazily loaded 3D Scene */}
        {/* 3D SCENE */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <LazyThreeScene darkMode={darkMode} />
          </Suspense>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between py-4">
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-0">Invoizo</div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-white/90 dark:bg-slate-800/90"
              >
                {darkMode ? <Sun className="h-5 w-5 text-blue-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-1 items-center justify-center">
            <div className="relative z-10 max-w-3xl space-y-8 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 p-8 rounded-2xl shadow-lg text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                Manual Billing Slowing You Down? Let’s Fix That!
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Upgrade to a smarter billing system. Save time, eliminate errors, and manage invoices effortlessly—all in one place!
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={openModal} className="group relative h-12 overflow-hidden rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Button>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="group relative h-12 overflow-hidden rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-8 py-3 text-lg font-medium text-slate-800 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <span className="relative z-10">About Us</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="font-[Nunito] text-black/70 relative z-30">
              <div
                className={`fixed left-0 bottom-0 w-full flex flex-col items-center justify-center bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 ${isModalOpen ? "h-full" : "h-[0.1px]"}`}
              >
                <div
                  className={`relative flex w-full rounded-lg overflow-hidden bg-slate-50 dark:bg-white ${darkMode ? "dark" : ""} shadow-xl ${isModalOpen
                    ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
                    : "opacity-0 pointer-events-none translate-y-24 scale-95"
                    }`}
                  style={{
                    maxWidth: isHovered ? "727px" : "677px",
                    transition: "max-width 0.5s ease",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Container>
                    <SignUpContainer signingIn={signIn}>
                      <Form>
                        <Title isOverlay={false}>Create Account</Title>
                        <Input type="text"
                          id="username"
                          name="username"
                          placeholder="Username"
                          required
                          onChange={(e) => setUsername(e.target.value)} />
                        <Input type="tel"
                          id="number"
                          name="number"
                          pattern="^[0-9]{10}$"
                          minlength="10"
                          maxlength="10"
                          placeholder="Phonenumber"
                          required
                          onChange={(e) => setSignupNumber(e.target.value)} />
                        <Input type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          required
                          onChange={(e) => setSignupPassword(e.target.value)} />
                        <NewButton onClick={handleSignup} className="m-3">Sign Up</NewButton>
                      </Form>
                    </SignUpContainer>

                    <SignInContainer signingIn={signIn}>
                      <Form>
                        <Title isOverlay={false}>Log In</Title>
                        <Input type="tel"
                          id="number"
                          name="number"
                          pattern="^[0-9]{10}$"
                          minlength="10"
                          maxlength="10"
                          placeholder="Phonenumber"
                          required
                          onChange={(e) => setNumber(e.target.value)} />
                        <Input type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          required
                          onChange={(e) => setPassword(e.target.value)} />
                        <Anchor href="#">Forgot your password?</Anchor>
                        <NewButton onClick={handleLogin}>Log In</NewButton>
                      </Form>
                    </SignInContainer>

                    <OverlayContainer signingIn={signIn}>
                      <Overlay signingIn={signIn}>
                        <LeftOverlayPanel signingIn={signIn}>
                          <Title isOverlay={true}>Welcome Back!</Title>
                          <Paragraph isOverlay={true}>
                            To keep connected with us please login with your personal info
                          </Paragraph>
                          <GhostButton onClick={() => setSignIn(true)}>Sign In</GhostButton>
                        </LeftOverlayPanel>

                        <RightOverlayPanel signingIn={signIn}>
                          <Title isOverlay={true}>Hello, Friend!</Title>
                          <Paragraph>
                            Enter your personal details and start your journey with us
                          </Paragraph>
                          <GhostButton onClick={() => setSignIn(false)}>Sign Up</GhostButton>
                        </RightOverlayPanel>
                      </Overlay>
                    </OverlayContainer>
                  </Container>
                </div>
                {isModalOpen && (
                  <button
                    className="absolute top-[30%] right-[33.7%] w-7 h-10 z-50 cursor-pointer transition-all duration-500 ease-in-out"
                    style={{
                      opacity: isHovered ? 1 : 0.3,
                      transform: isHovered ? "translateX(40px)" : "translateX(20px)",
                      filter: isHovered ? "blur(0)" : "blur(1px)",
                    }}
                    onClick={closeModal}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <path d="M25 3C12.9 3 3 12.9 3 25s9.9 22 22 22 22-9.9 22-22S37.1 3 25 3zm0 2c11 0 20 9 20 20s-9 20-20 20S5 36 5 25 14 5 25 5zm-8 11a1 1 0 00-.7 1.7L23.6 25l-7.3 7.3a1 1 0 101.4 1.4L25 26.4l7.3 7.3a1 1 0 001.4-1.4L26.4 25l7.3-7.3a1 1 0 00-1.4-1.4L25 23.6l-7.3-7.3a1 1 0 00-.7-.3z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
