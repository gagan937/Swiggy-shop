"use client";
import { useState } from "react";

const offers = [
  { emoji: "🍔", title: "Burgers & More", sub: "Up to 40% off", color: "#fff4eb", border: "#ffe0c4", badge: "Popular", badgeColor: "#fc8019", code: "BURGER40", discount: "40%" },
  { emoji: "🍕", title: "Pizza Deals",    sub: "Buy 1 Get 1 Free", color: "#fff0f1", border: "#ffd6d9", badge: "Hot",     badgeColor: "#e23744", code: "PIZZA2X",  discount: "BOGO" },
  { emoji: "⚡", title: "Blinkit Grocery",sub: "10 min delivery", color: "#e8f5e9", border: "#c8eac8", badge: "Fast",    badgeColor: "#0c831f", code: "QUICK10",  discount: "Free Delivery" },
  { emoji: "🧋", title: "Beverages",      sub: "Min ₹99 off",     color: "#e8f4fd", border: "#b8d8f0", badge: "New",     badgeColor: "#1976d2", code: "DRINK99",  discount: "₹99 off" },
];

export default function OffersStrip() {
  const [modal, setModal] = useState(null); // selected offer
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => { setBooked(false); setModal(null); }, 2000);
  };

  return (
    <>
      <section style={{ background: "white", padding: "28px 0", borderBottom: "8px solid var(--bg)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "var(--dark)", fontFamily: "var(--font)" }}>Best Offers For You</h2>
              <p style={{ fontSize: 13, color: "var(--gray)", marginTop: 3, fontWeight: 500 }}>Deals that you don&apos;t want to miss</p>
            </div>
            <button onClick={() => setModal(offers[0])} style={{ fontSize: 13, fontWeight: 800, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font)" }}>See all →</button>
          </div>
          <div className="offers-grid">
            {offers.map((o, i) => (
              <button key={i} className="offer-card"
                style={{ background: o.color, border: `2px solid ${o.border}` }}
                onClick={() => setModal(o)}>
                <span className="offer-emoji">{o.emoji}</span>
                <div className="offer-body">
                  <div className="offer-title-row">
                    <span className="offer-title">{o.title}</span>
                    <span className="offer-badge" style={{ background: o.badgeColor }}>{o.badge}</span>
                  </div>
                  <p className="offer-sub">{o.sub}</p>
                  <span className="offer-tap">Tap to claim →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Modal */}
      {modal && (
        <div className="offer-modal-overlay" onClick={() => { setModal(null); setBooked(false); }}>
          <div className="offer-modal" onClick={e => e.stopPropagation()}>
            <button className="offer-modal-close" onClick={() => { setModal(null); setBooked(false); }}>✕</button>
            <div className="offer-modal-emoji">{modal.emoji}</div>
            <h2 className="offer-modal-title">{modal.title}</h2>
            <p className="offer-modal-sub">{modal.sub}</p>
            <div className="offer-modal-code-box">
              <span className="offer-modal-code-label">Coupon Code</span>
              <span className="offer-modal-code">{modal.code}</span>
              <span className="offer-modal-discount">{modal.discount}</span>
            </div>
            {booked ? (
              <div className="offer-modal-success">🎉 Offer Booked! Code copied: <b>{modal.code}</b></div>
            ) : (
              <button className="offer-modal-btn" onClick={handleBook}>Book This Offer</button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .offers-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media(max-width:900px){ .offers-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:500px){ .offers-grid { grid-template-columns: 1fr; } }

        .offer-card {
          border-radius: 14px; padding: 18px 16px;
          cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; gap: 14px;
          text-align: left; width: 100%; font-family: var(--font);
        }
        .offer-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .offer-emoji { font-size: 38px; flex-shrink: 0; }
        .offer-body { flex: 1; min-width: 0; }
        .offer-title-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
        .offer-title { font-size: 15px; font-weight: 900; color: var(--dark); }
        .offer-badge { font-size: 10px; font-weight: 800; color: white; padding: 2px 8px; border-radius: 20px; white-space: nowrap; }
        .offer-sub { font-size: 13px; font-weight: 600; color: var(--gray); margin-bottom: 6px; }
        .offer-tap { font-size: 11px; font-weight: 700; color: var(--primary); }

        .offer-modal-overlay { position: fixed; inset: 0; z-index: 400; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s; }
        .offer-modal { background: white; border-radius: 20px; width: 100%; max-width: 400px; padding: 36px; position: relative; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.25); animation: popUp 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .offer-modal-close { position: absolute; top: 14px; right: 14px; background: var(--light-gray); border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 15px; cursor: pointer; color: var(--gray); display: flex; align-items: center; justify-content: center; }
        .offer-modal-emoji { font-size: 52px; margin-bottom: 10px; }
        .offer-modal-title { font-size: 22px; font-weight: 900; color: var(--dark); margin-bottom: 6px; }
        .offer-modal-sub { font-size: 14px; color: var(--gray); font-weight: 500; margin-bottom: 20px; }
        .offer-modal-code-box { background: var(--light-gray); border: 2px dashed var(--border); border-radius: 12px; padding: 16px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px; align-items: center; }
        .offer-modal-code-label { font-size: 11px; font-weight: 700; color: var(--gray); text-transform: uppercase; }
        .offer-modal-code { font-size: 24px; font-weight: 900; color: var(--primary); letter-spacing: 2px; font-family: monospace; }
        .offer-modal-discount { font-size: 13px; font-weight: 700; color: var(--blinkit); }
        .offer-modal-btn { width: 100%; padding: 14px; background: var(--primary); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 900; font-family: var(--font); cursor: pointer; transition: all 0.2s; }
        .offer-modal-btn:hover { background: var(--primary-dark); transform: translateY(-2px); }
        .offer-modal-success { background: #e8f5e9; border: 1px solid #c8eac8; color: #1b5e20; border-radius: 10px; padding: 14px; font-size: 14px; font-weight: 700; }
      `}</style>
    </>
  );
}
