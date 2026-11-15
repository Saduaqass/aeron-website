"use client";

import Image from "next/image";
import { BatteryCharging, PanelsTopLeft, Radar, Wifi } from "lucide-react";
import { useState } from "react";

const interiorPoints = [
  { label: "Кең форматты цифрлық панель", copy: "Маңызды ақпарат бір қарағанда түсінікті орналасады.", x: "48%", y: "54%" },
  { label: "Жүргізушіге бағытталған басқару", copy: "Негізгі функциялар қол жететін жерде қалады.", x: "63%", y: "57%" },
  { label: "Жұмсақ салон жарығы", copy: "Реттелетін жарық кешкі сапарға жайлы атмосфера береді.", x: "35%", y: "64%" },
];

const technologies = [
  { icon: Radar, label: "Жүргізушіге көмек", title: "Назарды қолдайды", copy: "Көмекші жүйелер жағдайды бақылайды. Жүргізуші басқаруды толық сақтайды." },
  { icon: PanelsTopLeft, label: "Цифрлық кокпит", title: "Ақпарат анық көрінеді", copy: "Панель мен орталық экран күнделікті басқаруды бір интерфейске жинайды." },
  { icon: BatteryCharging, label: "Энергия жүйесі", title: "Қуатты ұқыпты бөледі", copy: "Энергияны жоспарлау маршрут пен жүргізу жағдайына сай бейімделеді." },
  { icon: Wifi, label: "Байланыс", title: "Көлік әрдайым жақын", copy: "Қосылған қызметтер мен мобильді басқару — концепцияның цифрлық қабаты." },
];

export function InteriorSection() {
  const [activePoint, setActivePoint] = useState(0);
  const point = interiorPoints[activePoint];

  return (
    <section id="interior" className="interior-section page-gutter" aria-labelledby="interior-title">
      <div className="interior-section__header">
        <p className="eyebrow">03 &nbsp; / &nbsp; ІШКІ КЕҢІСТІК</p>
        <h2 id="interior-title" className="section-title">Кеңістікке тыныштық.</h2>
        <p className="body-copy">Әр сапарға жеңілдік беретін, цифрлық құралдары назарды шашыратпайтын интерьер концепциясы.</p>
      </div>

      <div className="interior-visual">
        <Image src="/images/aeron-interior-concept.svg" alt="AERON ONE цифрлық интерьерінің авторлық концепт-иллюстрациясы" fill sizes="(max-width: 900px) 100vw, 90vw" priority={false} />
        {interiorPoints.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`interior-hotspot${activePoint === index ? " is-active" : ""}`}
            style={{ left: item.x, top: item.y }}
            aria-label={item.label}
            aria-pressed={activePoint === index}
            onClick={() => setActivePoint(index)}
          ><span>{String(index + 1).padStart(2, "0")}</span></button>
        ))}
        <div className="interior-visual__caption"><span>AERON ONE / INTERIOR STUDY</span><span>CONCEPT VISUALIZATION</span></div>
      </div>

      <div className="interior-detail" aria-live="polite">
        <span className="eyebrow">0{activePoint + 1} &nbsp; / &nbsp; ИНТЕРЬЕР БӨЛШЕГІ</span>
        <h3>{point.label}</h3>
        <p>{point.copy}</p>
      </div>
    </section>
  );
}

export function TechnologySection() {
  return (
    <section id="technology" className="technology-section page-gutter" aria-labelledby="technology-title">
      <div className="technology-section__heading">
        <div>
          <p className="eyebrow">04 &nbsp; / &nbsp; ТЕХНОЛОГИЯ</p>
          <h2 id="technology-title" className="section-title">Технология<br /><span>адам үшін.</span></h2>
        </div>
        <p className="body-copy">Әр цифрлық шешім жүргізушіге көмектесіп, назарды жолда ұстауға арналған.</p>
      </div>
      <div className="technology-grid">
        {technologies.map(({ icon: Icon, label, title, copy }, index) => (
          <article className="technology-card" key={label}>
            <div className="technology-card__top"><span>0{index + 1}</span><Icon size={19} strokeWidth={1.4} aria-hidden="true" /></div>
            <p className="eyebrow">{label}</p>
            <h3>{title}</h3>
            <p className="body-copy">{copy}</p>
          </article>
        ))}
      </div>
      <p className="technology-disclaimer">Жүргізушіге көмек көрсету концептуалды сипатта. Бұл бөлім толық автономды жүргізу мүмкіндігін білдірмейді.</p>
    </section>
  );
}
