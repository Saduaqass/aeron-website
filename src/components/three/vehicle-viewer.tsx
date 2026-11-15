"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { VehicleModel } from "@/components/three/vehicle-model";
import { useVehicleConfig, vehicleColors } from "@/lib/vehicle-config";
import { Camera, Lightbulb } from "lucide-react";
import { useLocale } from "@/locales/locale-provider";
import type { CameraPreset } from "@/lib/vehicle-config";

const cameraPositions: Record<CameraPreset, [number, number, number]> = {
  front: [-5.5, 2.75, 7.8],
  side: [0, 1.9, 9.4],
  rear: [5.5, 2.75, -7.8],
  detail: [-3.6, 1.45, 4.7],
  high: [0, 5.6, 8],
  reveal: [6.2, 3.9, 8.2],
};

function CameraRig({ preset }: { preset: CameraPreset }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...cameraPositions[preset]);
    camera.lookAt(0, 0.1, 0);
    camera.updateProjectionMatrix();
  }, [camera, preset]);
  return null;
}

function Studio({ bodyColor, lighting, wheelStyle, cameraPreset }: {
  bodyColor: string;
  lighting: boolean;
  wheelStyle: "aero" | "sport";
  cameraPreset: CameraPreset;
}) {
  const selectedColor = vehicleColors.find((color) => color.id === bodyColor)?.value ?? "#aeb7c0";
  return (
    <>
      <CameraRig preset={cameraPreset} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[-4, 6, 5]} intensity={3.2} color="#e5efff" />
      <directionalLight position={[4, 3, -4]} intensity={2.2} color="#7389a5" />
      <spotLight position={[-1, 7, 0]} intensity={34} angle={0.7} penumbra={0.8} distance={16} color="#dce8f5" />
      <VehicleModel color={selectedColor} lighting={lighting} wheelStyle={wheelStyle} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={5.3}
        maxDistance={11}
        minPolarAngle={Math.PI * 0.31}
        maxPolarAngle={Math.PI * 0.56}
        target={[0, 0.1, 0]}
      />
    </>
  );
}

export default function VehicleViewer({ showControls = true, className = "", renderWhenNear = false }: { showControls?: boolean; className?: string; renderWhenNear?: boolean }) {
  const { bodyColor, setBodyColor, cameraPreset, setCameraPreset, lighting, setLighting, wheelStyle } = useVehicleConfig();
  const { copy } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(!renderWhenNear);

  useEffect(() => {
    if (!renderWhenNear || !containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [renderWhenNear]);

  return (
    <div ref={containerRef} className={`vehicle-canvas ${className}`} role={showControls ? "group" : "img"} aria-label={`AERON ONE · ${copy.vehicle.controls}`}>
      {nearViewport ? <Canvas
          camera={{ position: [-5.5, 2.75, 7.8], fov: 34 }}
          dpr={[1, 1.25]}
          frameloop="demand"
          gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
          shadows={false}
          fallback={<p className="vehicle-canvas__fallback">{copy.vehicle.unavailable}</p>}
        >
          <Suspense fallback={null}><Studio bodyColor={bodyColor} lighting={lighting} wheelStyle={wheelStyle} cameraPreset={cameraPreset} /></Suspense>
        </Canvas> : <div className="vehicle-canvas__deferred" aria-hidden="true" />}
      {showControls ? <div className="vehicle-tools" aria-label={copy.vehicle.controls}>
        <div className="vehicle-colors" role="group" aria-label={copy.vehicle.colorGroup}>
          {vehicleColors.map((color, index) => (
            <button
              key={color.id}
              type="button"
              className="vehicle-color"
              style={{ "--swatch": color.value } as CSSProperties}
              aria-label={copy.vehicle.colors[index]}
              aria-pressed={bodyColor === color.id}
              onClick={() => setBodyColor(color.id)}
            />
          ))}
        </div>
        <div className="vehicle-angles" role="group" aria-label={copy.vehicle.cameraGroup}>
          {([["front", copy.vehicle.cameras[0]], ["side", copy.vehicle.cameras[1]], ["rear", copy.vehicle.cameras[2]]] as const).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={cameraPreset === id} onClick={() => setCameraPreset(id)}>{label}</button>
          ))}
        </div>
        <button className="vehicle-light" type="button" aria-label={copy.vehicle.lighting} aria-pressed={lighting} onClick={() => setLighting(!lighting)}>
          {lighting ? <Lightbulb size={14} aria-hidden="true" /> : <Camera size={14} aria-hidden="true" />}
        </button>
      </div> : null}
      {showControls ? <span className="vehicle-canvas__hint">{copy.vehicle.drag}</span> : null}
    </div>
  );
}
