"use client";
import { useRef } from "react";
import Link from "next/link";

const row1 = [
  { name: "Cake",    img: "/image/Cake.png" },
  { name: "Idli",   img: "/image/Idli.png" },
  { name: "Paratha",img: "/image/Paratha.png" },
  { name: "Tea",    img: "/image/Tea.png" },
  { name: "Kachori",img: "/image/Kachori.png" },
  { name: "Dosa",   img: "/image/Dosa.png" },
  { name: "Samosa", img: "/image/Samosa.png" },
  { name: "Coffee", img: "/image/Coffee.png" },
];
const row2 = [
  { name: "Poha",   img: "/image/Poha.png" },
  { name: "Poori",  img: "/image/Poori.png" },
  { name: "Juice",  img: "/image/Juice.png" },
  { name: "Pakoda", img: "/image/Pakoda.png" },
  { name: "Lassi",  img: "/image/Lassi.png" },
  { name: "Salad",  img: "/image/Salad.png" },
  { name: "Biryani",img: "/image/Biryani.png" },
  { name: "Dhokla", img: "/image/Dhokla.png" },
];

export default function Foodoptions() {
  const scrollRef = useRef(null);
  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left:  360, behavior: "smooth" });

  return (
    <section className="wom-section">
      <div className="wom-inner">
        <div className="section-header">
          <div>
            <h2>What&#39;s on your mind?</h2>
            <p>Browse by category</p>
          </div>
          <div className="section-nav">
            <button onClick={scrollLeft} aria-label="prev">‹</button>
            <button onClick={scrollRight} aria-label="next">›</button>
          </div>
        </div>
        <div ref={scrollRef} className="wom-scroll">
          <div className="wom-rows">
            {[row1, row2].map((row, ri) => (
              <div key={ri} className="wom-row">
                {row.map((item) => (
                  <Link key={item.name} href={`/food/${item.name.toLowerCase()}`} className="wom-item">
                    <div className="wom-img-wrap">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
