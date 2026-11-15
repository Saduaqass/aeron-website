"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export const vehicleColors = [
  { id: "obsidian", label: "Обсидиан", value: "#30353b" },
  { id: "arctic", label: "Арктик", value: "#d8dde1" },
  { id: "titanium", label: "Титан", value: "#aeb7c0" },
  { id: "electric", label: "Электр көк", value: "#31568d" },
  { id: "graphite", label: "Графит", value: "#191d22" },
] as const;

export type VehicleColorId = (typeof vehicleColors)[number]["id"];
export type CameraPreset = "front" | "side" | "rear" | "detail" | "high" | "reveal";
export type WheelStyle = "aero" | "sport";
export type InteriorColorId = "charcoal" | "sand" | "blue";

type VehicleConfigContextValue = {
  bodyColor: VehicleColorId;
  setBodyColor: (id: VehicleColorId) => void;
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  lighting: boolean;
  setLighting: (enabled: boolean) => void;
  wheelStyle: WheelStyle;
  setWheelStyle: (style: WheelStyle) => void;
  interiorColor: InteriorColorId;
  setInteriorColor: (color: InteriorColorId) => void;
};

const VehicleConfigContext = createContext<VehicleConfigContextValue | null>(null);

export function VehicleConfigProvider({ children }: { children: ReactNode }) {
  const [bodyColor, setBodyColor] = useState<VehicleColorId>("titanium");
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("front");
  const [lighting, setLighting] = useState(true);
  const [wheelStyle, setWheelStyle] = useState<WheelStyle>("aero");
  const [interiorColor, setInteriorColor] = useState<InteriorColorId>("charcoal");
  const value = useMemo(() => ({
    bodyColor, setBodyColor, cameraPreset, setCameraPreset,
    lighting, setLighting, wheelStyle, setWheelStyle,
    interiorColor, setInteriorColor,
  }), [bodyColor, cameraPreset, lighting, wheelStyle, interiorColor]);

  return <VehicleConfigContext.Provider value={value}>{children}</VehicleConfigContext.Provider>;
}

export function useVehicleConfig() {
  const context = useContext(VehicleConfigContext);
  if (!context) throw new Error("useVehicleConfig must be used within VehicleConfigProvider");
  return context;
}
