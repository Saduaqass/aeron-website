"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useVehicleConfig, type CameraPreset } from "@/lib/vehicle-config";
import { useLocale } from "@/locales/locale-provider";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

const featureCameras: CameraPreset[] = ["detail", "side", "rear"];

export function DesignSection() {
  const [active, setActive] = useState(0);
  const { setCameraPreset } = useVehicleConfig();
  const { copy } = useLocale();
  const selected = copy.design.details[active];
  const [titleLead, titleRest] = copy.design.title.split("\n");

  return (
    <section id="design" className="design-section page-gutter" aria-labelledby="design-title">
      <div className="design-section__intro">
        <div>
          <p className="eyebrow">01 &nbsp; / &nbsp; {copy.design.eyebrow}</p>
          <h2 id="design-title" className="section-title">{titleLead}<br /><span>{titleRest}</span></h2>
        </div>
        <p className="body-copy">{copy.design.copy}</p>
      </div>

      <motion.div
        className="design-stage"
        initial={{ clipPath: "inset(0 0 18% 0 round 2px)", opacity: 0.7 }}
        whileInView={{ clipPath: "inset(0 0 0% 0 round 2px)", opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="design-stage__light design-stage__light--one" />
        <div className="design-stage__light design-stage__light--two" />
        <VehicleViewer showControls={false} className="vehicle-canvas--design" />
        <div className="design-stage__label"><span>{copy.design.aero}</span><strong>0.21*</strong></div>
        <div className="design-stage__caption"><span>{copy.design.concept}</span><span>AERON ONE / 01</span></div>
      </motion.div>

      <div className="design-details">
        <div className="design-details__list" role="group" aria-label={copy.design.index}>
          {copy.design.details.map((detail, index) => (
            <button
              key={detail.title}
              type="button"
              id={`design-tab-${index}`}
              aria-pressed={active === index}
              aria-controls="design-detail-panel"
              onClick={() => { setActive(index); setCameraPreset(featureCameras[index]); }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span><span>{detail.title}</span>
              {active === index ? <ArrowUpRight size={17} aria-hidden="true" /> : <ArrowDownRight size={17} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div id="design-detail-panel" className="design-details__copy" aria-live="polite" aria-labelledby={`design-tab-${active}`}>
          <p className="eyebrow">{String(active + 1).padStart(2, "0")} &nbsp; / &nbsp; {copy.design.index}</p>
          <h3>{selected.title}</h3>
          <p>{selected.copy}</p>
        </div>
      </div>
      <p className="design-footnote">{copy.design.disclaimer}</p>
    </section>
  );
}
