"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SORT_OPTIONS = ["All", "Price: Low", "Price: High", "Nearest"];

const CATEGORY_META = {
  "fresh-vegetables": { icon: "🥦", label: "Fresh Vegetables", sub: "Farm to door" },
  "fresh-fruits":     { icon: "🍎", label: "Fresh Fruits", sub: "Seasonal & imported" },
  "dairy-products":   { icon: "🥛", label: "Dairy Products", sub: "Daily essentials" },
  "rice":             { icon: "🌾", label: "Rice", sub: "Premium quality" },
  "masalas":          { icon: "🌶️", label: "Masalas & Spices", sub: "Aromatic blends" },
  "oils-and-ghee":    { icon: "🫙", label: "Oils & Ghee", sub: "Pure & natural" },
  "munchies":         { icon: "🍿", label: "Munchies", sub: "Snack time" },
  "sweet-tooth":      { icon: "🍬", label: "Sweet Tooth", sub: "Indulge yourself" },
  "cold-drinks-and-juices": { icon: "🧃", label: "Cold Drinks & Juices", sub: "Refreshing picks" },
  "biscuits-and-cakes":     { icon: "🍪", label: "Biscuits & Cakes", sub: "Bakery fresh" },
};

// Helper to build item list quickly
const mkVeg = (id, name, price, loc, img) => ({ id, name, price, category: "Vegetables", location: loc, img: `/image/${img}` });
const mkFrut= (id, name, price, loc, img) => ({ id, name, price, category: "Fruits", location: loc, img: `/image/${img}` });
const mkDairy=(id, name, price, loc, img) => ({ id, name, price, category: "Dairy", location: loc, img: `/image/${img}` });
const mkRice= (id, name, price, loc, img) => ({ id, name, price, category: "Rice", location: loc, img: `/image/${img}` });
const mkMas = (id, name, price, loc, img) => ({ id, name, price, category: "Masala", location: loc, img: `/image/${img}` });
const mkOil = (id, name, price, loc, img) => ({ id, name, price, category: "Oil & Ghee", location: loc, img: `/image/${img}` });
const mkSnk = (id, name, price, loc, img) => ({ id, name, price, category: "Munchies", location: loc, img: `/image/${img}` });
const mkSwt = (id, name, price, loc, img) => ({ id, name, price, category: "Sweets", location: loc, img: `/image/${img}` });
const mkDrk = (id, name, price, loc, img) => ({ id, name, price, category: "Drinks", location: loc, img: `/image/${img}` });
const mkBsk = (id, name, price, loc, img) => ({ id, name, price, category: "Bakery", location: loc, img: `/image/${img}` });

