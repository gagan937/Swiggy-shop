"use client";

import Slider from "../components/slider";
import Foodoptions from "../components/foodoptions";
import Shopslider from "../components/shopslider";
import FoodDilevery from "../components/FoodDilevery";
import Footer from "../components/Footer";
import Mapbox from "../components/Mapbox";
import OffersStrip from "./OffersStrip";

function Homepage(){
  return (
    <div style={{overflowX:"hidden", background:"var(--bg)"}}>
      <Slider/>
      <OffersStrip/>
      <Foodoptions/>
      <Shopslider/>
      <FoodDilevery/>
      <Mapbox/>
      <Footer/>
    </div>
  );
}
export default Homepage;
