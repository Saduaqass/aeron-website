"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

const metrics = [
  { label: "0–100 км/сағ", amount: 38, decimals: 1, unit: "с", note: "Болжамды үдеу" },
  { label: "Жүріс қоры", amount: 600, decimals: 0, unit: "км", note: "Демонстрациялық бағалау" },
  { label: "Қуат", amount: 450, decimals: 0, unit: "кВт", note: "Концептуалды көрсеткіш" },
  { label: "Жылдам қуаттау", amount: 24, decimals: 0, unit: "мин", note: "15–80% шартты уақыт" },
];

function MetricValue({ amount, decimals, unit }: { amount: number; decimals: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => (latest / (decimals ? 10 : 1)).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const animation = animate(value, amount, { duration: 1.45, ease: [0.23, 1, 0.32, 1] });
    return () => animation.stop();
  }, [amount, inView, value]);

  return <span className="metric-value"><motion.span ref={ref}>{rounded}</motion.span><span>{unit}</span></span>;
}

export function PerformanceSection() {
  return (
    <section id="performance" className="performance-section page-gutter" aria-labelledby="performance-title">
      <div className="performance-section__header">
        <div>
          <p className="eyebrow">02 &nbsp; / &nbsp; ҚОЗҒАЛЫС ЖӘНЕ ҚУАТ</p>
          <h2 id="performance-title" className="section-title">Күш. Үнсіз түрде.</h2>
        </div>
        <p className="body-copy">Электр платформасы лезде жауап беріп, күнделікті сапарды тыныш әрі сенімді етеді.</p>
      </div>

      <div className="performance-metrics">
        {metrics.map((metric, index) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-card__index">0{index + 1}</span>
            <p className="metric-card__label">{metric.label}</p>
            <MetricValue amount={metric.amount} decimals={metric.decimals} unit={metric.unit} />
            <p className="metric-card__note">{metric.note}</p>
          </article>
        ))}
      </div>

      <div className="performance-band">
        <span className="eyebrow">AERON ELECTRIC PLATFORM</span>
        <p>Тыныш қуат. <span>Нақты жауап.</span></p>
        <div className="performance-band__line" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
      <p className="performance-disclaimer">Бұл — ойдан шығарылған концепт-көлік. Жоғарыдағы барлық сандар демонстрациялық сипатта, нақты сынақтан немесе инженерлік растаудан өтпеген.</p>
    </section>
  );
}
