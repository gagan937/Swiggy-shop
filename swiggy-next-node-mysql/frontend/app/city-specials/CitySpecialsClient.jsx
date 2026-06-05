"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CitySpecialsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData]           = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [tab, setTab]             = useState("mithai"); // "mithai" | "fruits"
  const [items, setItems]         = useState({});       // { cityName: { mithai:[...], fruits:[...] } }
  const [cart, setCart]           = useState([]);       // [{ ...item, qty, city }]
  const [showCart, setShowCart]   = useState(false);
  const [addModal, setAddModal]   = useState(false);
  const [bookModal, setBookModal] = useState(null);     // item being booked
  const [booked, setBooked]       = useState(false);
  const [newItem, setNewItem]     = useState({ name:"", price:"", desc:"", img:"" });
  const [imgPreview, setImgPreview] = useState("");
  const fileRef = useRef();

  // Load JSON on mount
  useEffect(() => {
    fetch("/data/citySpecials.json")
      .then(r => r.json())
      .then(d => {
        setData(d);
        // Init items from JSON
        const init = {};
        Object.entries(d.cities).forEach(([city, val]) => {
          init[city] = { mithai: [...val.mithai], fruits: [...val.fruits] };
        });
        setItems(init);
        const urlCity = searchParams.get("city");
        const firstCity = Object.keys(d.cities)[0];
        setSelectedCity(urlCity && d.cities[urlCity] ? urlCity : firstCity);
      });
  }, []);

  if (!data || !selectedCity) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontSize:32 }}>⏳ Loading...</div>
    </div>
  );

  const offer     = data.offerPercent;
  const cityList  = Object.entries(data.cities);
  const cityMeta  = data.cities[selectedCity];
  const cityItems = items[selectedCity] || { mithai:[], fruits:[] };
  const tabItems  = cityItems[tab] || [];

  // ── Cart helpers ──
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => {
    const n = parseInt(String(c.price).replace(/[^0-9]/g,"")) || 0;
    return s + n * c.qty;
  }, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id && c.city === selectedCity);
      if (ex) return prev.map(c => c.id === item.id && c.city === selectedCity ? {...c, qty: c.qty+1} : c);
      return [...prev, { ...item, city: selectedCity, qty: 1 }];
    });
  };
  const decCart = (id) => setCart(prev =>
    prev.map(c => c.id === id ? {...c, qty: c.qty - 1} : c).filter(c => c.qty > 0)
  );
  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));

  // ── Delete item ──
  const deleteItem = (id) => {
    setItems(prev => ({
      ...prev,
      [selectedCity]: {
        ...prev[selectedCity],
        [tab]: prev[selectedCity][tab].filter(i => i.id !== id)
      }
    }));
    removeFromCart(id);
  };

  // ── Add item ──
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImgPreview(ev.target.result); setNewItem(p => ({...p, img: ev.target.result})); };
    reader.readAsDataURL(file);
  };

  const submitAdd = () => {
    if (!newItem.name || !newItem.price) return;
    const id = `custom_${Date.now()}`;
    const item = { id, name: newItem.name, price: newItem.price, desc: newItem.desc || "Custom item", location: selectedCity, img: newItem.img || "/image/sweet1.png" };
    setItems(prev => ({
      ...prev,
      [selectedCity]: { ...prev[selectedCity], [tab]: [...prev[selectedCity][tab], item] }
    }));
    setNewItem({ name:"", price:"", desc:"", img:"" });
    setImgPreview("");
    setAddModal(false);
  };

  // ── Book ──
  const handleBook = (item) => { setBookModal(item); setBooked(false); };
  const confirmBook = () => {
    addToCart(bookModal);
    setBooked(true);
    setTimeout(() => setBookModal(null), 1800);
  };

  // ── Price with offer ──
  const discountedPrice = (priceStr) => {
    const num = parseInt(String(priceStr).replace(/[^0-9]/g,"")) || 0;
    const unit = String(priceStr).replace(/[0-9₹]/g,"").trim();
    const after = Math.round(num * (1 - offer/100));
    return { original: `₹${num}${unit}`, discounted: `₹${after}${unit}` };
  };

  const cartQty = (id) => cart.find(c => c.id === id && c.city === selectedCity)?.qty || 0;

  return (
    <div className="cs-page">
      {/* ── Header ── */}
      <div className="cs-header">
        <div className="cs-header-inner">
          <button className="cs-back" onClick={() => router.back()}>← Back</button>
          <div>
            <h1 className="cs-title">🗺️ City Specials</h1>
            <p className="cs-sub">Famous mithai &amp; fruits by city — {offer}% off on all items!</p>
          </div>
          <button className="cs-cart-btn" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cs-cart-count">{cartCount}</span>
          </button>
        </div>
      </div>

      <div className="cs-body">
        {/* ── City List (left sidebar) ── */}
        <div className="cs-cities">
          <div className="cs-cities-title">Select City</div>
          {cityList.map(([city, meta]) => (
            <button key={city}
              className={`cs-city-btn ${selectedCity === city ? "active" : ""}`}
              onClick={() => { setSelectedCity(city); setTab("mithai"); }}>
              <span className="cs-city-icon">{meta.icon}</span>
              <span className="cs-city-name">{city}</span>
              <span className="cs-city-state">{meta.state}</span>
            </button>
          ))}
        </div>

        {/* ── Main Content ── */}
        <div className="cs-main">
          {/* City hero */}
          <div className="cs-city-hero">
            <span className="cs-city-hero-icon">{cityMeta.icon}</span>
            <div>
              <h2 className="cs-city-hero-name">{selectedCity}</h2>
              <span className="cs-city-hero-state">{cityMeta.state}</span>
            </div>
            <div className="cs-offer-badge">🏷️ {offer}% OFF All Items</div>
          </div>

          {/* Tabs */}
          <div className="cs-tabs">
            <button className={`cs-tab ${tab === "mithai" ? "active" : ""}`} onClick={() => setTab("mithai")}>
              🍬 Famous Mithai <span className="cs-tab-count">{cityItems.mithai?.length || 0}</span>
            </button>
            <button className={`cs-tab ${tab === "fruits" ? "active" : ""}`} onClick={() => setTab("fruits")}>
              🍎 Famous Fruits <span className="cs-tab-count">{cityItems.fruits?.length || 0}</span>
            </button>
            <button className="cs-add-btn" onClick={() => setAddModal(true)}>
              + Add {tab === "mithai" ? "Mithai" : "Fruit"}
            </button>
          </div>

          {/* Items Grid */}
          {tabItems.length === 0 ? (
            <div className="cs-empty">
              <div style={{ fontSize: 48 }}>{tab === "mithai" ? "🍬" : "🍎"}</div>
              <p>No items yet. Add your first {tab === "mithai" ? "mithai" : "fruit"}!</p>
              <button className="cs-add-btn" onClick={() => setAddModal(true)}>+ Add Item</button>
            </div>
          ) : (
            <div className="cs-grid">
              {tabItems.map(item => {
                const { original, discounted } = discountedPrice(item.price);
                const qty = cartQty(item.id);
                return (
                  <div key={item.id} className="cs-card">
                    {/* Offer badge */}
                    <div className="cs-card-offer-badge">{offer}% OFF</div>
                    {/* Delete */}
                    <button className="cs-card-delete" onClick={() => deleteItem(item.id)} title="Delete item">🗑️</button>
                    {/* Image */}
                    <div className="cs-card-img-wrap">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="cs-card-body">
                      <div className="cs-card-name">{item.name}</div>
                      <div className="cs-card-desc">{item.desc}</div>
                      <div className="cs-card-loc">📍 {item.location}</div>
                      <div className="cs-card-prices">
                        <span className="cs-card-price-orig">{original}</span>
                        <span className="cs-card-price-new">{discounted}</span>
                      </div>
                      <div className="cs-card-actions">
                        {qty === 0 ? (
                          <>
                            <button className="cs-card-add" onClick={() => addToCart(item)}>ADD +</button>
                            <button className="cs-card-book" onClick={() => handleBook(item)}>📦 Book</button>
                          </>
                        ) : (
                          <div className="cs-qty-control">
                            <button className="cs-qty-btn" onClick={() => decCart(item.id)}>−</button>
                            <span className="cs-qty-val">{qty}</span>
                            <button className="cs-qty-btn" onClick={() => addToCart(item)}>+</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Add Item Modal ── */}
      {addModal && (
        <div className="cs-modal-overlay" onClick={() => setAddModal(false)}>
          <div className="cs-modal" onClick={e => e.stopPropagation()}>
            <button className="cs-modal-close" onClick={() => setAddModal(false)}>✕</button>
            <h3 className="cs-modal-title">➕ Add {tab === "mithai" ? "Mithai" : "Fruit"} to {selectedCity}</h3>
            <div className="cs-modal-form">
              {/* Image Upload */}
              <div className="cs-img-upload" onClick={() => fileRef.current?.click()}>
                {imgPreview
                  ? <img src={imgPreview} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:10}} />
                  : <div className="cs-img-placeholder">📷<br/><span>Click to upload image</span></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleImageChange} />

              <input className="cs-modal-input" placeholder="Item name *" value={newItem.name}
                onChange={e => setNewItem(p=>({...p,name:e.target.value}))} />
              <input className="cs-modal-input" placeholder="Price (e.g. ₹120/500g) *" value={newItem.price}
                onChange={e => setNewItem(p=>({...p,price:e.target.value}))} />
              <input className="cs-modal-input" placeholder="Description" value={newItem.desc}
                onChange={e => setNewItem(p=>({...p,desc:e.target.value}))} />
              {(!newItem.name || !newItem.price) && (
                <p style={{fontSize:12,color:"var(--primary)",fontWeight:700}}>* Name and price are required</p>
              )}
              <button className="cs-modal-submit" onClick={submitAdd}
                disabled={!newItem.name || !newItem.price}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Book Modal ── */}
      {bookModal && (
        <div className="cs-modal-overlay" onClick={() => setBookModal(null)}>
          <div className="cs-modal" onClick={e => e.stopPropagation()}>
            <button className="cs-modal-close" onClick={() => setBookModal(null)}>✕</button>
            <div style={{textAlign:"center"}}>
              <img src={bookModal.img} alt={bookModal.name}
                style={{width:100,height:100,objectFit:"cover",borderRadius:12,margin:"0 auto 12px"}} />
              <h3 className="cs-modal-title">{bookModal.name}</h3>
              <p style={{fontSize:13,color:"var(--gray)",marginBottom:6}}>{bookModal.desc}</p>
              <div style={{fontSize:20,fontWeight:900,color:"var(--primary)",marginBottom:16}}>
                {discountedPrice(bookModal.price).discounted}
                <span style={{fontSize:13,color:"var(--gray)",marginLeft:8,fontWeight:600,textDecoration:"line-through"}}>
                  {discountedPrice(bookModal.price).original}
                </span>
              </div>
              {booked ? (
                <div className="cs-booked-msg">🎉 Added to cart! Order placed from {selectedCity}</div>
              ) : (
                <button className="cs-modal-submit" onClick={confirmBook}>
                  📦 Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Cart Drawer ── */}
      {showCart && (
        <div className="cs-modal-overlay" onClick={() => setShowCart(false)}>
          <div className="cs-cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cs-cart-header">
              <h3>🛒 Your Cart ({cartCount} items)</h3>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>
            {cart.length === 0 ? (
              <div className="cs-cart-empty">🛒 Cart is empty</div>
            ) : (
              <>
                <div className="cs-cart-items">
                  {cart.map((item, i) => (
                    <div key={i} className="cs-cart-item">
                      <img src={item.img} alt={item.name} className="cs-cart-item-img" />
                      <div className="cs-cart-item-info">
                        <div className="cs-cart-item-name">{item.name}</div>
                        <div className="cs-cart-item-city">📍 {item.city}</div>
                        <div className="cs-cart-item-price">{discountedPrice(item.price).discounted} × {item.qty}</div>
                      </div>
                      <div className="cs-cart-item-actions">
                        <button onClick={() => decCart(item.id)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                        <button className="cs-cart-del" onClick={() => removeFromCart(item.id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cs-cart-footer">
                  <div className="cs-cart-total">Total: <strong>₹{cartTotal}</strong></div>
                  <button className="cs-checkout-btn" onClick={() => router.push("/order?productName=City+Specials+Order&price=₹" + cartTotal + "&category=City+Special")}>
                    Proceed to Order →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cs-page { min-height:100vh; background:var(--bg); }

        .cs-header { background:white; border-bottom:1px solid var(--border); padding:16px 0; box-shadow:var(--shadow); }
        .cs-header-inner { max-width:1300px; margin:0 auto; padding:0 24px; display:flex; align-items:center; gap:16px; }
        .cs-back { padding:8px 18px; background:white; border:2px solid var(--border); border-radius:8px; font-size:13px; font-weight:800; cursor:pointer; font-family:var(--font); transition:all 0.2s; color:var(--dark); flex-shrink:0; }
        .cs-back:hover { border-color:var(--primary); color:var(--primary); }
        .cs-title { font-size:20px; font-weight:900; color:var(--dark); font-family:var(--font); }
        .cs-sub { font-size:12px; color:var(--gray); font-weight:500; }
        .cs-cart-btn { margin-left:auto; padding:10px 20px; background:var(--primary); color:white; border:none; border-radius:10px; font-size:14px; font-weight:800; cursor:pointer; font-family:var(--font); display:flex; align-items:center; gap:8px; transition:all 0.2s; flex-shrink:0; }
        .cs-cart-btn:hover { background:var(--primary-dark); }
        .cs-cart-count { background:white; color:var(--primary); border-radius:50%; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; }

        .cs-body { max-width:1300px; margin:0 auto; padding:24px; display:grid; grid-template-columns:200px 1fr; gap:20px; }
        @media(max-width:768px){ .cs-body{grid-template-columns:1fr; padding:14px;} .cs-cities{display:flex; flex-wrap:wrap; gap:8px; } }

        /* Cities sidebar */
        .cs-cities { background:white; border-radius:14px; border:1px solid var(--border); padding:12px; height:fit-content; position:sticky; top:88px; }
        .cs-cities-title { font-size:11px; font-weight:800; color:var(--gray); text-transform:uppercase; letter-spacing:0.8px; padding:4px 8px 10px; border-bottom:1px solid var(--border); margin-bottom:8px; }
        .cs-city-btn { display:flex; align-items:center; gap:8px; width:100%; padding:10px 10px; background:none; border:none; cursor:pointer; border-radius:10px; transition:all 0.2s; font-family:var(--font); margin-bottom:4px; text-align:left; }
        .cs-city-btn:hover { background:var(--light-gray); }
        .cs-city-btn.active { background:var(--primary-light); }
        .cs-city-icon { font-size:20px; flex-shrink:0; }
        .cs-city-name { font-size:13px; font-weight:800; color:var(--dark); flex:1; }
        .cs-city-state { font-size:10px; font-weight:700; color:var(--gray); background:var(--light-gray); border-radius:4px; padding:1px 6px; }
        .cs-city-btn.active .cs-city-name { color:var(--primary); }

        /* Main */
        .cs-main { min-width:0; }
        .cs-city-hero { background:linear-gradient(135deg,#0c831f,#0a6619); color:white; border-radius:14px; padding:20px 24px; display:flex; align-items:center; gap:16px; margin-bottom:18px; flex-wrap:wrap; }
        .cs-city-hero-icon { font-size:44px; }
        .cs-city-hero-name { font-size:26px; font-weight:900; font-family:var(--font); }
        .cs-city-hero-state { background:rgba(255,255,255,0.2); border-radius:20px; padding:2px 12px; font-size:12px; font-weight:700; }
        .cs-offer-badge { margin-left:auto; background:var(--yellow); color:#000; border-radius:30px; padding:6px 16px; font-size:13px; font-weight:900; }

        .cs-tabs { display:flex; align-items:center; gap:10px; margin-bottom:18px; flex-wrap:wrap; }
        .cs-tab { padding:10px 20px; border-radius:30px; font-size:13px; font-weight:700; cursor:pointer; border:2px solid var(--border); background:white; color:var(--gray); transition:all 0.2s; font-family:var(--font); display:flex; align-items:center; gap:6px; }
        .cs-tab.active { background:var(--primary-light); color:var(--primary); border-color:var(--primary); }
        .cs-tab:hover:not(.active) { border-color:var(--primary); color:var(--primary); }
        .cs-tab-count { background:var(--border); color:var(--gray); border-radius:20px; padding:1px 8px; font-size:11px; font-weight:800; }
        .cs-tab.active .cs-tab-count { background:var(--primary); color:white; }
        .cs-add-btn { margin-left:auto; padding:10px 20px; background:var(--blinkit); color:white; border:none; border-radius:10px; font-size:13px; font-weight:800; cursor:pointer; font-family:var(--font); transition:all 0.2s; }
        .cs-add-btn:hover { background:#0a6619; }

        /* Grid */
        .cs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:14px; }
        .cs-card { background:white; border-radius:14px; border:1.5px solid var(--border); position:relative; overflow:hidden; transition:all 0.25s; }
        .cs-card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,0.12); border-color:var(--blinkit); }
        .cs-card-offer-badge { position:absolute; top:10px; left:10px; z-index:2; background:var(--blinkit); color:white; font-size:11px; font-weight:800; padding:3px 10px; border-radius:20px; }
        .cs-card-delete { position:absolute; top:8px; right:8px; z-index:2; background:rgba(255,255,255,0.9); border:none; cursor:pointer; border-radius:50%; width:30px; height:30px; font-size:14px; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
        .cs-card-delete:hover { background:var(--primary); }
        .cs-card-img-wrap { height:165px; overflow:hidden; background:var(--light-gray); }
        .cs-card-img-wrap img { width:100%; height:100%; object-fit:cover; transition:transform 0.3s; }
        .cs-card:hover .cs-card-img-wrap img { transform:scale(1.06); }
        .cs-card-body { padding:12px; }
        .cs-card-name { font-size:14px; font-weight:800; color:var(--dark); margin-bottom:3px; }
        .cs-card-desc { font-size:11px; color:var(--gray); margin-bottom:5px; font-weight:500; }
        .cs-card-loc { font-size:11px; color:var(--gray-light); margin-bottom:8px; font-weight:600; }
        .cs-card-prices { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .cs-card-price-orig { font-size:12px; color:var(--gray); text-decoration:line-through; font-weight:600; }
        .cs-card-price-new { font-size:16px; font-weight:900; color:var(--primary); }
        .cs-card-actions { display:flex; gap:8px; }
        .cs-card-add { flex:1; padding:8px; background:var(--blinkit-light); color:var(--blinkit); border:2px solid var(--blinkit); border-radius:8px; font-size:12px; font-weight:900; cursor:pointer; font-family:var(--font); transition:all 0.2s; }
        .cs-card-add:hover { background:var(--blinkit); color:white; }
        .cs-card-book { flex:1; padding:8px; background:var(--primary-light); color:var(--primary); border:2px solid var(--primary); border-radius:8px; font-size:12px; font-weight:900; cursor:pointer; font-family:var(--font); transition:all 0.2s; }
        .cs-card-book:hover { background:var(--primary); color:white; }
        .cs-qty-control { display:flex; align-items:center; background:white; border:2px solid var(--blinkit); border-radius:8px; overflow:hidden; width:100%; }
        .cs-qty-btn { padding:6px 14px; background:none; border:none; color:var(--blinkit); font-size:18px; font-weight:700; cursor:pointer; transition:background 0.2s; }
        .cs-qty-btn:hover { background:var(--blinkit-light); }
        .cs-qty-val { flex:1; text-align:center; font-size:15px; font-weight:900; color:var(--dark); }

        /* Empty state */
        .cs-empty { text-align:center; padding:48px 20px; color:var(--gray); }
        .cs-empty p { font-size:15px; font-weight:600; margin:12px 0 20px; }

        /* Modals */
        .cs-modal-overlay { position:fixed; inset:0; z-index:400; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; padding:20px; }
        .cs-modal { background:white; border-radius:20px; width:100%; max-width:420px; padding:32px; position:relative; box-shadow:0 20px 60px rgba(0,0,0,0.25); max-height:90vh; overflow-y:auto; }
        .cs-modal-close { position:absolute; top:14px; right:14px; background:var(--light-gray); border:none; width:32px; height:32px; border-radius:50%; font-size:15px; cursor:pointer; }
        .cs-modal-title { font-size:18px; font-weight:900; color:var(--dark); margin-bottom:18px; font-family:var(--font); }
        .cs-modal-form { display:flex; flex-direction:column; gap:12px; }
        .cs-modal-input { width:100%; padding:12px 14px; border:2px solid var(--border); border-radius:10px; font-size:14px; font-family:var(--font); outline:none; font-weight:600; }
        .cs-modal-input:focus { border-color:var(--primary); }
        .cs-modal-submit { padding:13px; background:var(--primary); color:white; border:none; border-radius:10px; font-size:14px; font-weight:900; cursor:pointer; font-family:var(--font); transition:all 0.2s; }
        .cs-modal-submit:hover:not(:disabled) { background:var(--primary-dark); }
        .cs-modal-submit:disabled { opacity:0.5; cursor:not-allowed; }

        /* Image upload */
        .cs-img-upload { width:100%; height:130px; border:2px dashed var(--border); border-radius:12px; cursor:pointer; overflow:hidden; transition:border-color 0.2s; }
        .cs-img-upload:hover { border-color:var(--primary); }
        .cs-img-placeholder { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; font-size:24px; color:var(--gray); }
        .cs-img-placeholder span { font-size:13px; font-weight:600; }

        .cs-booked-msg { background:#e8f5e9; border:1px solid #c8eac8; color:#1b5e20; border-radius:10px; padding:14px; font-size:14px; font-weight:700; text-align:center; }

        /* Cart Drawer */
        .cs-cart-drawer { background:white; border-radius:20px 0 0 20px; width:100%; max-width:420px; height:100vh; margin-left:auto; padding:0; display:flex; flex-direction:column; overflow:hidden; }
        .cs-cart-header { display:flex; align-items:center; justify-content:space-between; padding:20px 24px; border-bottom:1px solid var(--border); }
        .cs-cart-header h3 { font-size:18px; font-weight:900; color:var(--dark); font-family:var(--font); }
        .cs-cart-header button { background:none; border:none; font-size:20px; cursor:pointer; color:var(--gray); }
        .cs-cart-empty { flex:1; display:flex; align-items:center; justify-content:center; font-size:16px; color:var(--gray); font-weight:600; }
        .cs-cart-items { flex:1; overflow-y:auto; padding:16px 24px; display:flex; flex-direction:column; gap:12px; }
        .cs-cart-item { display:flex; align-items:center; gap:12px; background:var(--light-gray); border-radius:12px; padding:10px 12px; }
        .cs-cart-item-img { width:50px; height:50px; border-radius:8px; object-fit:cover; flex-shrink:0; }
        .cs-cart-item-info { flex:1; min-width:0; }
        .cs-cart-item-name { font-size:13px; font-weight:800; color:var(--dark); }
        .cs-cart-item-city { font-size:11px; color:var(--gray); font-weight:600; }
        .cs-cart-item-price { font-size:13px; font-weight:800; color:var(--primary); }
        .cs-cart-item-actions { display:flex; align-items:center; gap:4px; }
        .cs-cart-item-actions button { width:28px; height:28px; border-radius:8px; background:white; border:1.5px solid var(--border); font-size:16px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
        .cs-cart-item-actions button:hover { background:var(--primary); border-color:var(--primary); color:white; }
        .cs-cart-item-actions span { width:28px; text-align:center; font-size:14px; font-weight:900; }
        .cs-cart-del { font-size:13px!important; }
        .cs-cart-footer { padding:20px 24px; border-top:1px solid var(--border); }
        .cs-cart-total { font-size:18px; font-weight:900; color:var(--dark); margin-bottom:12px; }
        .cs-cart-total strong { color:var(--primary); }
        .cs-checkout-btn { width:100%; padding:14px; background:var(--primary); color:white; border:none; border-radius:10px; font-size:15px; font-weight:900; cursor:pointer; font-family:var(--font); transition:all 0.2s; }
        .cs-checkout-btn:hover { background:var(--primary-dark); }
      `}</style>
    </div>
  );
}
