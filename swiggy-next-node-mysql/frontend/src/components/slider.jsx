"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { badge: "🍱 Food", title: "Delicious Food,", sub: "Fast Delivery", desc: "Fresh meals delivered to your door in 30 mins.", img: "image/photo-1512621776951-a57141f2eefd.jpeg", cta: "Order Now", link: "/" },
  { badge: "🥗 Healthy", title: "Eat Healthy,", sub: "Live Better", desc: "Wholesome meals from farm-fresh ingredients.", img: "image/QCV5sc9GZBmUFLYwsDVuBL-2047-80.jpeg", cta: "Explore Now", link: "/" },
  { badge: "🍔 Burgers", title: "Juicy Burgers,", sub: "Every Bite Counts", desc: "Handcrafted gourmet burgers made fresh.", img: "image/tasty-burger-fries-fast-food-wooden-plate-cinematic-scene-smoke-amber-dark-background-generative-ai-tasty-burger-323587014.jpeg", cta: "Order Now", link: "/" },
  { badge: "🍰 Desserts", title: "Sweet Endings,", sub: "Made with Love", desc: "Decadent desserts by expert pastry chefs.", img: "image/photo-1504674900247-0877df9cc836 (1).jpeg", cta: "Order Now", link: "/" },
];

export default function Slider() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setCur(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, [paused]);

  const prev = () => setCur(p => (p - 1 + slides.length) % slides.length);
  const next = () => setCur(p => (p + 1) % slides.length);

  return (
    <div className="hero-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, i) => (
        <div key={i} className={`hero-slide ${i === cur ? "active" : ""}`}>
          <img className="hero-slide-img" src={s.img} alt={s.title} />
          <div className="hero-slide-overlay" />
          <div className="hero-slide-content">
            <span className="hero-badge">{s.badge}</span>
            <h2>{s.title}<br /><span>{s.sub}</span></h2>
            <p>{s.desc}</p>
            <Link href={s.link} className="hero-cta">{s.cta} →</Link>
          </div>
        </div>
      ))}
      <button className="hero-arrow hero-arrow-left" onClick={prev}>‹</button>
      <button className="hero-arrow hero-arrow-right" onClick={next}>›</button>
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button key={i} className={`hero-dot ${i === cur ? "active" : ""}`} onClick={() => setCur(i)} />
        ))}
      </div>
    </div>
  );
}
