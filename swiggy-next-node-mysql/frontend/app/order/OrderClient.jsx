"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./order.css";

const CITY_COORDS = {
  meerut:       { lat: 28.9845, lng: 77.7064, label: "Meerut" },
  delhi:        { lat: 28.6139, lng: 77.2090, label: "Delhi" },
  noida:        { lat: 28.5355, lng: 77.3910, label: "Noida" },
  ghaziabad:    { lat: 28.6692, lng: 77.4538, label: "Ghaziabad" },
  hapur:        { lat: 28.7306, lng: 77.7759, label: "Hapur" },
  muzaffarnagar:{ lat: 29.4727, lng: 77.7085, label: "Muzaffarnagar" },
  dehradun:     { lat: 30.3165, lng: 78.0322, label: "Dehradun" },
  haridwar:     { lat: 29.9457, lng: 78.1642, label: "Haridwar" },
  saharanpur:   { lat: 29.9671, lng: 77.5510, label: "Saharanpur" },
  roorkee:      { lat: 29.8543, lng: 77.8880, label: "Roorkee" },
  bulandshahr:  { lat: 28.4069, lng: 77.8498, label: "Bulandshahr" },
  gurugram:     { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  faridabad:    { lat: 28.4089, lng: 77.3178, label: "Faridabad" },
};

function findCity(text) {
  const v = String(text || "").toLowerCase();
  return Object.keys(CITY_COORDS).find(c => v.includes(c)) || "meerut";
}

function distanceKm(from, to) {
  const f = CITY_COORDS[from] || CITY_COORDS.meerut;
  const t = CITY_COORDS[to]   || CITY_COORDS.meerut;
  const R = 6371;
  const dLat = ((t.lat - f.lat) * Math.PI) / 180;
  const dLng = ((t.lng - f.lng) * Math.PI) / 180;
  const lat1 = (f.lat * Math.PI) / 180;
  const lat2 = (t.lat * Math.PI) / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
  return Math.max(1, Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))));
}

function estimateDelivery(km) {
  const min = Math.max(15, Math.round(10 + km * 3));
  const max = min + (km <= 5 ? 10 : km <= 25 ? 15 : 25);
  return `${min}-${max} minutes`;
}

// Parse price string like "₹90/bottle" or "₹180/kg" → number
function parseUnitPrice(priceStr) {
  const match = String(priceStr || "0").replace(/,/g, "").match(/[\d]+/);
  return match ? parseInt(match[0]) : 0;
}

