"use client";

import { useEffect, useState } from "react";

const START_DATE = new Date("2024-06-30T00:00:00");

interface TimeDetail {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  months: number;
  years: number;
}

export default function DdayCounter() {
  const [detail, setDetail] = useState<TimeDetail | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let years = now.getFullYear() - START_DATE.getFullYear();
      let months = now.getMonth() - START_DATE.getMonth();
      if (months < 0) {
        years--;
        months += 12;
      }

      setDetail({ days, hours, minutes, seconds, months: months + years * 12, years });
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!detail) return null;

  return (
    <div className="dday-container animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
      <div className="dday-label">Together</div>
      <div className="dday-number animate-pulse-soft">{detail.days}</div>
      <div className="dday-label">Days with you</div>
      <div className="dday-date">since 2024. 06. 30</div>

      <div className="dday-detail-grid">
        <div className="dday-detail-item">
          <span className="dday-detail-value">{detail.years}</span>
          <span className="dday-detail-unit">Years</span>
        </div>
        <div className="dday-detail-item">
          <span className="dday-detail-value">{detail.months}</span>
          <span className="dday-detail-unit">Months</span>
        </div>
        <div className="dday-detail-item">
          <span className="dday-detail-value">{String(detail.hours).padStart(2, "0")}</span>
          <span className="dday-detail-unit">Hours</span>
        </div>
        <div className="dday-detail-item">
          <span className="dday-detail-value">{String(detail.minutes).padStart(2, "0")}</span>
          <span className="dday-detail-unit">Min</span>
        </div>
        <div className="dday-detail-item">
          <span className="dday-detail-value">{String(detail.seconds).padStart(2, "0")}</span>
          <span className="dday-detail-unit">Sec</span>
        </div>
      </div>
    </div>
  );
}
