"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SHOP_CATEGORIES, FOOD_CATEGORIES, SHOP_ITEMS } from "../data/searchData";

const CITIES = [
  "Meerut, UP","Delhi","Noida","Ghaziabad","Hapur",
  "Muzaffarnagar","Dehradun","Haridwar","Saharanpur",
  "Roorkee","Bulandshahr","Gurugram","Faridabad",
];

// Build flat search index
const SEARCH_INDEX = [
  ...SHOP_CATEGORIES.map(c => ({
    label: c.label, icon: c.icon, type: "shop-cat",
    badge: "Category", badgeColor: "#0c831f",
    url: `/shop/${c.slug}`,
  })),
  ...FOOD_CATEGORIES.map(c => ({
    label: c.label, icon: c.icon, type: "food-cat",
    badge: "Food", badgeColor: "#e23744",
    url: `/food/${c.slug}`,
  })),
  ...SHOP_ITEMS.map(i => ({
    label: i.name, img: i.img, type: "item",
    badge: "Grocery", badgeColor: "#fc8019",
    price: i.price,
    url: `/shop/${i.category}`,
  })),
];

function doSearch(q) {
  if (!q || q.trim().length < 1) return [];
  const qLow = q.toLowerCase().trim();
  const results = SEARCH_INDEX.filter(item =>
    item.label.toLowerCase().includes(qLow)
  );
  // Sort: starts-with first, then contains
  results.sort((a, b) => {
    const aStarts = a.label.toLowerCase().startsWith(qLow) ? 0 : 1;
    const bStarts = b.label.toLowerCase().startsWith(qLow) ? 0 : 1;
    return aStarts - bStarts;
  });
  return results.slice(0, 10);
}

