"use client";
import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const items = [
  { name: "Fresh Vegetables", slug: "fresh-vegetables", img: "/image/bountiful-harvest-fresh-produce-rustic-basket_191095-79325-removebg-preview.png", tag: "Fresh" },
  { name: "Fresh Fruits",     slug: "fresh-fruits",     img: "/image/this-image-shows-a-beautiful-and-colorful-assortment-of-fresh-fruits-arranged-in-bowl_11005945-removebg-preview.png", tag: "Fresh" },
  { name: "Dairy Products",   slug: "dairy-products",   img: "/image/dairy-product-wicker-basket-30482236-removebg-preview.png", tag: "Daily" },
  { name: "Rice",             slug: "rice",             img: "/image/basket-of-rice-isolated-on-white-background-C1BNJ6-removebg-preview.png", tag: "Staple" },
  { name: "Masalas",          slug: "masalas",          img: "/image/71xmp5f-vgL._AC_UF894_1000_QL80_-removebg-preview.png", tag: "Spicy" },
  { name: "Oils & Ghee",      slug: "oils-and-ghee",    img: "/image/1_121_11zon-removebg-preview.png", tag: "Kitchen" },
  { name: "Munchies",         slug: "munchies",         img: "/image/snacks-hamper-masala-kaju-namkeen-260nw-2659023287-removebg-preview.png", tag: "Snacks" },
  { name: "Sweet Tooth",      slug: "sweet-tooth",      img: "/image/20200129040326_file_5e31acce81410_5e31adb4c3446-removebg-preview.png", tag: "Sweet" },
  { name: "Cold Drinks & Juices", slug: "cold-drinks-and-juices", img: "/image/vibrant-shopping-basket-filled-fresh-produce-beverages-red-overflowing-assortment-fruits-vegetables-bottled-430784164-removebg-preview.png", tag: "Drinks" },
  { name: "Biscuits & Cakes", slug: "biscuits-and-cakes", img: "/image/images-removebg-preview.png", tag: "Bakery" },
];

// Duplicate for seamless infinite loop
const allItems = [...items, ...items];

export default function Shopslider() {
  const trackRef  = useRef(null);
  const pausedRef = useRef(false);
  const posRef    = useRef(0);
  const rafRef    = useRef(null);

  const SPEED = 0.5; // px per frame — slow & smooth

  const animate = useCallback(() => {
    if (!trackRef.current) return;
    if (!pausedRef.current) {
      posRef.current += SPEED;
      const halfWidth = trackRef.current.scrollWidth / 2;
      if (posRef.current >= halfWidth) posRef.current = 0;
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const scrollLeft  = () => { posRef.current = Math.max(0, posRef.current - 170); };
  const scrollRight = () => { posRef.current += 170; };

  return (
    <section className="shop-section">
      <div className="shop-inner">
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Fresh groceries delivered in minutes ⚡</p>
          </div>
          <div className="section-nav">
            <button onClick={scrollLeft} aria-label="prev">‹</button>
            <button onClick={scrollRight} aria-label="next">›</button>
          </div>
        </div>

        {/* Overflow hidden wrapper — no scrollbar */}
        <div className="shop-viewport"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}>
          <div ref={trackRef} className="shop-track-infinite">
            {allItems.map((item, i) => (
              <Link key={`${item.slug}-${i}`} href={`/shop/${item.slug}`} className="shop-card-link">
                <div className="shop-card-box">
                  <div className="shop-card-img-wrap">
                    <img src={item.img} alt={item.name} loading="lazy" />
                  </div>
                  <div className="shop-card-info">
                    <div className="shop-card-name">{item.name}</div>
                    <span className="shop-card-tag">{item.tag}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
