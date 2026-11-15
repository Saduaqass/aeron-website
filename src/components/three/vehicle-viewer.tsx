"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { VehicleModel } from "@/components/three/vehicle-model";

function Studio() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[-4, 6, 5]} intensity={3.2} color="#e5efff" />
      <directionalLight position={[4, 3, -4]} intensity={2.2} color="#7389a5" />
      <spotLight position={[-1, 7, 0]} intensity={34} angle={0.7} penumbra={0.8} distance={16} color="#dce8f5" />
      <VehicleModel />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={5.3}
        maxDistance={11}
        minPolarAngle={Math.PI * 0.31}
        maxPolarAngle={Math.PI * 0.56}
        target={[0, 0.66, 0]}
      />
    </>
  );
}

export default function VehicleViewer() {
  return (
    <div className="vehicle-canvas" aria-label="Интерактивная трёхмерная концепт-модель AERON ONE">
      <Canvas
        camera={{ position: [-5.5, 2.75, 7.8], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
        shadows={false}
      >
        <Suspense fallback={null}><Studio /></Suspense>
      </Canvas>
      <span className="vehicle-canvas__hint">СҮЙРЕТІП КӨРУ</span>
    </div>
  );
}
