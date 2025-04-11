import { Float } from '@react-three/drei';

const MinimalistScene = ({ darkMode }) => {
    return (
      <group>
        { <group>
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
}
      </group>
    );
  };
  
  export default MinimalistScene;
  