const shopData = {
  "fresh-vegetables": [
    mkVeg(1,"Spinach (Palak)","₹30/bunch","Local Farm","vegitable1.png"),
    mkVeg(2,"Broccoli","₹80/piece","Organic Farm","vegitable2.jpg"),
    mkVeg(3,"Cauliflower (Gobhi)","₹40/piece","Local Market","vegitable3.png"),
    mkVeg(4,"Capsicum (Shimla Mirch)","₹60/250g","Local Market","vegitable4.png"),
    mkVeg(5,"Tomato (Tamatar)","₹30/kg","Local Market","vegitable5.jpg"),
    mkVeg(6,"Onion (Pyaz)","₹35/kg","Local Market","vegitable6.jpg"),
    mkVeg(7,"Potato (Aloo)","₹25/kg","Local Market","vegitable7.jpg"),
    mkVeg(8,"Carrot (Gajar)","₹40/kg","Local Market","vegitable8.webp"),
    mkVeg(9,"Peas (Matar)","₹60/kg","Local Farm","vegitable9.jpg"),
    mkVeg(10,"Bitter Gourd (Karela)","₹50/kg","Local Market","vegitable10.jpg"),
    mkVeg(11,"Bottle Gourd (Lauki)","₹20/piece","Local Market","vegitable11.jpg"),
    mkVeg(12,"Lady Finger (Bhindi)","₹40/500g","Local Market","vegitable12.jpg"),
    mkVeg(13,"Cucumber (Kheera)","₹25/piece","Local Market","vegitable1.png"),
    mkVeg(14,"Eggplant (Baingan)","₹30/500g","Organic Farm","vegitable2.jpg"),
    mkVeg(15,"Cabbage (Patta Gobhi)","₹30/piece","Local Farm","vegitable3.png"),
    mkVeg(16,"Radish (Mooli)","₹20/bunch","Local Market","vegitable4.png"),
    mkVeg(17,"Fenugreek (Methi)","₹20/bunch","Local Market","vegitable5.jpg"),
    mkVeg(18,"Coriander (Dhaniya)","₹10/bunch","Local Market","vegitable6.jpg"),
    mkVeg(19,"Green Chilli","₹20/100g","Local Farm","vegitable7.jpg"),
    mkVeg(20,"Sweet Corn","₹30/piece","Local Market","vegitable8.webp"),
  ],
  "fresh-fruits": [
    mkFrut(1,"Apple (Kashmiri)","₹180/kg","Kashmir","fruits1.jpg"),
    mkFrut(2,"Banana (Desi)","₹50/dozen","Local Farm","fruits2.jpg"),
    mkFrut(3,"Mango (Alphonso)","₹300/kg","Maharashtra","fruits3.jpg"),
    mkFrut(4,"Watermelon","₹30/kg","UP Farm","fruits4.webp"),
    mkFrut(5,"Grapes (Black)","₹120/kg","Nashik","fruits5.jpg"),
    mkFrut(6,"Papaya","₹60/kg","Local Farm","fruits6.jpg"),
    mkFrut(7,"Pomegranate (Anar)","₹200/kg","Rajasthan","fruits7.jpg"),
    mkFrut(8,"Guava (Amrood)","₹80/kg","UP Farm","fruits8.jpg"),
    mkFrut(9,"Orange (Nagpur)","₹120/kg","Nagpur","fruits9.jpeg"),
    mkFrut(10,"Strawberry","₹200/250g","Mahabaleshwar","fruits10.webp"),
    mkFrut(11,"Pineapple","₹80/piece","South India","fruits1.jpg"),
    mkFrut(12,"Kiwi","₹250/6pcs","Imported","fruits2.jpg"),
    mkFrut(13,"Pear (Nashpati)","₹150/kg","Himachal","fruits3.jpg"),
    mkFrut(14,"Sapodilla (Chikoo)","₹100/kg","Maharashtra","fruits4.webp"),
    mkFrut(15,"Lychee (Litchi)","₹180/kg","Bihar","fruits5.jpg"),
    mkFrut(16,"Coconut","₹50/piece","Kerala","fruits6.jpg"),
    mkFrut(17,"Plum (Aloo Bukhara)","₹200/kg","Himachal","fruits7.jpg"),
    mkFrut(18,"Dragon Fruit","₹300/piece","Maharashtra","fruits8.jpg"),
    mkFrut(19,"Avocado","₹120/piece","Imported","fruits9.jpeg"),
    mkFrut(20,"Custard Apple (Sitaphal)","₹150/kg","Maharashtra","fruits10.webp"),
  ],
  "dairy-products": [
    mkDairy(1,"Full Cream Milk (Amul)","₹66/L","Amul","milk1.jpg"),
    mkDairy(2,"Toned Milk (Mother Dairy)","₹58/L","Mother Dairy","milk2.jpg"),
    mkDairy(3,"Paneer (Fresh)","₹350/kg","Local Dairy","milk3.png"),
    mkDairy(4,"Butter (Amul)","₹120/pack","Amul","milk4.webp"),
    mkDairy(5,"Cheddar Cheese","₹200/pack","Britannia","milk5.webp"),
    mkDairy(6,"Desi Ghee","₹800/kg","Local Dairy","milk6.webp"),
    mkDairy(7,"Organic Milk","₹100/L","Organic Farm","milk7.png"),
    mkDairy(8,"Cream (Amul)","₹40/pack","Amul","milk8.png"),
    mkDairy(9,"Curd (Dahi)","₹60/500g","Local Shop","milk9.jpg"),
    mkDairy(10,"Buffalo Ghee","₹900/kg","Village Dairy","milk10.webp"),
    mkDairy(11,"Lassi (Sweet)","₹40/bottle","Punjab Dairy","milk1.jpg"),
    mkDairy(12,"Buttermilk (Chaas)","₹30/500ml","Local Dairy","milk2.jpg"),
    mkDairy(13,"Skimmed Milk","₹55/L","Amul","milk3.png"),
    mkDairy(14,"Mozzarella Cheese","₹250/pack","Imported","milk4.webp"),
    mkDairy(15,"Cream Cheese","₹220/pack","Britannia","milk5.webp"),
    mkDairy(16,"Cow Ghee (A2)","₹1200/kg","Organic Farm","milk6.webp"),
    mkDairy(17,"Flavoured Milk (Chocolate)","₹50/200ml","Amul","milk7.png"),
    mkDairy(18,"Kesar Milk","₹80/250ml","Rajasthan Dairy","milk8.png"),
    mkDairy(19,"Condensed Milk","₹120/can","Nestlé","milk9.jpg"),
    mkDairy(20,"Whipping Cream","₹150/pack","Amul","milk10.webp"),
  ],
  "rice": [
    mkRice(1,"Basmati Rice (Premium)","₹150/kg","Punjab","rice1.png"),
    mkRice(2,"Sona Masoori Rice","₹90/kg","Andhra Pradesh","rice2.jpg"),
    mkRice(3,"Kolam Rice","₹75/kg","Maharashtra","rice3.webp"),
    mkRice(4,"Idli Rice","₹80/kg","Tamil Nadu","rice4.png"),
    mkRice(5,"Jasmine Rice","₹200/kg","Thailand","rice5.jpg"),
    mkRice(6,"Brown Rice","₹130/kg","Organic Farm","rice6.jpg"),
    mkRice(7,"Red Rice","₹180/kg","Kerala","rice7.jpg"),
    mkRice(8,"Black Rice (Forbidden)","₹350/kg","Manipur","rice8.png"),
    mkRice(9,"Raw Rice (Arwa)","₹60/kg","Local Market","rice9.jpg"),
    mkRice(10,"Parboiled Rice (Usna)","₹70/kg","West Bengal","rice10.jpg"),
    mkRice(11,"Surti Kolam Rice","₹85/kg","Gujarat","rice1.png"),
    mkRice(12,"Ponni Rice","₹95/kg","Tamil Nadu","rice2.jpg"),
    mkRice(13,"Ambemohar Rice","₹120/kg","Maharashtra","rice3.webp"),
    mkRice(14,"Steam Rice","₹65/kg","Bihar","rice4.png"),
    mkRice(15,"Bamboo Rice","₹400/kg","Kerala","rice5.jpg"),
    mkRice(16,"Matta Rice","₹110/kg","Kerala","rice6.jpg"),
    mkRice(17,"Wild Rice","₹300/kg","North India","rice7.jpg"),
    mkRice(18,"Jeerakasala Rice","₹250/kg","Kerala","rice8.png"),
    mkRice(19,"Seeraga Samba","₹220/kg","Tamil Nadu","rice9.jpg"),
    mkRice(20,"Long Grain White Rice","₹100/kg","Punjab","rice10.jpg"),
  ],
  "masalas": [
    mkMas(1,"Turmeric Powder (Haldi)","₹30/100g","Organic Farm","masalas1.webp"),
    mkMas(2,"Red Chilli Powder","₹50/100g","Rajasthan","masalas2.jpg"),
    mkMas(3,"Coriander Powder (Dhaniya)","₹25/100g","Local Farm","masalas3.jpg"),
    mkMas(4,"Cumin Powder (Jeera)","₹60/100g","Gujarat","masalas4.png"),
    mkMas(5,"Garam Masala","₹80/100g","Delhi","masalas5.webp"),
    mkMas(6,"Cardamom (Elaichi)","₹200/50g","Kerala","masalas6.jpg"),
    mkMas(7,"Black Pepper (Kali Mirch)","₹150/100g","Coorg","masalas7.webp"),
    mkMas(8,"Cloves (Laung)","₹180/50g","Kerala","masalas8.jpg"),
    mkMas(9,"Saffron (Kesar)","₹500/1g","Kashmir","masalas9.png"),
    mkMas(10,"Star Anise (Chakra Phool)","₹120/50g","North East","masalas10.png"),
    mkMas(11,"Fenugreek Seeds (Methi Dana)","₹20/100g","Rajasthan","masalas1.webp"),
    mkMas(12,"Mustard Seeds (Sarson)","₹15/100g","Local Market","masalas2.jpg"),
    mkMas(13,"Bay Leaf (Tej Patta)","₹10/pack","North India","masalas3.jpg"),
    mkMas(14,"Cinnamon (Dalchini)","₹80/50g","Sri Lanka","masalas4.png"),
    mkMas(15,"Asafoetida (Hing)","₹50/10g","Gujarat","masalas5.webp"),
    mkMas(16,"Biryani Masala","₹60/100g","MDH","masalas6.jpg"),
    mkMas(17,"Chicken Masala","₹70/100g","Everest","masalas7.webp"),
    mkMas(18,"Pav Bhaji Masala","₹50/100g","MDH","masalas8.jpg"),
    mkMas(19,"Chhole Masala","₹55/100g","Everest","masalas9.png"),
    mkMas(20,"Kitchen King Masala","₹65/100g","MDH","masalas10.png"),
  ],
  "oils-and-ghee": [
    mkOil(1,"Mustard Oil (Sarson Tel)","₹180/L","Rajasthan","oils1.jpg"),
    mkOil(2,"Sunflower Oil","₹150/L","Local Market","oils2.webp"),
    mkOil(3,"Extra Virgin Olive Oil","₹700/L","Imported","oils3.webp"),
    mkOil(4,"Coconut Oil (Nariyal Tel)","₹250/L","Kerala","oils4.jpg"),
    mkOil(5,"Refined Soybean Oil","₹130/L","Local Factory","oils5.jpg"),
    mkOil(6,"Groundnut Oil (Moongphali)","₹210/L","Gujarat","oils6.webp"),
    mkOil(7,"Desi Ghee (Amul)","₹600/kg","Amul","oils7.jpg"),
    mkOil(8,"Pure Cow Ghee (A2)","₹1200/kg","Organic Farm","oils8.jpg"),
    mkOil(9,"Buffalo Ghee","₹550/L","Local Dairy","oils9.jpg"),
    mkOil(10,"Sesame Oil (Til Tel)","₹300/L","Tamil Nadu","oils10.jpg"),
    mkOil(11,"Rice Bran Oil","₹160/L","Local Factory","oils1.jpg"),
    mkOil(12,"Flaxseed Oil","₹400/500ml","Health Store","oils2.webp"),
    mkOil(13,"Avocado Oil","₹800/250ml","Imported","oils3.webp"),
    mkOil(14,"Almond Oil","₹500/250ml","Kashmir","oils4.jpg"),
    mkOil(15,"Castor Oil (Arandi)","₹200/500ml","Local Market","oils5.jpg"),
    mkOil(16,"Palm Oil","₹120/L","South India","oils6.webp"),
    mkOil(17,"Vanaspati Ghee","₹180/kg","Dalda","oils7.jpg"),
    mkOil(18,"Kachi Ghani Mustard Oil","₹200/L","Rajasthan","oils8.jpg"),
    mkOil(19,"Canola Oil","₹170/L","Imported","oils9.jpg"),
    mkOil(20,"Cold Pressed Coconut Oil","₹350/500ml","Kerala","oils10.jpg"),
  ],
  "munchies": [
    mkSnk(1,"Kurkure Masala Munch","₹20/pack","PepsiCo","munchies1.jpg"),
    mkSnk(2,"Lay's Classic Salted","₹30/pack","PepsiCo","munchies2.jpg"),
    mkSnk(3,"Bingo Mad Angles","₹30/pack","ITC","munchies3.jpg"),
    mkSnk(4,"Haldiram Bhujia","₹80/400g","Haldiram's","munchies4.webp"),
    mkSnk(5,"Pringles Original","₹200/165g","Imported","munchies5.jpg"),
    mkSnk(6,"Bikaji Aloo Bhujia","₹60/400g","Bikaji","munchies6.jpg"),
    mkSnk(7,"Doritos Nacho Cheese","₹80/pack","PepsiCo","munchies7.webp"),
    mkSnk(8,"Parle Wafers","₹25/pack","Parle","munchies8.jpg"),
    mkSnk(9,"Too Yumm Multigrain","₹20/pack","Guiltfree","munchies9.webp"),
    mkSnk(10,"Balaji Waffers","₹30/pack","Balaji","munchies10.jpg"),
    mkSnk(11,"Bhel Puri Mix","₹40/250g","Local Brand","munchies1.jpg"),
    mkSnk(12,"Chivda Roasted","₹50/250g","Haldiram's","munchies2.jpg"),
    mkSnk(13,"Popcorn (Salted)","₹20/pack","ACT II","munchies3.jpg"),
    mkSnk(14,"Roasted Cashews","₹200/200g","Premium","munchies4.webp"),
    mkSnk(15,"Peanut Chikki","₹20/piece","Local Brand","munchies5.jpg"),
    mkSnk(16,"Moong Dal Namkeen","₹60/200g","Haldiram's","munchies6.jpg"),
    mkSnk(17,"Soan Papdi","₹80/250g","Bikaji","munchies7.webp"),
    mkSnk(18,"Fox Nuts (Makhana)","₹150/200g","Bihar","munchies8.jpg"),
    mkSnk(19,"Nachos (Triangles)","₹50/pack","Bingo","munchies9.webp"),
    mkSnk(20,"Mixed Dry Fruits Chaat","₹180/200g","Premium","munchies10.jpg"),
  ],
  "sweet-tooth": [
    mkSwt(1,"Gulab Jamun","₹120/500g","Local Mithai","sweet1.png"),
    mkSwt(2,"Rasgulla","₹140/500g","K.C. Das","sweet2.png"),
    mkSwt(3,"Kaju Katli","₹600/500g","Haldiram's","sweettooth3.jpg"),
    mkSwt(4,"Ladoo (Boondi)","₹200/500g","Local Shop","sweettooth4.webp"),
    mkSwt(5,"Barfi (Milk)","₹300/500g","Local Mithai","sweet5.webp"),
    mkSwt(6,"Jalebi","₹100/500g","Street Vendor","sweettooth6.webp"),
    mkSwt(7,"Halwa (Gajar)","₹250/kg","Home Kitchen","sweettooth7.webp"),
    mkSwt(8,"Kulfi (Malai)","₹30/piece","Ice Cream Parlor","sweettooth8.jpg"),
    mkSwt(9,"Kheer","₹60/cup","Local Dairy","sweet9.png"),
    mkSwt(10,"Peda","₹120/250g","Mathura","sweet10.webp"),
    mkSwt(11,"Mysore Pak","₹300/500g","Karnataka","sweet1.png"),
    mkSwt(12,"Chamcham","₹150/500g","Bengal","sweet2.png"),
    mkSwt(13,"Kalakand","₹280/500g","Alwar","sweettooth3.jpg"),
    mkSwt(14,"Malpua","₹80/4pcs","Local Shop","sweettooth4.webp"),
    mkSwt(15,"Besan Ladoo","₹250/500g","Home Kitchen","sweet5.webp"),
    mkSwt(16,"Ras Malai","₹160/6pcs","Bengali Sweets","sweettooth6.webp"),
    mkSwt(17,"Shahi Tukda","₹120/2pcs","Mithai Shop","sweettooth7.webp"),
    mkSwt(18,"Balushahi","₹100/250g","Local Shop","sweettooth8.jpg"),
    mkSwt(19,"Imarti","₹60/2pcs","Street Vendor","sweet9.png"),
    mkSwt(20,"Chenna Murki","₹200/500g","Odisha","sweet10.webp"),
  ],
  "cold-drinks-and-juices": [
    mkDrk(1,"Coca Cola (750ml)","₹45/bottle","Coca-Cola","drinks1.jpg"),
    mkDrk(2,"Pepsi (750ml)","₹40/bottle","PepsiCo","drinks2.jpg"),
    mkDrk(3,"Sprite (750ml)","₹40/bottle","Coca-Cola","drinks3.jpg"),
    mkDrk(4,"Thums Up (750ml)","₹45/bottle","Coca-Cola","drinks4.jpg"),
    mkDrk(5,"Real Juice (Mixed Fruit)","₹35/200ml","Dabur","drinks5.jpg"),
    mkDrk(6,"Tropicana Orange","₹45/200ml","PepsiCo","drinks6.webp"),
    mkDrk(7,"Minute Maid Mango","₹50/250ml","Coca-Cola","drinks7.jpg"),
    mkDrk(8,"Frooti","₹20/200ml","Parle","drinks8.png"),
    mkDrk(9,"Red Bull Energy Drink","₹125/can","Red Bull","drinks9.webp"),
    mkDrk(10,"Limca (Lemon)","₹40/750ml","Coca-Cola","drinks11.jpg"),
    mkDrk(11,"Maaza Mango","₹30/200ml","Coca-Cola","drinks1.jpg"),
    mkDrk(12,"7UP Nimbooz","₹30/350ml","PepsiCo","drinks2.jpg"),
    mkDrk(13,"Appy Fizz","₹30/250ml","Parle","drinks3.jpg"),
    mkDrk(14,"Rasna Orange","₹20/200ml","Rasna","drinks4.jpg"),
    mkDrk(15,"Bisleri Water (1L)","₹20/bottle","Bisleri","drinks5.jpg"),
    mkDrk(16,"Paper Boat Aamras","₹40/200ml","Paper Boat","drinks6.webp"),
    mkDrk(17,"Tender Coconut Water","₹60/pack","Paperboat","drinks7.jpg"),
    mkDrk(18,"Monster Energy","₹150/can","Monster","drinks8.png"),
    mkDrk(19,"Boost Glucose","₹25/200ml","GSK","drinks9.webp"),
    mkDrk(20,"Nimboo Pani (Nimbu Soda)","₹30/bottle","Local Brand","drinks11.jpg"),
  ],
  "biscuits-and-cakes": [
    mkBsk(1,"Parle-G Glucose Biscuits","₹30/pack","Parle","biskut1.webp"),
    mkBsk(2,"Britannia Good Day","₹50/pack","Britannia","biskut2.jpg"),
    mkBsk(3,"Oreo Original","₹40/pack","Mondelez","biskut3.jpg"),
    mkBsk(4,"Digestive Marie (McVitie's)","₹80/pack","McVitie's","biskut4.jpg"),
    mkBsk(5,"Bourbon Biscuits (Britannia)","₹50/pack","Britannia","biskut5.webp"),
    mkBsk(6,"Black Forest Pastry","₹80/piece","Bakery","biskut6.jpg"),
    mkBsk(7,"Chocolate Truffle Cake","₹600/kg","Bakery","biskut7.webp"),
    mkBsk(8,"Pineapple Cake (Pastry)","₹70/piece","Bakery","biskut8.webp"),
    mkBsk(9,"Hide & Seek (Parle)","₹120/pack","Parle","biskut9.jpg"),
    mkBsk(10,"Nutrichoice (Britannia)","₹150/pack","Britannia","biskut10.jpg"),
    mkBsk(11,"Monaco Salted Crackers","₹30/pack","Parle","biskut1.webp"),
    mkBsk(12,"Cream Roll","₹15/piece","Local Bakery","biskut2.jpg"),
    mkBsk(13,"Khari Biscuit","₹30/pack","Local Bakery","biskut3.jpg"),
    mkBsk(14,"Brownie (Chocolate)","₹40/piece","Bakery","biskut4.jpg"),
    mkBsk(15,"Croissant (Butter)","₹30/piece","Bakery","biskut5.webp"),
    mkBsk(16,"Red Velvet Cupcake","₹60/piece","Bakery","biskut6.jpg"),
    mkBsk(17,"Macarons (Assorted)","₹200/6pcs","Premium Bakery","biskut7.webp"),
    mkBsk(18,"Muffin (Blueberry)","₹50/piece","Bakery","biskut8.webp"),
    mkBsk(19,"Wafer Sticks (Kitkat)","₹30/pack","Nestlé","biskut9.jpg"),
    mkBsk(20,"Cookies (Choco Chip)","₹80/pack","American Garden","biskut10.jpg"),
  ],
};