export default function Nabvar() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [modalType, setModalType]       = useState(null);
  const [currentUser, setCurrentUser]   = useState(null);
  const [error, setError]               = useState("");
  const [query, setQuery]               = useState("");
  const [results, setResults]           = useState([]);
  const [showResults, setShowResults]   = useState(false);
  const [selectedCity, setSelectedCity] = useState("Meerut, UP");
  const [cityDropOpen, setCityDropOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const cityRef   = useRef(null);
  const searchRef = useRef(null);
  const inputRef  = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (u) setCurrentUser(u);
    } catch {}
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const h = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setCityDropOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Live search as user types
  const handleQueryChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    setHighlightIdx(-1);
    if (q.trim().length >= 1) {
      setResults(doSearch(q));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Keyboard navigation in results
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) {
      if (e.key === "Enter") handleSearch();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0 && results[highlightIdx]) {
        goTo(results[highlightIdx]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  const goTo = (item) => {
    setShowResults(false);
    setQuery(item.label);
    router.push(item.url);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setShowResults(false);
    // Search page — go to best matching result
    const top = doSearch(query)[0];
    if (top) { router.push(top.url); }
  };

  const openModal = (type) => { setModalType(type); setError(""); setDrawerOpen(false); };
  const closeModal = () => { setModalType(null); setError(""); };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    if (!email || !password) { setError("Please fill all fields."); return; }
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user); closeModal();
    } catch (err) { setError(err.message); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    if (!name || !email || !password) { setError("Please fill all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user); closeModal();
    } catch (err) { setError(err.message); }
  };

  const handleLogout = () => { localStorage.removeItem("currentUser"); localStorage.removeItem("token"); setCurrentUser(null); };

  // Highlight matching text
  const highlight = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: "#fff3cd", borderRadius: 3, padding: "0 2px" }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <>
      <header className="nav-root">
        <div className="nav-inner">
          {/* LEFT */}
          <div className="nav-left">
            <Link href="/" className="nav-logo">
              <img src="/image/swiggylogo.png" alt="logo" className="nav-logo-img" />
              <span className="nav-logo-text">SWIGGY</span>
            </Link>
            <div ref={cityRef} className="nav-city-wrap">
              <button className="nav-city-btn" onClick={() => setCityDropOpen(!cityDropOpen)}>
                <span className="nav-city-dot" />
                <span className="nav-city-label">{selectedCity}</span>
                <span className="nav-city-arrow">{cityDropOpen ? "▲" : "▼"}</span>
              </button>
              {cityDropOpen && (
                <div className="nav-city-drop">
                  <div className="nav-city-drop-title">Select your city</div>
                  {CITIES.map(c => (
                    <button key={c} className={`nav-city-drop-item ${selectedCity === c ? "active" : ""}`}
                      onClick={() => { setSelectedCity(c); setCityDropOpen(false); }}>
                      📍 {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CENTER — Search with live dropdown */}
          <div className="nav-center" ref={searchRef}>
            <div className={`nav-search ${showResults && results.length > 0 ? "open" : ""}`}>
              <span className="nav-search-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for food, groceries, restaurants..."
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (query && results.length > 0) setShowResults(true); }}
                autoComplete="off"
              />
              <button className="nav-search-btn" onClick={handleSearch}>Search</button>
            </div>

            {/* Search Results Dropdown */}
            {showResults && results.length > 0 && (
              <div className="search-results-drop">
                <div className="search-results-header">
                  {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                </div>
                {results.map((item, i) => (
                  <button
                    key={i}
                    className={`search-result-item ${i === highlightIdx ? "highlighted" : ""}`}
                    onClick={() => goTo(item)}
                    onMouseEnter={() => setHighlightIdx(i)}
                  >
                    <div className="search-result-icon">
                      {item.img
                        ? <img src={item.img} alt={item.label} />
                        : <span>{item.icon}</span>}
                    </div>
                    <div className="search-result-info">
                      <span className="search-result-name">{highlight(item.label, query)}</span>
                      {item.price && <span className="search-result-price">{item.price}</span>}
                    </div>
                    <span className="search-result-badge"
                      style={{ background: item.badgeColor + "22", color: item.badgeColor, border: `1px solid ${item.badgeColor}44` }}>
                      {item.badge}
                    </span>
                    <span className="search-result-arrow">→</span>
                  </button>
                ))}
                {results.length === 0 && (
                  <div className="search-no-result">No results found for &ldquo;{query}&rdquo;</div>
                )}
              </div>
            )}

            {/* No results state */}
            {showResults && query.length >= 1 && results.length === 0 && (
              <div className="search-results-drop">
                <div className="search-no-result">😔 No results found for &ldquo;{query}&rdquo;</div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="nav-right">
            {currentUser ? (
              <>
                <div className="nav-user-chip">
                  <div className="nav-user-avatar">{currentUser.name?.[0]?.toUpperCase()}</div>
                  <span className="nav-user-name">{currentUser.name.split(" ")[0]}</span>
                </div>
                <button className="nav-logout" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="nav-btn nav-btn-outline" onClick={() => openModal("login")}>Login</button>
                <button className="nav-btn nav-btn-solid"  onClick={() => openModal("register")}>Sign Up</button>
              </>
            )}
          </div>

          <button className="nav-hamburger" onClick={() => setDrawerOpen(true)} aria-label="menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="nav-drawer">
          <div className="nav-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="nav-drawer-panel">
            <div className="nav-drawer-header">
              <span style={{ fontWeight: 900, fontSize: 18, color: "var(--primary)" }}>SWIGGY</span>
              <button className="nav-drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <div className="nav-drawer-search">
              <span>🔍</span>
              <input type="text" placeholder="Search food, groceries..."
                value={query} onChange={handleQueryChange}
                onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(); setDrawerOpen(false); }}} />
            </div>
            <div className="nav-drawer-city">
              <div className="nav-drawer-city-label">Delivery Location</div>
              <select className="nav-drawer-city-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="nav-drawer-actions">
              {currentUser ? (
                <>
                  <div className="nav-user-chip">
                    <div className="nav-user-avatar">{currentUser.name?.[0]?.toUpperCase()}</div>
                    <span>{currentUser.name}</span>
                  </div>
                  <button className="nav-logout" onClick={handleLogout} style={{ width:"100%", padding:"12px" }}>Logout</button>
                </>
              ) : (
                <>
                  <button className="nav-btn nav-btn-outline" style={{ width:"100%", padding:"13px" }} onClick={() => openModal("login")}>Login</button>
                  <button className="nav-btn nav-btn-solid"  style={{ width:"100%", padding:"13px" }} onClick={() => openModal("register")}>Sign Up</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {modalType && (
        <div className="nav-modal-overlay" onClick={closeModal}>
          <div className="nav-modal" onClick={e => e.stopPropagation()}>
            <button className="nav-modal-close" onClick={closeModal}>✕</button>
            <div className="nav-modal-logo">{modalType === "login" ? "👋" : "🎉"}</div>
            <h2>{modalType === "login" ? "Welcome back!" : "Create account"}</h2>
            <p className="nav-modal-sub">{modalType === "login" ? "Login to place orders" : "Join millions of happy customers"}</p>
            <form className="nav-modal-form" onSubmit={modalType === "login" ? handleLogin : handleRegister}>
              {modalType === "register" && <input className="nav-modal-input" type="text" name="name" placeholder="Full name" />}
              <input className="nav-modal-input" type="email" name="email" placeholder="Email address" />
              <input className="nav-modal-input" type="password" name="password" placeholder="Password (min 6 chars)" />
              {error && <div className="nav-modal-error">⚠️ {error}</div>}
              <button type="submit" className="nav-modal-submit">
                {modalType === "login" ? "Login →" : "Create Account →"}
              </button>
            </form>
            <p className="nav-modal-switch">
              {modalType === "login"
                ? (<>New here? <button onClick={() => { setModalType("register"); setError(""); }}>Create account</button></>)
                : (<>Already have account? <button onClick={() => { setModalType("login"); setError(""); }}>Login</button></>)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
