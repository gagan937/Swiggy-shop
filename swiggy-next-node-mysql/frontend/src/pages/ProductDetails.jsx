"use client";

import { useRouter } from "next/navigation";

function ProductDetails({ name, id }) {
  const router = useRouter();

  const shopData = {
    "fresh-vegetables": [
      { id:1, name:"Fresh Vegetables", price:"₹40/ 1 kg", category:"Vegetables", location:"Meerut Local Farm", img:"/image/vegitable1.png" },
      { id:2, name:"Fresh Vegetables", price:"₹30/ 1 kg", category:"Vegetables", location:"Delhi Azadpur Mandi", img:"/image/vegitable2.jpg" },
      { id:3, name:"Fresh Vegetables", price:"₹40/ 1 kg", category:"Vegetables", location:"Organic Farm, Dehradun", img:"/image/vegitable3.png" },
      { id:4, name:"Fresh Vegetables", price:"₹30/ 1 kg", category:"Vegetables", location:"Local Market, Ghaziabad", img:"/image/vegitable4.png" },
      { id:5, name:"Fresh Vegetables", price:"₹40/ 1 kg", category:"Vegetables", location:"Village Farm, Muzaffarnagar", img:"/image/vegitable5.jpg" },
      { id:6, name:"Fresh Vegetables", price:"₹30/ 1 kg", category:"Vegetables", location:"Sabzi Mandi, Noida", img:"/image/vegitable6.jpg" },
      { id:7, name:"Fresh Vegetables", price:"₹40/ 1 kg", category:"Vegetables", location:"Organic Farm, Haridwar", img:"/image/vegitable7.jpg" },
      { id:8, name:"Fresh Vegetables", price:"₹30/ 1 kg", category:"Vegetables", location:"Local Market, Hapur", img:"/image/vegitable8.webp" },
      { id:9, name:"Fresh Vegetables", price:"₹40/ 1 kg", category:"Vegetables", location:"Farm Fresh, Saharanpur", img:"/image/vegitable9.jpg" },
      { id:10, name:"Fresh Vegetables", price:"₹30/ 1 kg", category:"Vegetables", location:"City Market, Meerut", img:"/image/vegitable10.jpg" },
      { id:11, name:"Fresh Vegetables", price:"₹40/ 1 kg", category:"Vegetables", location:"Green Farm, Roorkee", img:"/image/vegitable11.jpg" },
      { id:12, name:"Fresh Vegetables", price:"₹30/ 1 kg", category:"Vegetables", location:"Local Mandi, Bulandshahr", img:"/image/vegitable12.jpg" },
    ],

    "fresh-fruits": [
      { id:1, name:"Fresh Fruits", price:"₹180/ 1 kg", category:"Fruits", location:"Kashmir Orchard", img:"/image/fruits1.jpg" },
      { id:2, name:"Fresh Fruits", price:"₹60/ dozen", category:"Fruits", location:"Local Farm", img:"/image/fruits2.jpg" },
      { id:3, name:"Fresh Fruits", price:"₹120/ 1 kg", category:"Fruits", location:"Nagpur Farm", img:"/image/fruits3.jpg" },
      { id:4, name:"Fresh Fruits", price:"₹150/ 1 kg", category:"Fruits", location:"Local Market", img:"/image/fruits4.webp" },
      { id:5, name:"Fresh Fruits", price:"₹90/ 1 kg", category:"Fruits", location:"Farm Fresh", img:"/image/fruits5.jpg" },
      { id:6, name:"Fresh Fruits", price:"₹80/ piece", category:"Fruits", location:"Organic Farm", img:"/image/fruits6.jpg" },
      { id:7, name:"Fresh Fruits", price:"₹50/ 1 kg", category:"Fruits", location:"Local Market", img:"/image/fruits7.jpg" },
      { id:8, name:"Fresh Fruits", price:"₹40/ 1 kg", category:"Fruits", location:"Local Farm", img:"/image/fruits8.jpg" },
      { id:9, name:"Fresh Fruits", price:"₹110/ 1 kg", category:"Fruits", location:"City Market", img:"/image/fruits9.jpeg" },
      { id:10, name:"Fresh Fruits", price:"₹70/ 1 kg", category:"Fruits", location:"Fresh Farm", img:"/image/fruits10.webp" },
    ],

    "dairy-products": [
      { id:1, name:"Fresh Milk", price:"₹60/L", category:"Dairy", location:"Amul", img:"/image/milk1.jpg" },
      { id:2, name:"Fresh Milk", price:"₹58/L", category:"Dairy", location:"Mother Dairy", img:"/image/milk2.jpg" },
      { id:3, name:"Fresh Milk", price:"₹80/ 1 kg", category:"Dairy", location:"Local Dairy", img:"/image/milk3.png" },
      { id:4, name:"Fresh Milk", price:"₹120/ pack", category:"Dairy", location:"Amul", img:"/image/milk4.webp" },
      { id:5, name:"Fresh Milk", price:"₹200/ pack", category:"Dairy", location:"Britannia", img:"/image/milk5.webp" },
      { id:6, name:"Ghee", price:"₹800/ 1 kg", category:"Dairy", location:"Local Dairy", img:"/image/milk6.webp" },
      { id:7, name:"Fresh Milk", price:"₹100/ L", category:"Dairy", location:"Organic Farm", img:"/image/milk7.png" },
      { id:8, name:"Fresh Milk", price:"₹75/ bottle", category:"Dairy", location:"Amul", img:"/image/milk8.png" },
      { id:9, name:"Fresh Milk", price:"₹900/ pack", category:"Dairy", location:"Local Shop", img:"/image/milk9.jpg" },
      { id:10, name:"Ghee", price:"₹800/ L", category:"Dairy", location:"Village Dairy", img:"/image/milk10.webp" },
    ],

    "rice": [
      { id:1, name:"Fresh Rice", price:"₹120/ 1 kg", category:"Rice", location:"Punjab", img:"/image/rice1.png" },
      { id:2, name:"Fresh Rice", price:"₹90/ 1 kg", category:"Rice", location:"Organic Farm", img:"/image/rice2.jpg" },
      { id:3, name:"Fresh Rice", price:"₹80/ 1 kg", category:"Rice", location:"Andhra Pradesh", img:"/image/rice3.webp" },
      { id:4, name:"Fresh Rice", price:"₹75/ 1 kg", category:"Rice", location:"Maharashtra", img:"/image/rice4.png" },
      { id:5, name:"Fresh Rice", price:"₹150/ 1 kg", category:"Rice", location:"Imported", img:"/image/rice5.jpg" },
      { id:6, name:"Fresh Rice", price:"₹140/ 1 kg", category:"Rice", location:"Assam", img:"/image/rice6.jpg" },
      { id:7, name:"Fresh Rice", price:"₹110/ 1 kg", category:"Rice", location:"Kerala", img:"/image/rice7.jpg" },
      { id:8, name:"Fresh Rice", price:"₹180/ 1 kg", category:"Rice", location:"Manipur", img:"/image/rice8.png" },
      { id:9, name:"Fresh Rice", price:"₹60/ 1 kg", category:"Rice", location:"Local Market", img:"/image/rice9.jpg" },
      { id:10, name:"Fresh Rice", price:"₹70/ 1 kg", category:"Rice", location:"Tamil Nadu", img:"/image/rice10.jpg" },
    ],

    "masalas": [
      { id:1, name:"Fresh Masalas", price:"₹50/ 100g", category:"Masala", location:"Organic Farm", img:"/image/masalas1.webp" },
      { id:2, name:"Fresh Masalas", price:"₹60/ 100g", category:"Masala", location:"Local Market", img:"/image/masalas2.jpg" },
      { id:3, name:"Fresh Masalas", price:"₹45/ 100g", category:"Masala", location:"Local Farm", img:"/image/masalas3.jpg" },
      { id:4, name:"Fresh Masalas", price:"₹80/ 100g", category:"Masala", location:"Spice Market", img:"/image/masalas4.png" },
      { id:5, name:"Fresh Masalas", price:"₹70/ 100g", category:"Masala", location:"Rajasthan", img:"/image/masalas5.webp" },
      { id:6, name:"Fresh Masalas", price:"₹40/ 100g", category:"Masala", location:"Local Farm", img:"/image/masalas6.jpg" },
      { id:7, name:"Fresh Masalas", price:"₹120/ 100g", category:"Masala", location:"Kerala", img:"/image/masalas7.webp" },
      { id:8, name:"Fresh Masalas", price:"₹150/ 100g", category:"Masala", location:"Kerala", img:"/image/masalas8.jpg" },
      { id:9, name:"Fresh Masalas", price:"₹200/ 100g", category:"Masala", location:"Kerala", img:"/image/masalas9.png" },
      { id:10, name:"Fresh Masalas", price:"₹90/ 100g", category:"Masala", location:"Sri Lanka", img:"/image/masalas10.png" },
    ],

    "oils-&-ghee": [
      { id:1, name:"Mustard Oil", price:"₹180 / L", category:"Oil & Ghee", location:"Rajasthan", img:"/image/oils1.jpg" },
      { id:2, name:"Sunflower Oil", price:"₹150 / L", category:"Oil & Ghee", location:"Local Market", img:"/image/oils2.webp" },
      { id:3, name:"Olive Oil", price:"₹600 / L", category:"Oil & Ghee", location:"Imported", img:"/image/oils3.webp" },
      { id:4, name:"Coconut Oil", price:"₹220 / L", category:"Oil & Ghee", location:"Kerala", img:"/image/oils4.jpg" },
      { id:5, name:"Refined Oil", price:"₹140 / L", category:"Oil & Ghee", location:"Local Factory", img:"/image/oils5.jpg" },
      { id:6, name:"Groundnut Oil", price:"₹200 / L", category:"Oil & Ghee", location:"Gujarat", img:"/image/oils6.webp" },
      { id:7, name:"Desi Ghee", price:"₹550 / L", category:"Oil & Ghee", location:"Village Dairy", img:"/image/oils7.jpg" },
      { id:8, name:"Cow Ghee", price:"₹600 / L", category:"Oil & Ghee", location:"Organic Farm", img:"/image/oils8.jpg" },
      { id:9, name:"Buffalo Ghee", price:"₹500 / L", category:"Oil & Ghee", location:"Local Dairy", img:"/image/oils9.jpg" },
      { id:10, name:"A2 Ghee", price:"₹900 / L", category:"Oil & Ghee", location:"Premium Farm", img:"/image/oils10.jpg" },
    ],

    "munchies": [
      { id:1, name:"Fresh Munchies", price:"₹20 / pack", category:"Munchies", location:"Local Brand", img:"/image/munchies1.jpg" },
      { id:2, name:"Fresh Munchies", price:"₹50 / pack", category:"Munchies", location:"Imported", img:"/image/munchies2.jpg" },
      { id:3, name:"Fresh Munchies", price:"₹30 / pack", category:"Munchies", location:"Local Market", img:"/image/munchies3.jpg" },
      { id:4, name:"Fresh Munchies", price:"₹40 / pack", category:"Munchies", location:"Snack Factory", img:"/image/munchies4.webp" },
      { id:5, name:"Fresh Munchies", price:"₹35 / 200g", category:"Munchies", location:"Local Farm", img:"/image/munchies5.jpg" },
      { id:6, name:"Fresh Munchies", price:"₹60 / 400g", category:"Munchies", location:"Rajasthan", img:"/image/munchies6.jpg" },
      { id:7, name:"Fresh Munchies", price:"₹80 / 500g", category:"Munchies", location:"Local Market", img:"/image/munchies7.webp" },
      { id:8, name:"Fresh Munchies", price:"₹25 / pack", category:"Munchies", location:"Branded", img:"/image/munchies8.jpg" },
      { id:9, name:"Fresh Munchies", price:"₹20 / pack", category:"Munchies", location:"Snack Factory", img:"/image/munchies9.webp" },
      { id:10, name:"Fresh Munchies", price:"₹30 / pack", category:"Munchies", location:"Local Brand", img:"/image/munchies10.jpg" },
    ],

    "sweet-tooth": [
      { id:1, name:"Fresh Sweet Tooth", price:"₹120 / 500g", category:"Sweet Tooth", location:"Local Sweet Shop", img:"/image/sweet1.png" },
      { id:2, name:"Fresh Sweet Tooth", price:"₹140 / 500g", category:"Sweet Tooth", location:"Bengal", img:"/image/sweet2.png" },
      { id:3, name:"Fresh Sweet Tooth", price:"₹500 / kg", category:"Sweet Tooth", location:"Premium Sweets", img:"/image/sweettooth3.jpg" },
      { id:4, name:"Fresh Sweet Tooth", price:"₹200 / 500g", category:"Sweet Tooth", location:"Local Shop", img:"/image/sweettooth4.webp" },
      { id:5, name:"Fresh Sweet Tooth", price:"₹300 / 500g", category:"Sweet Tooth", location:"Local Sweet Shop", img:"/image/sweet5.webp" },
      { id:6, name:"Fresh Sweet Tooth", price:"₹100 / 500g", category:"Sweet Tooth", location:"Street Vendor", img:"/image/sweettooth6.webp" },
      { id:7, name:"Fresh Sweet Tooth", price:"₹250 / kg", category:"Sweet Tooth", location:"Bakery", img:"/image/sweettooth7.webp" },
      { id:8, name:"Fresh Sweet Tooth", price:"₹120 / cup", category:"Sweet Tooth", location:"Branded", img:"/image/sweettooth8.jpg" },
      { id:9, name:"Fresh Sweet Tooth", price:"₹60 / piece", category:"Sweet Tooth", location:"Bakery", img:"/image/sweet9.png" },
      { id:10, name:"Fresh Sweet Tooth", price:"₹120 / pack", category:"Sweet Tooth", location:"Bakery", img:"/image/sweet10.webp" },
    ],

    "cold-drinks-and-juices": [
      { id:1, name:"Fresh Drinks", price:"₹40 / 750ml", category:"Cold Drinks & Juices", location:"Branded", img:"/image/drinks1.jpg" },
      { id:2, name:"Fresh Drinks", price:"₹40 / 750ml", category:"Cold Drinks & Juices", location:"Branded", img:"/image/drinks2.jpg" },
      { id:3, name:"Fresh Drinks", price:"₹50 / 750ml", category:"Cold Drinks & Juices", location:"Branded", img:"/image/drinks3.jpg" },
      { id:4, name:"Fresh Drinks", price:"₹60 / 750ml", category:"Cold Drinks & Juices", location:"Branded", img:"/image/drinks4.jpg" },
      { id:5, name:"Fresh Drinks", price:"₹30 / pack", category:"Cold Drinks & Juices", location:"Local Brand", img:"/image/drinks5.jpg" },
      { id:6, name:"Fresh Juice", price:"₹35 / pack", category:"Cold Drinks & Juices", location:"Local Brand", img:"/image/drinks6.webp" },
      { id:7, name:"Fresh Juice", price:"₹50 / pack", category:"Cold Drinks & Juices", location:"Imported", img:"/image/drinks7.jpg" },
      { id:8, name:"Fresh Juice", price:"₹45 / pack", category:"Cold Drinks & Juices", location:"Local Market", img:"/image/drinks8.png" },
      { id:9, name:"Fresh Juice", price:"₹120 / can", category:"Cold Drinks & Juices", location:"Branded", img:"/image/drinks9.webp" },
      { id:10, name:"Fresh Juice", price:"₹60 / piece", category:"Cold Drinks & Juices", location:"Fresh Vendor", img:"/image/drinks11.jpg" },
    ],

    "biscuits-and-cakes": [
      { id:1, name:"Fresh Biscuits", price:"₹30 / pack", category:"Biscuits & Cakes", location:"Branded", img:"/image/biskut1.webp" },
      { id:2, name:"Fresh Biscuits", price:"₹50 / pack", category:"Biscuits & Cakes", location:"Branded", img:"/image/biskut2.jpg" },
      { id:3, name:"Fresh Biscuits", price:"₹40 / pack", category:"Biscuits & Cakes", location:"Local Brand", img:"/image/biskut3.jpg" },
      { id:4, name:"Fresh Biscuits", price:"₹80 / pack", category:"Biscuits & Cakes", location:"Bakery", img:"/image/biskut4.jpg" },
      { id:5, name:"Fresh Biscuits", price:"₹120 / pack", category:"Biscuits & Cakes", location:"Imported", img:"/image/biskut5.webp" },
      { id:6, name:"Fresh Biscuits", price:"₹500 / kg", category:"Biscuits & Cakes", location:"Bakery", img:"/image/biskut6.jpg" },
      { id:7, name:"Fresh Biscuits", price:"₹400 / kg", category:"Biscuits & Cakes", location:"Bakery", img:"/image/biskut7.webp" },
      { id:8, name:"Fresh Biscuits", price:"₹550 / kg", category:"Biscuits & Cakes", location:"Bakery", img:"/image/biskut8.webp" },
      { id:9, name:"Fresh Biscuits", price:"₹120 / pack", category:"Biscuits & Cakes", location:"Bakery", img:"/image/biskut9.jpg" },
      { id:10, name:"Fresh Biscuits", price:"₹150 / pack", category:"Biscuits & Cakes", location:"Branded", img:"/image/biskut10.jpg" },
    ],
  };

  const items = shopData[name] || [];
  const item = items.find(i => String(i.id) === String(id));

  if (!item) return (
    <div className="pd-page">
      <div style={{textAlign:"center",padding:"80px 20px",color:"var(--gray)"}}>
        <div style={{fontSize:56,marginBottom:16}}>🔍</div>
        <h2>Product not found</h2>
        <button onClick={() => router.back()} style={{marginTop:16,padding:"10px 24px",background:"var(--primary)",color:"white",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14}}>← Go Back</button>
      </div>
    </div>
  );

  const parsedPrice = item.price.replace(/[^₹\d\/a-zA-Z.\s]/g, "");

  return (
    <div className="pd-page">
      <div className="pd-back-bar">
        <div className="pd-back-inner">
          <button className="pd-back-btn" onClick={() => router.back()}>← Back</button>
          <p className="pd-breadcrumb">Home / Shop / {name} / <strong>{item.category || item.name}</strong></p>
        </div>
      </div>

      <div className="pd-main">
        <div className="pd-card">
          <div className="pd-img-col">
            <div className="pd-img-bg" />
            <img src={item.img} alt={item.name} />
          </div>
          <div className="pd-info-col">
            <span className="pd-badge">⚡ Fastest Delivery</span>
            <h1 className="pd-name">{item.category || item.name}</h1>
            <p className="pd-category">{item.name} • {item.location}</p>
            <div className="pd-price">{parsedPrice}</div>
            <p className="pd-price-sub">✅ Free delivery on this order</p>

            <div className="pd-meta-grid">
              <div className="pd-meta-item">
                <div className="pd-meta-label">Source</div>
                <div className="pd-meta-value">📍 {item.location}</div>
              </div>
              <div className="pd-meta-item">
                <div className="pd-meta-label">Category</div>
                <div className="pd-meta-value">🏷️ {item.category}</div>
              </div>
              <div className="pd-meta-item">
                <div className="pd-meta-label">Delivery</div>
                <div className="pd-meta-value">⏱ 10-20 mins</div>
              </div>
              <div className="pd-meta-item">
                <div className="pd-meta-label">Rating</div>
                <div className="pd-meta-value">⭐ 4.{(item.id % 5) + 1}/5</div>
              </div>
            </div>

            <div className="pd-actions">
              <button className="pd-btn-back" onClick={() => router.back()}>← Back</button>
              <button className="pd-btn-order" onClick={() =>
                router.push(`/order?productName=${encodeURIComponent(item.category || item.name)}&price=${encodeURIComponent(item.price)}&category=${encodeURIComponent(item.category)}&image=${encodeURIComponent(item.img)}&location=${encodeURIComponent(item.location)}`)
              }>Order Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