function ShopDetails({ name }) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("All");

  useEffect(() => {
    const cards = document.querySelectorAll(".sd-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 50);
        else e.target.classList.remove("visible");
      }), { threshold: 0.05 }
    );
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [name, sortBy]);

  const raw  = shopData[name] || [];
  const meta = CATEGORY_META[name] || { icon: "🛒", label: name, sub: "" };

  const parsePrice = (p) => parseInt(p.replace(/[^0-9]/g,"")) || 0;

  let items = [...raw];
  if (sortBy === "Price: Low")  items.sort((a,b) => parsePrice(a.price) - parsePrice(b.price));
  if (sortBy === "Price: High") items.sort((a,b) => parsePrice(b.price) - parsePrice(a.price));
  if (sortBy === "Nearest")     items = items.slice(0,10);

  return (
    <div className="shop-detail-page">
      <div className="sd-hero">
        <div className="sd-hero-inner">
          <div className="sd-hero-top">
            <button className="sd-back" onClick={() => router.back()}>← Back</button>
            <p className="sd-breadcrumb">Home / Shop / {meta.label}</p>
          </div>
          <div className="sd-hero-content">
            <span className="sd-hero-icon">{meta.icon}</span>
            <div>
              <h1 className="sd-hero-title">{meta.label}</h1>
              <div className="sd-hero-sub">
                <span>⚡ 10-20 min delivery</span>
                <span className="sd-hero-tag">{items.length} Items</span>
                <span className="sd-hero-tag">{meta.sub}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sd-main">
        <div className="sd-sort-bar">
          {SORT_OPTIONS.map(s => (
            <button key={s} className={`sd-sort-btn ${sortBy === s ? "active" : ""}`} onClick={() => setSortBy(s)}>{s}</button>
          ))}
          <span className="sd-count">{items.length} products</span>
        </div>

        {items.length === 0 ? (
          <div style={{textAlign:"center",padding:"60px 20px",color:"var(--gray)"}}>
            <div style={{fontSize:48,marginBottom:16}}>🛒</div>
            <h3>No products found</h3>
          </div>
        ) : (
          <div className="sd-grid">
            {items.map((item) => (
              <div key={item.id} className="sd-card" onClick={() => router.push(`/shop/${name}/${item.id}`)}>
                <div className="sd-card-img">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <span className="sd-card-discount">5% OFF</span>
                </div>
                <div className="sd-card-body">
                  <div className="sd-card-name">{item.name}</div>
                  <div className="sd-card-loc">📍 {item.location}</div>
                  <div className="sd-card-bottom">
                    <span className="sd-card-price">{item.price}</span>
                    <button className="sd-card-add" onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/order?productName=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&category=${encodeURIComponent(item.category)}&image=${encodeURIComponent(item.img)}&location=${encodeURIComponent(item.location)}`);
                    }}>ADD +</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopDetails;
