import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import MinimalistScene from "./MinimalistScene"; // move MinimalistScene into its own file

const LazyThreeScene = ({ darkMode }) => {
  return (
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
      <Suspense fallback={null}>
        <MinimalistScene darkMode={darkMode} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default LazyThreeScene;
