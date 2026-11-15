"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useLocale } from "@/locales/locale-provider";

const metricAmounts = [38, 600, 450, 24];
const metricDecimals = [1, 0, 0, 0];

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
  const { copy } = useLocale();
  const metrics = copy.performance.metrics;
  return (
    <section id="performance" className="performance-section page-gutter" aria-labelledby="performance-title">
      <div className="performance-section__header">
        <div>
          <p className="eyebrow">02 &nbsp; / &nbsp; {copy.performance.eyebrow}</p>
          <h2 id="performance-title" className="section-title">{copy.performance.title}</h2>
        </div>
        <p className="body-copy">{copy.performance.copy}</p>
      </div>

      <div className="performance-metrics">
        {metrics.map((metric, index) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-card__index">0{index + 1}</span>
            <p className="metric-card__label">{metric.label}</p>
            <MetricValue amount={metricAmounts[index]} decimals={metricDecimals[index]} unit={metric.unit} />
            <p className="metric-card__note">{metric.note}</p>
          </article>
        ))}
      </div>

      <div className="performance-band">
        <span className="eyebrow">{copy.performance.platform}</span>
        <p>{copy.performance.band} <span>{copy.performance.bandAccent}</span></p>
        <div className="performance-band__line" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
      <p className="performance-disclaimer">{copy.performance.disclaimer}</p>
    </section>
  );
}
