import React from "react"
import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, OrbitControls } from "@react-three/drei"
import { Button } from "../components/hero.components/ui/button"
import { Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"

export default function HeroSection() {
  const [darkMode, setDarkMode] = useState(false)

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
          <div className="w-[25vw]" /> {/* Spacer for 3D element */}
          <span>Bills</span>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          <MinimalistScene darkMode={darkMode} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">Invoizo</div>
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

        <main className="container mx-auto flex flex-1 items-center justify-center px-4">
          <div className="relative z-10 max-w-3xl space-y-8 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 p-8 rounded-2xl shadow-lg text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            Manual Billing Slowing You Down? Let’s Fix That!</h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Upgrade to a smarter billing system. Save time, eliminate errors, and manage invoices effortlessly—all in one place!</p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
              <Button className="group relative h-12 overflow-hidden rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
              </Link>
              <Link to="/login">
              <Button
                variant="outline"
                className="group relative h-12 overflow-hidden rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-8 py-3 text-lg font-medium text-slate-800 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
                </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

function MinimalistScene({ darkMode }) {
  return (
    <group>
      {/* Main Cards - Just 2 as requested */}

      {/* White Card */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[-0.5, 0.3, 0]} rotation={[-0.1, 0.2, 0.1]}>
          {/* Card base */}
          <mesh scale={[2.2, 1.4, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Card details */}
          <mesh position={[-0.5, 0.2, 0.06]} scale={[0.3, 0.3, 0.05]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
          </mesh>

          <mesh position={[0, -0.1, 0.06]} scale={[1.6, 0.15, 0.01]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={darkMode ? "#94a3b8" : "#64748b"} />
          </mesh>

          <mesh position={[0.7, 0.4, 0.06]} scale={[0.5, 0.2, 0.01]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={darkMode ? "#3b82f6" : "#2563eb"} />
          </mesh>
        </group>
      </Float>

      {/* Blue Card */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        <group position={[0.5, -0.3, 0.5]} rotation={[0.2, -0.3, -0.1]}>
          {/* Card base */}
          <mesh scale={[2.2, 1.4, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#2563eb" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Card details */}
          <mesh position={[0, 0.4, 0.06]} scale={[1.8, 0.15, 0.01]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>

          {[0, -0.2, -0.4].map((y, i) => (
            <mesh key={i} position={[0, y, 0.06]} scale={[1.6, 0.08, 0.01]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Black Stone Elements in Corners */}

      {/* Top Left Stone */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[-4, 3, -2]} rotation={[0.5, 0.3, 0.2]} scale={[2, 2, 2]} castShadow>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.8} />
        </mesh>
      </Float>

      {/* Bottom Right Stone */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[4, -3, -2.5]} rotation={[-0.3, 0.5, -0.2]} scale={[2.5, 2.5, 2.5]} castShadow>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.8} />
        </mesh>
      </Float>

      {/* Additional Smaller Stone for Balance */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh position={[-3, -2, -1.5]} rotation={[-0.2, -0.3, 0.1]} scale={[1.5, 1.5, 1.5]} castShadow>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#27272a" roughness={0.5} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  )
}

