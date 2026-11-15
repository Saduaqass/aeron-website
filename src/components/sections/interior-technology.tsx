"use client";

import Image from "next/image";
import { BatteryCharging, PanelsTopLeft, Radar, Wifi } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/locales/locale-provider";

const interiorPositions = [{ x: "48%", y: "54%" }, { x: "63%", y: "57%" }, { x: "35%", y: "64%" }];
const technologyIcons = [Radar, PanelsTopLeft, BatteryCharging, Wifi];

export function InteriorSection() {
  const [activePoint, setActivePoint] = useState(0);
  const { copy } = useLocale();
  const points = copy.interior.points;
  const point = points[activePoint];

  return (
    <section id="interior" className="interior-section page-gutter" aria-labelledby="interior-title">
      <div className="interior-section__header">
        <p className="eyebrow">03 &nbsp; / &nbsp; {copy.interior.eyebrow}</p>
        <h2 id="interior-title" className="section-title">{copy.interior.title}</h2>
        <p className="body-copy">{copy.interior.copy}</p>
      </div>

      <div className="interior-visual">
        <Image src="/images/aeron-interior-concept.svg" alt={copy.interior.visualAlt} fill sizes="(max-width: 900px) 100vw, 90vw" priority={false} />
        {points.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`interior-hotspot${activePoint === index ? " is-active" : ""}`}
            style={{ left: interiorPositions[index].x, top: interiorPositions[index].y }}
            aria-label={item.label}
            aria-pressed={activePoint === index}
            onClick={() => setActivePoint(index)}
          ><span>{String(index + 1).padStart(2, "0")}</span></button>
        ))}
        <div className="interior-visual__caption"><span>AERON ONE / {copy.interior.caption}</span><span>{copy.interior.tag}</span></div>
      </div>

      <div className="interior-detail" aria-live="polite">
        <span className="eyebrow">0{activePoint + 1} &nbsp; / &nbsp; {copy.interior.detail}</span>
        <h3>{point.label}</h3>
        <p>{point.copy}</p>
      </div>
    </section>
  );
}

export function TechnologySection() {
  const { copy } = useLocale();
  const [titleLead, titleRest] = copy.technology.title.split("\n");
  return (
    <section id="technology" className="technology-section page-gutter" aria-labelledby="technology-title">
      <div className="technology-section__heading">
        <div>
          <p className="eyebrow">04 &nbsp; / &nbsp; {copy.technology.eyebrow}</p>
          <h2 id="technology-title" className="section-title">{titleLead}<br /><span>{titleRest}</span></h2>
        </div>
        <p className="body-copy">{copy.technology.copy}</p>
      </div>
      <div className="technology-grid">
        {copy.technology.cards.map(({ label, title, copy: description }, index) => {
          const Icon = technologyIcons[index];
          return (
          <article className="technology-card" key={label}>
            <div className="technology-card__top"><span>0{index + 1}</span><Icon size={19} strokeWidth={1.4} aria-hidden="true" /></div>
            <p className="eyebrow">{label}</p>
            <h3>{title}</h3>
            <p className="body-copy">{description}</p>
          </article>
          );
        })}
      </div>
      <p className="technology-disclaimer">{copy.technology.disclaimer}</p>
    </section>
  );
}
