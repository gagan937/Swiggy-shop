"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const VENDOR = { lat: 28.9845, lng: 77.7064 };

const allCities = [
  { name: "Meerut",        lat: 28.9845, lng: 77.7064, icon: "🏙️", state: "UP",    hasSpecials: true  },
  { name: "Delhi",         lat: 28.6139, lng: 77.2090, icon: "🌆", state: "Delhi", hasSpecials: true  },
  { name: "Agra",          lat: 27.1767, lng: 78.0081, icon: "🏛️", state: "UP",    hasSpecials: true  },
  { name: "Mathura",       lat: 27.4924, lng: 77.6737, icon: "🛕", state: "UP",    hasSpecials: true  },
  { name: "Noida",         lat: 28.5355, lng: 77.3910, icon: "🏢", state: "UP",    hasSpecials: true  },
  { name: "Ghaziabad",     lat: 28.6692, lng: 77.4538, icon: "🏗️", state: "UP",    hasSpecials: true  },
  { name: "Hapur",         lat: 28.7306, lng: 77.7759, icon: "🏘️", state: "UP",    hasSpecials: false },
  { name: "Muzaffarnagar", lat: 29.4727, lng: 77.7085, icon: "🌿", state: "UP",    hasSpecials: true  },
  { name: "Dehradun",      lat: 30.3165, lng: 78.0322, icon: "⛰️", state: "UK",    hasSpecials: true  },
  { name: "Haridwar",      lat: 29.9457, lng: 78.1642, icon: "🛕", state: "UK",    hasSpecials: true  },
  { name: "Saharanpur",    lat: 29.9671, lng: 77.5510, icon: "🌳", state: "UP",    hasSpecials: false },
  { name: "Roorkee",       lat: 29.8543, lng: 77.8880, icon: "🎓", state: "UK",    hasSpecials: false },
  { name: "Bulandshahr",   lat: 28.4069, lng: 77.8498, icon: "🏡", state: "UP",    hasSpecials: false },
  { name: "Gurugram",      lat: 28.4595, lng: 77.0266, icon: "🏙️", state: "HR",    hasSpecials: false },
];

function distanceKm(from, to) {
  const R = 6371;
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(from.lat*Math.PI/180)*Math.cos(to.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}
function eta(km) {
  if (km <= 5)   return "25-35 mins";
  if (km <= 20)  return "35-50 mins";
  if (km <= 50)  return "50-75 mins";
  if (km <= 100) return "1.5-2 hrs";
  return "2-3 hrs";
}

export default function FoodDilevery() {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cities = showAll ? allCities : allCities.slice(0, 8);

  const handleCityClick = (city) => {
    setSelected(city);
    if (city.hasSpecials) {
      setTimeout(() => router.push(`/city-specials?city=${encodeURIComponent(city.name)}`), 300);
    }
  };

  return (
    <>
      <section ref={sectionRef} className="delivery-section"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: "all 0.7s ease" }}>
        <div className="delivery-inner">
          <div className="section-header">
            <div>
              <h2>We deliver to your city</h2>
              <p>Order from {allCities.length}+ cities — click a city to see its famous specials 🍬🍎</p>
            </div>
          </div>
          <div className="delivery-grid">
            {cities.map((city) => {
              const km = distanceKm(VENDOR, city);
              const time = eta(km);
              return (
                <button key={city.name}
                  className={`city-card ${selected?.name === city.name ? "active" : ""}`}
                  onClick={() => handleCityClick(city)}>
                  <div className="city-card-icon">{city.icon}</div>
                  <div className="city-card-name">{city.name}</div>
                  <div className="city-card-state">{city.state}</div>
                  <div className="city-card-sub">⏱ {time}</div>
                  <div className="city-card-km">{km} km</div>
                  {city.hasSpecials && (
                    <div className="city-card-special-badge">🍬 Specials</div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="delivery-show-btn">
            <button className="delivery-toggle" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : `Show All ${allCities.length} Cities`}
              <span className={`delivery-chevron ${showAll ? "open" : ""}`}>▼</span>
            </button>
          </div>
        </div>
      </section>

      {selected && (
        <div className="city-toast" onClick={() => setSelected(null)}>
          📍 <b>{selected.name}</b> — {eta(distanceKm(VENDOR, selected))}
          {selected.hasSpecials ? " · 🍬 Loading city specials..." : ""} &nbsp; ✕
        </div>
      )}

      <style>{`
        .city-card { background:white; border:2px solid var(--border); border-radius:14px; padding:16px 10px; text-align:center; cursor:pointer; transition:all 0.25s; font-family:var(--font); width:100%; }
        .city-card:hover { border-color:var(--primary); box-shadow:0 4px 16px rgba(226,55,68,0.12); transform:translateY(-3px); }
        .city-card.active { border-color:var(--primary); background:var(--primary-light); }
        .city-card-state { font-size:10px; color:var(--gray); font-weight:700; margin-bottom:3px; text-transform:uppercase; letter-spacing:0.5px; }
        .city-card-km { font-size:11px; color:var(--primary); font-weight:800; margin-top:2px; }
        .city-card-special-badge { margin-top:6px; display:inline-block; background:var(--yellow); color:#000; border-radius:20px; padding:2px 10px; font-size:10px; font-weight:800; }
        .city-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--dark); color:white; padding:12px 24px; border-radius:30px; font-size:14px; font-weight:600; font-family:var(--font); z-index:500; cursor:pointer; box-shadow:0 4px 20px rgba(0,0,0,0.3); animation:slideUp 0.3s ease; white-space:nowrap; }
        @keyframes slideUp { from{opacity:0;transform:translateX(-50%) translateY(20px);}to{opacity:1;transform:translateX(-50%) translateY(0);} }
      `}</style>
    </>
  );
}
