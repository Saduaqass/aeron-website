"use client";

import dynamic from "next/dynamic";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { useVehicleConfig, vehicleColors, type CameraPreset, type InteriorColorId, type WheelStyle } from "@/lib/vehicle-config";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

const interiors: { id: InteriorColorId; name: string; color: string }[] = [
  { id: "charcoal", name: "Графит", color: "#292d32" },
  { id: "sand", name: "Құм", color: "#b7a895" },
  { id: "blue", name: "Түнгі көк", color: "#253345" },
];
const cameras: { id: CameraPreset; name: string }[] = [
  { id: "front", name: "Алдыңғы" },
  { id: "side", name: "Бүйір" },
  { id: "rear", name: "Артқы" },
];

export function ConfiguratorSection() {
  const { bodyColor, setBodyColor, interiorColor, setInteriorColor, wheelStyle, setWheelStyle, cameraPreset, setCameraPreset } = useVehicleConfig();
  const exterior = vehicleColors.find((color) => color.id === bodyColor) ?? vehicleColors[2];
  const interior = interiors.find((color) => color.id === interiorColor) ?? interiors[0];

  return (
    <section id="configurator" className="configurator-section page-gutter" aria-labelledby="configurator-title">
      <div className="configurator-section__heading">
        <p className="eyebrow">05 &nbsp; / &nbsp; ӨЗІҢІЗГЕ БЕЙІМДЕҢІЗ</p>
        <h2 id="configurator-title" className="section-title">Сіздің AERON ONE.</h2>
        <p className="body-copy">Түс, салон және дөңгелек үлгісін таңдап, өз конфигурацияңызды көріңіз.</p>
      </div>
      <div className="configurator-layout">
        <div className="configurator-preview">
          <VehicleViewer showControls={false} className="vehicle-canvas--configurator" />
          <span className="configurator-preview__label">{exterior.label.toUpperCase()} &nbsp; / &nbsp; AERON ONE</span>
        </div>

        <div className="configurator-options">
          <fieldset className="config-option">
            <legend><span>01</span> Кузов түсі <small>{exterior.label}</small></legend>
            <div className="config-swatches">
              {vehicleColors.map((color) => (
                <button
                  key={color.id}
                  className="config-swatch"
                  type="button"
                  style={{ "--swatch": color.value } as CSSProperties}
                  aria-label={color.label}
                  aria-pressed={bodyColor === color.id}
                  onClick={() => setBodyColor(color.id)}
                ><span>{bodyColor === color.id ? <Check size={14} aria-hidden="true" /> : null}</span></button>
              ))}
            </div>
          </fieldset>

          <fieldset className="config-option">
            <legend><span>02</span> Салон түсі <small>{interior.name}</small></legend>
            <div className="config-choice-row">
              {interiors.map((option) => (
                <button type="button" key={option.id} aria-pressed={interiorColor === option.id} onClick={() => setInteriorColor(option.id)}>
                  <i style={{ backgroundColor: option.color }} />{option.name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="config-option">
            <legend><span>03</span> Диск үлгісі <small>{wheelStyle === "aero" ? "Aero" : "Sport"}</small></legend>
            <div className="config-choice-row">
              {(["aero", "sport"] as const satisfies readonly WheelStyle[]).map((style) => (
                <button type="button" key={style} aria-pressed={wheelStyle === style} onClick={() => setWheelStyle(style)}>
                  <i className={`wheel-sample wheel-sample--${style}`} />{style === "aero" ? "Aero" : "Sport"}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="config-option">
            <legend><span>04</span> Ракурс</legend>
            <div className="config-choice-row">
              {cameras.map((camera) => (
                <button type="button" key={camera.id} aria-pressed={cameraPreset === camera.id} onClick={() => setCameraPreset(camera.id)}>{camera.name}</button>
              ))}
            </div>
          </fieldset>

          <div className="config-summary" aria-live="polite">
            <span className="eyebrow">СІЗДІҢ КОНФИГУРАЦИЯҢЫЗ</span>
            <p><strong>AERON ONE</strong><span>{exterior.label} · {interior.name} · {wheelStyle === "aero" ? "Aero" : "Sport"}</span></p>
            <small>Концепт-жоба. Баға және коммерциялық ұсыныс көрсетілмейді.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
