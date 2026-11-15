"use client";

import dynamic from "next/dynamic";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { useVehicleConfig, vehicleColors, type CameraPreset, type InteriorColorId, type WheelStyle } from "@/lib/vehicle-config";
import { useLocale } from "@/locales/locale-provider";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

const interiors: { id: InteriorColorId; color: string }[] = [
  { id: "charcoal", color: "#292d32" }, { id: "sand", color: "#b7a895" }, { id: "blue", color: "#253345" },
];
const cameras: CameraPreset[] = ["front", "side", "rear"];

export function ConfiguratorSection() {
  const { bodyColor, setBodyColor, interiorColor, setInteriorColor, wheelStyle, setWheelStyle, cameraPreset, setCameraPreset } = useVehicleConfig();
  const { copy } = useLocale();
  const exterior = vehicleColors.find((color) => color.id === bodyColor) ?? vehicleColors[2];
  const exteriorName = copy.vehicle.colors[vehicleColors.findIndex((color) => color.id === exterior.id)];
  const interiorIndex = interiors.findIndex((color) => color.id === interiorColor);
  const interiorName = copy.configurator.interiors[interiorIndex < 0 ? 0 : interiorIndex];

  return (
    <section id="configurator" className="configurator-section page-gutter" aria-labelledby="configurator-title">
      <div className="configurator-section__heading">
        <p className="eyebrow">05 &nbsp; / &nbsp; {copy.configurator.eyebrow}</p>
        <h2 id="configurator-title" className="section-title">{copy.configurator.title}</h2>
        <p className="body-copy">{copy.configurator.copy}</p>
      </div>
      <div className="configurator-layout">
        <div className="configurator-preview">
          <VehicleViewer showControls={false} className="vehicle-canvas--configurator" />
          <span className="configurator-preview__label">{exteriorName.toUpperCase()} &nbsp; / &nbsp; AERON ONE</span>
        </div>

        <div className="configurator-options">
          <fieldset className="config-option">
            <legend><span>01</span> {copy.configurator.exterior} <small>{exteriorName}</small></legend>
            <div className="config-swatches">
              {vehicleColors.map((color, index) => (
                <button
                  key={color.id}
                  className="config-swatch"
                  type="button"
                  style={{ "--swatch": color.value } as CSSProperties}
                  aria-label={copy.vehicle.colors[index]}
                  aria-pressed={bodyColor === color.id}
                  onClick={() => setBodyColor(color.id)}
                ><span>{bodyColor === color.id ? <Check size={14} aria-hidden="true" /> : null}</span></button>
              ))}
            </div>
          </fieldset>

          <fieldset className="config-option">
            <legend><span>02</span> {copy.configurator.interior} <small>{interiorName}</small></legend>
            <div className="config-choice-row">
              {interiors.map((option, index) => (
                <button type="button" key={option.id} aria-pressed={interiorColor === option.id} onClick={() => setInteriorColor(option.id)}>
                  <i style={{ backgroundColor: option.color }} />{copy.configurator.interiors[index]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="config-option">
            <legend><span>03</span> {copy.configurator.wheels} <small>{wheelStyle === "aero" ? copy.configurator.wheelsAero : copy.configurator.wheelsSport}</small></legend>
            <div className="config-choice-row">
              {(["aero", "sport"] as const satisfies readonly WheelStyle[]).map((style) => (
                <button type="button" key={style} aria-pressed={wheelStyle === style} onClick={() => setWheelStyle(style)}>
                  <i className={`wheel-sample wheel-sample--${style}`} />{style === "aero" ? copy.configurator.wheelsAero : copy.configurator.wheelsSport}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="config-option">
            <legend><span>04</span> {copy.configurator.view}</legend>
            <div className="config-choice-row">
              {cameras.map((camera, index) => (
                <button type="button" key={camera} aria-pressed={cameraPreset === camera} onClick={() => setCameraPreset(camera)}>{copy.vehicle.cameras[index]}</button>
              ))}
            </div>
          </fieldset>

          <div className="config-summary" aria-live="polite">
            <span className="eyebrow">{copy.configurator.summary}</span>
            <p><strong>AERON ONE</strong><span>{exteriorName} · {interiorName} · {wheelStyle === "aero" ? copy.configurator.wheelsAero : copy.configurator.wheelsSport}</span></p>
            <small>{copy.configurator.concept}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