export default function OrderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const product = useMemo(() => ({
    productName:    searchParams.get("productName") || "Food Item",
    price:          searchParams.get("price")        || "₹0",
    category:       searchParams.get("category")     || "Food",
    image:          searchParams.get("image")        || "",
    vendorLocation: searchParams.get("location")     || "Meerut",
  }), [searchParams]);

  const unitPrice = parseUnitPrice(product.price);

  const [form, setForm]       = useState({ customerName: "", phone: "", address: "", quantity: 1 });
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (u?.name) setForm(p => ({ ...p, customerName: u.name }));
    } catch {}
  }, []);

  const qty           = Math.max(1, parseInt(form.quantity) || 1);
  const totalPrice    = unitPrice * qty;
  const vendorCity    = findCity(product.vendorLocation);
  const deliveryCity  = findCity(form.address);
  const km            = distanceKm(vendorCity, deliveryCity);
  const deliveryTime  = estimateDelivery(km);
  const vendorLabel   = CITY_COORDS[vendorCity]?.label || "Meerut";
  const deliveryLabel = form.address.trim() ? (CITY_COORDS[deliveryCity]?.label || deliveryCity) : "—";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value }));
  };

  // Quantity stepper handlers
  const decQty = () => setForm(p => ({ ...p, quantity: Math.max(1, p.quantity - 1) }));
  const incQty = () => setForm(p => ({ ...p, quantity: Math.min(20, p.quantity + 1) }));

  const placeOrder = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    const phone = form.phone.trim();
    if (!form.customerName.trim() || !phone || !form.address.trim()) {
      setError("Please fill your name, phone and address."); return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number."); return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          ...product,
          ...form,
          totalPrice,
          deliveryTime,
          distanceKm: km,
          vendorLocation: vendorLabel,
          deliveryCity: deliveryLabel,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");
      setMessage(`🎉 Order confirmed! Order #${data.order.id} placed. Total ₹${totalPrice}. Delivery in ${deliveryTime}.`);
      setForm(p => ({ ...p, phone: "", address: "", quantity: 1 }));
    } catch (err) {
      setError(err.message || "Failed to place order. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="order-page">
      <div className="order-page-header">
        <div className="order-page-header-inner">
          <button className="order-back" onClick={() => router.back()}>← Back</button>
          <h1 className="order-page-title">Place Order</h1>
        </div>
      </div>

      <div className="order-body">
        <div className="order-card">
          {/* ── Product Summary ── */}
          <div className="order-product-col">
            {product.image && (
              <div className="order-product-img">
                <img src={product.image} alt={product.productName} />
              </div>
            )}
            <div className="order-product-info">
              <h2>{product.productName}</h2>

              {/* Price breakdown */}
              <div className="order-price-breakdown">
                <div className="order-price-row">
                  <span>Unit Price</span>
                  <span>₹{unitPrice}</span>
                </div>
                <div className="order-price-row">
                  <span>Qty</span>
                  <span>× {qty}</span>
                </div>
                <div className="order-price-total">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <p className="order-product-cat">📦 {product.category}</p>
              <div className="order-eta-box">
                <div className="order-eta-row">
                  <span className="order-eta-label">Vendor City</span>
                  <span className="order-eta-value">📍 {vendorLabel}</span>
                </div>
                <div className="order-eta-row">
                  <span className="order-eta-label">Distance</span>
                  <span className="order-eta-value">{km} km</span>
                </div>
                <div className="order-eta-row">
                  <span className="order-eta-label">Est. Delivery</span>
                  <span className="order-eta-value">⏱ {deliveryTime}</span>
                </div>
                <p className="order-eta-note">💡 Type your city in address (Meerut, Delhi, Noida etc.) — ETA updates live!</p>
              </div>
            </div>
          </div>

          {/* ── Order Form ── */}
          <div className="order-form-col">
            <h3>🧾 Delivery Details</h3>
            <form className="order-form" onSubmit={placeOrder}>
              <div className="order-form-group">
                <label>Your Name</label>
                <input className="order-input" name="customerName" placeholder="Enter your full name" value={form.customerName} onChange={handleChange} />
              </div>
              <div className="order-form-group">
                <label>Phone Number</label>
                <input className="order-input" name="phone" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} maxLength="10" />
              </div>
              <div className="order-form-group">
                <label>Delivery Address</label>
                <textarea className="order-textarea" name="address" placeholder="Full address with city (e.g. Shastri Nagar, Meerut)" value={form.address} onChange={handleChange} />
              </div>

              {/* ── Quantity Stepper ── */}
              <div className="order-form-group">
                <label>Quantity</label>
                <div className="order-qty-stepper">
                  <button type="button" className="order-qty-btn" onClick={decQty} disabled={qty <= 1}>−</button>
                  <span className="order-qty-val">{qty}</span>
                  <button type="button" className="order-qty-btn" onClick={incQty} disabled={qty >= 20}>+</button>
                  <div className="order-qty-total">= <strong>₹{totalPrice}</strong></div>
                </div>
              </div>

              {/* Live route bar */}
              {form.address.trim() && (
                <div className="live-route-box">
                  <div className="live-route-city">
                    <div className="city-label">From</div>
                    <div className="city-value">{vendorLabel}</div>
                  </div>
                  <span className="live-route-arrow">→</span>
                  <div className="live-route-city">
                    <div className="city-label">To</div>
                    <div className="city-value">{deliveryLabel}</div>
                  </div>
                  <span className="live-route-arrow">·</span>
                  <div className="live-route-eta">
                    <div className="city-label">ETA</div>
                    <div className="city-value">{deliveryTime}</div>
                  </div>
                </div>
              )}

              {error   && <div className="order-error">⚠️ {error}</div>}
              {message && <div className="order-success">{message}</div>}

              <button type="submit" className="order-submit" disabled={loading}>
                {loading ? "Placing Order..." : `Confirm Order • ₹${totalPrice}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
