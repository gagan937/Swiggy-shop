"use client";

import { useRouter } from "next/navigation";

function FoodproductDetails({ name, id }) {
  const router = useRouter();

  const restaurantData = {


cake: [

  { id:1, name:"Fresh Cake", rating:"₹400", time:"30-40 mins", category:"Chocolate Cake", location:"Meerut", img:"/image/Cake.png" },
  { id:2, name:"Fresh Cake", rating:"₹450", time:"30-35 mins", category:"Waffle Cake", location:"Delhi", img:"/image/PRCAKE003.jpeg" },
  { id:3, name:"Fresh Cake", rating:"₹350", time:"30-35 mins", category:"Red Velvet Cake", location:"Noida", img:"/image/1463855614567_richvelvetchocolate_1024x.jpeg" },
  { id:4, name:"Fresh Cake", rating:"₹500", time:"30-35 mins", category:"Fruit Cake", location:"Ghaziabad", img:"/image/78_0ac3508e-d212-4799-b47c-9f7be14a04fc_grande.jpeg" },
  { id:5, name:"Fresh Cake", rating:"₹380", time:"30-35 mins", category:"Vanilla Cake", location:"Meerut", img:"/image/26b272f2-76ca-4a50-a99d-196d2669ee13_1224840.jpeg" },
  { id:6, name:"Fresh Cake", rating:"₹420", time:"30-35 mins", category:"Butterscotch Cake", location:"Delhi", img:"/image/00(4800.jpeg" },
  { id:7, name:"Fresh Cake", rating:"₹460", time:"30-35 mins", category:"Pineapple Cake", location:"Noida", img:"/image/Screenshot-2024-11-13-172612.jpeg" },
  { id:8, name:"Fresh Cake", rating:"₹390", time:"30-35 mins", category:"Strawberry Cake", location:"Ghaziabad", img:"/image/CH571-600x600.jpeg" },
  { id:9, name:"Fresh Cake", rating:"₹410", time:"30-35 mins", category:"Truffle Cake", location:"Meerut", img:"/image/FShreemithai15-01-2021-407lowrescopy_2400x.jpeg" },
  { id:10, name:"Fresh Cake", rating:"₹370", time:"30-35 mins", category:"Chocolate Cake", location:"Delhi", img:"/image/images.jpeg" },
  { id:11, name:"Fresh Cake", rating:"₹480", time:"30-35 mins", category:"Black Forest Cake", location:"Noida", img:"/image/BlackForestCake_2_8a678d31-d522-4920-b30c-0dd07aab166e.jpeg" },
  { id:12, name:"Fresh Cake", rating:"₹520", time:"30-35 mins", category:"Black Forest Cake", location:"Ghaziabad", img:"/image/v4pca9agr4tbeend27na.jpeg" },
  { id:13, name:"Fresh Cake", rating:"₹440", time:"30-35 mins", category:"Choco Velvet Cake", location:"Meerut", img:"/image/choco-velvet-birthday-cake-half-kg_1_02313a0c-38aa-4150-a0a3-e494cb28cd66.jpeg" },
  { id:14, name:"Fresh Cake", rating:"₹360", time:"30-35 mins", category:"Vanilla Cake", location:"Delhi", img:"/image/994f7399d267cc29b809beabc6f856f4.jpeg" },
  { id:15, name:"Fresh Cake", rating:"₹550", time:"30-35 mins", category:"Floral Cake", location:"Noida", img:"/image/FloralFantasyCake.jpeg" },
  { id:16, name:"Fresh Cake", rating:"₹490", time:"30-35 mins", category:"Birthday Cake", location:"Ghaziabad", img:"/image/beautiful-birthday-cake-images-download-with-name.jpeg" },
  { id:17, name:"Fresh Cake", rating:"₹430", time:"30-35 mins", category:"Birthday Cake", location:"Meerut", img:"/image/2aa54879c9add46cb02e90ad06a3ff22.jpeg" },
  { id:18, name:"Fresh Cake", rating:"₹470", time:"30-35 mins", category:"Designer Cake", location:"Delhi", img:"/image/5bf72acd3fe24af26d2adfceb3d6740f.jpeg" },
  { id:19, name:"Fresh Cake", rating:"₹395", time:"30-35 mins", category:"Chocolate Cake", location:"Noida", img:"/image/images (1).jpeg" },
  { id:20, name:"Fresh Cake", rating:"₹415", time:"30-35 mins", category:"Fruit Cake", location:"Ghaziabad", img:"/image/images (2).jpeg" },
  { id:21, name:"Fresh Cake", rating:"₹385", time:"30-35 mins", category:"Truffle Cake", location:"Meerut", img:"/image/139151deda8fbcbb99509532dc51b36b.jpeg" },
],


idli: [
  { id:1, name:"Idli Sambar", rating:"₹60", time:"25-30 mins", category:"Steamed Idli", location:"Meerut", img:"/image/360_F_419049416_76icDqQfAWQ2kwK8k6iAj4cXLUAZICCF.jpeg" },
  { id:2, name:"Idli Sambar", rating:"₹55", time:"20-25 mins", category:"Idli Sambar", location:"Delhi", img:"/image/7b5d674786326eb39e6af76f112829df.jpeg" },
  { id:3, name:"Idli Sambar", rating:"₹65", time:"25-30 mins", category:"Idli Chutney", location:"Noida", img:"/image/idly-sambar-idli-with-sambhar-green-red-chutney-popular-south-indian-breakfast_999766-2544.jpeg" },
  { id:4, name:"Idli Sambar", rating:"₹50", time:"20-25 mins", category:"Idli Sambar", location:"Ghaziabad", img:"/image/m79gsmo7an (1).jpeg" },
  { id:5, name:"Idli Sambar", rating:"₹70", time:"25-30 mins", category:"Steamed Idli", location:"Meerut", img:"/image/360_F_1554228698_aSqrC644ACTJDQPfWcdPs3C5eYmZrVlw.jpeg" },
  { id:6, name:"Idli Sambar", rating:"₹60", time:"25-30 mins", category:"Idli Breakfast", location:"Delhi", img:"/image/Why-South-Indian-Food-Is-Best-for-Digestion-Gut-Health-Daily-Breakfast.jpeg" },
  { id:7, name:"Idli Sambar", rating:"₹55", time:"25-30 mins", category:"Idli Sambar", location:"Noida", img:"/image/images.jpeg" },
  { id:8, name:"Idli Chutney", rating:"₹65", time:"25-30 mins", category:"Idli Chutney", location:"Ghaziabad", img:"/image/idly-sambar-idli-sambhar-green-260nw-2428660787.jpeg" },
  { id:9, name:"Idli Chutney", rating:"₹60", time:"25-30 mins", category:"Idli Chutney", location:"Meerut", img:"/image/idly-sambar-idli-sambhar-green-260nw-1154073754.jpeg" },
  { id:10, name:"Idli Breakfast", rating:"₹55", time:"25-30 mins", category:"Idli Breakfast", location:"Delhi", img:"/image/south-indian-breakfast-food-idli-260nw-2464099789.jpeg" },
  { id:11, name:"Idli Breakfast", rating:"₹70", time:"25-30 mins", category:"Idli Breakfast", location:"Noida", img:"/image/south-indian-breakfast-idli-dosa-chutney-158574513.jpeg" },
  { id:12, name:"Andhra Idli", rating:"₹80", time:"25-30 mins", category:"Andhra Idli", location:"Ghaziabad", img:"/image/south-indian-andhra-idli-authentic-steamed-rice-cake-traditional-andhra-cuisine-food-photograp_788415-8505.jpeg" },
  { id:13, name:"Andhra Idli", rating:"₹75", time:"25-30 mins", category:"Andhra Idli", location:"Meerut", img:"/image/images (3).jpeg" },
  { id:14, name:"Idli Plate", rating:"₹65", time:"25-30 mins", category:"Idli Plate", location:"Delhi", img:"/image/slide-2.jpeg" },
  { id:15, name:"Idli Plate", rating:"₹70", time:"25-30 mins", category:"Idli Plate", location:"Noida", img:"/image/close-up-idli-steamed-rice-cakes-made-lentil-batter-served-sambar-chutney-arranged-banana-leaf-isolated-372736624.jpeg" },
  { id:16, name:"Idli Plate", rating:"₹60", time:"25-30 mins", category:"Idli Plate", location:"Ghaziabad", img:"/image/idli-with-sambhar-and-chutney.jpeg" },
  { id:17, name:"Idli Sambar", rating:"₹55", time:"25-30 mins", category:"Idli Sambar", location:"Meerut", img:"/image/idli-sambar.jpeg" },
  { id:18, name:"Idli Sambar", rating:"₹60", time:"25-30 mins", category:"Idli Sambar", location:"Delhi", img:"/image/idli-56a510b63df78cf772862c34.jpeg" },
],


 paratha: [
  { id:1, name:"Aloo Paratha", rating:"₹80", time:"20-25 mins", category:"Aloo Paratha", location:"Meerut", img:"/image/indian-traditional-breakfast-food-aloo-600nw-2628278447.jpeg" },
  { id:2, name:"Aloo Paratha", rating:"₹75", time:"20-25 mins", category:"Aloo Paratha", location:"Delhi", img:"/image/116A.jpeg" },
  { id:3, name:"Paneer Paratha", rating:"₹90", time:"20-25 mins", category:"Paneer Paratha", location:"Noida", img:"/image/30a2d9c37daf9d0fb1b6f231e96a9d17.jpeg" },
  { id:4, name:"Paneer Paratha", rating:"₹95", time:"20-25 mins", category:"Paneer Paratha", location:"Ghaziabad", img:"/image/paratha4.jpg" },
  { id:5, name:"Gobi Paratha", rating:"₹80", time:"20-25 mins", category:"Gobi Paratha", location:"Meerut", img:"/image/paratha5.jpg" },
  { id:6, name:"Gobi Paratha", rating:"₹85", time:"20-25 mins", category:"Gobi Paratha", location:"Delhi", img:"/image/paratha6.jpg" },
  { id:7, name:"Mooli Paratha", rating:"₹70", time:"20-25 mins", category:"Mooli Paratha", location:"Noida", img:"/image/paratha7.jpg" },
  { id:8, name:"Mooli Paratha", rating:"₹75", time:"20-25 mins", category:"Mooli Paratha", location:"Ghaziabad", img:"/image/paratha8.png" },
  { id:9, name:"Mix Paratha", rating:"₹90", time:"20-25 mins", category:"Mix Paratha", location:"Meerut", img:"/image/paratha9.png" },
  { id:10, name:"Mix Paratha", rating:"₹85", time:"20-25 mins", category:"Mix Paratha", location:"Delhi", img:"/image/paratha10.jpg" },
  { id:11, name:"Methi Paratha", rating:"₹75", time:"20-25 mins", category:"Methi Paratha", location:"Noida", img:"/image/paratha11.webp" },
  { id:12, name:"Methi Paratha", rating:"₹80", time:"20-25 mins", category:"Methi Paratha", location:"Ghaziabad", img:"/image/paratha12.jpg" },
  { id:13, name:"Dal Paratha", rating:"₹70", time:"20-25 mins", category:"Dal Paratha", location:"Meerut", img:"/image/paratha13.jpg" },
  { id:14, name:"Dal Paratha", rating:"₹75", time:"20-25 mins", category:"Dal Paratha", location:"Delhi", img:"/image/paratha14.jpg" },
  { id:15, name:"Butter Paratha", rating:"₹85", time:"20-25 mins", category:"Butter Paratha", location:"Noida", img:"/image/paratha15.jpg" },
  { id:16, name:"Butter Paratha", rating:"₹90", time:"20-25 mins", category:"Butter Paratha", location:"Ghaziabad", img:"/image/paratha16.webp" },
],


tea: [
  { id:1, name:"Masala Chai", rating:"₹20", time:"15-20 mins", category:"Masala Chai", location:"Meerut", img:"/image/tea1.jpg" },
  { id:2, name:"Masala Chai", rating:"₹25", time:"15-20 mins", category:"Masala Chai", location:"Delhi", img:"/image/tea2.jpg" },
  { id:3, name:"Adrak Chai", rating:"₹20", time:"15-20 mins", category:"Adrak Chai", location:"Noida", img:"/image/tea3.jpg" },
  { id:4, name:"Adrak Chai", rating:"₹25", time:"15-20 mins", category:"Adrak Chai", location:"Ghaziabad", img:"/image/tea4.jpg" },
  { id:5, name:"Green Tea", rating:"₹40", time:"15-20 mins", category:"Green Tea", location:"Meerut", img:"/image/tea5.webp" },
  { id:6, name:"Green Tea", rating:"₹45", time:"15-20 mins", category:"Green Tea", location:"Delhi", img:"/image/tea6.webp" },
  { id:7, name:"Kadak Chai", rating:"₹15", time:"15-20 mins", category:"Kadak Chai", location:"Noida", img:"/image/tea7.jpg" },
  { id:8, name:"Kadak Chai", rating:"₹20", time:"15-20 mins", category:"Kadak Chai", location:"Ghaziabad", img:"/image/tea8.webp" },
  { id:9, name:"Lemon Tea", rating:"₹35", time:"15-20 mins", category:"Lemon Tea", location:"Meerut", img:"/image/tea9.jpg" },
  { id:10, name:"Lemon Tea", rating:"₹30", time:"15-20 mins", category:"Lemon Tea", location:"Delhi", img:"/image/tea10.jpg" },
  { id:11, name:"Tulsi Chai", rating:"₹25", time:"15-20 mins", category:"Tulsi Chai", location:"Noida", img:"/image/tea11.jpg" },
  { id:12, name:"Tulsi Chai", rating:"₹30", time:"15-20 mins", category:"Tulsi Chai", location:"Ghaziabad", img:"/image/tea12.jpg" },
  { id:13, name:"Elaichi Chai", rating:"₹25", time:"15-20 mins", category:"Elaichi Chai", location:"Meerut", img:"/image/tea13.jpg" },
  { id:14, name:"Elaichi Chai", rating:"₹20", time:"15-20 mins", category:"Elaichi Chai", location:"Delhi", img:"/image/tea14.jpg" },
  { id:15, name:"Cutting Chai", rating:"₹15", time:"15-20 mins", category:"Cutting Chai", location:"Noida", img:"/image/tea22.webp" },
  { id:16, name:"Cutting Chai", rating:"₹20", time:"15-20 mins", category:"Cutting Chai", location:"Ghaziabad", img:"/image/tea16.jpg" },
  { id:17, name:"Special Chai", rating:"₹30", time:"15-20 mins", category:"Special Chai", location:"Meerut", img:"/image/tea17.png" },
],


kachori: [
  { id:1, name:"Pyaaz Kachori", rating:"₹30", time:"20-25 mins", category:"Pyaaz Kachori", location:"Meerut", img:"/image/kachori1.webp" },
  { id:2, name:"Dal Kachori", rating:"₹25", time:"20-25 mins", category:"Dal Kachori", location:"Delhi", img:"/image/kachori2.jpg" },
  { id:3, name:"Raj Kachori", rating:"₹40", time:"25-30 mins", category:"Raj Kachori", location:"Noida", img:"/image/kachori3.jpg" },
  { id:4, name:"Aloo Kachori", rating:"₹20", time:"20-25 mins", category:"Aloo Kachori", location:"Ghaziabad", img:"/image/kachori4.jpg" },
  { id:5, name:"Matar Kachori", rating:"₹25", time:"20-25 mins", category:"Matar Kachori", location:"Meerut", img:"/image/kachori5.jpg" },
  { id:6, name:"Khasta Kachori", rating:"₹30", time:"25-30 mins", category:"Khasta Kachori", location:"Delhi", img:"/image/kachori6.png" },
  { id:7, name:"Khasta Kachori", rating:"₹35", time:"25-30 mins", category:"Khasta Kachori", location:"Noida", img:"/image/kachori7.jpg" },
  { id:8, name:"Pyaaz Kachori", rating:"₹30", time:"25-30 mins", category:"Pyaaz Kachori", location:"Ghaziabad", img:"/image/kachori8.webp" },
  { id:9, name:"Dal Kachori", rating:"₹25", time:"25-30 mins", category:"Dal Kachori", location:"Meerut", img:"/image/kachori9.jpg" },
  { id:10, name:"Raj Kachori", rating:"₹45", time:"25-30 mins", category:"Raj Kachori", location:"Delhi", img:"/image/kachori10.jpg" },
  { id:11, name:"Matar Kachori", rating:"₹30", time:"25-30 mins", category:"Matar Kachori", location:"Noida", img:"/image/kachori11.jpg" },
  { id:12, name:"Aloo Kachori", rating:"₹25", time:"25-30 mins", category:"Aloo Kachori", location:"Ghaziabad", img:"/image/kachori12.jpg" },
  { id:13, name:"Urad Dal Kachori", rating:"₹30", time:"25-30 mins", category:"Urad Dal Kachori", location:"Meerut", img:"/image/kachori13.jpg" },
  { id:14, name:"Urad Dal Kachori", rating:"₹35", time:"25-30 mins", category:"Urad Dal Kachori", location:"Delhi", img:"/image/kachori14.jpg" },
  { id:15, name:"Bedmi Kachori", rating:"₹30", time:"25-30 mins", category:"Bedmi Kachori", location:"Noida", img:"/image/kachori15.jpg" },
  { id:16, name:"Bedmi Kachori", rating:"₹35", time:"25-30 mins", category:"Bedmi Kachori", location:"Ghaziabad", img:"/image/kachori16.webp" },
],

  
dosa: [
  { id:1, name:"Masala Dosa", rating:"₹80", time:"25-30 mins", category:"Masala Dosa", location:"Meerut", img:"/image/dhosa1.webp" },
  { id:2, name:"Plain Dosa", rating:"₹60", time:"20-25 mins", category:"Plain Dosa", location:"Delhi", img:"/image/dhosa2.png" },
  { id:3, name:"Rava Dosa", rating:"₹90", time:"20-25 mins", category:"Rava Dosa", location:"Noida", img:"/image/dhosa3.jpg" },
  { id:4, name:"Onion Dosa", rating:"₹75", time:"25-30 mins", category:"Onion Dosa", location:"Ghaziabad", img:"/image/dhosa4.jpg" },
  { id:5, name:"Paneer Dosa", rating:"₹100", time:"20-25 mins", category:"Paneer Dosa", location:"Meerut", img:"/image/dhosa5.png" },
  { id:6, name:"Masala Dosa", rating:"₹85", time:"25-30 mins", category:"Masala Dosa", location:"Delhi", img:"/image/dhosa6.webp" },
  { id:7, name:"Rava Dosa", rating:"₹95", time:"20-25 mins", category:"Rava Dosa", location:"Noida", img:"/image/dhosa7.png" },
  { id:8, name:"Mysore Dosa", rating:"₹90", time:"25-30 mins", category:"Mysore Dosa", location:"Ghaziabad", img:"/image/dhosa8.webp" },
  { id:9, name:"Mysore Dosa", rating:"₹85", time:"20-25 mins", category:"Mysore Dosa", location:"Meerut", img:"/image/dhosa9.webp" },
  { id:10, name:"Cheese Dosa", rating:"₹110", time:"25-30 mins", category:"Cheese Dosa", location:"Delhi", img:"/image/dhosa10.webp" },
  { id:11, name:"Cheese Dosa", rating:"₹120", time:"25-30 mins", category:"Cheese Dosa", location:"Noida", img:"/image/dhosa11.webp" },
  { id:12, name:"Egg Dosa", rating:"₹100", time:"25-30 mins", category:"Egg Dosa", location:"Ghaziabad", img:"/image/dhosa12.webp" },
  { id:13, name:"Egg Dosa", rating:"₹95", time:"25-30 mins", category:"Egg Dosa", location:"Meerut", img:"/image/dhosa13.webp" },
],

  

samosa: [
  { id:1, name:"Aloo Samosa", rating:"₹15", time:"20-25 mins", category:"Aloo Samosa", location:"Meerut", img:"/image/samosa1.jpg" },
  { id:2, name:"Aloo Samosa", rating:"₹12", time:"20-25 mins", category:"Aloo Samosa", location:"Delhi", img:"/image/samosa2.jpg" },
  { id:3, name:"Paneer Samosa", rating:"₹25", time:"25-30 mins", category:"Paneer Samosa", location:"Noida", img:"/image/samosa3.jpg" },
  { id:4, name:"Paneer Samosa", rating:"₹20", time:"20-25 mins", category:"Paneer Samosa", location:"Ghaziabad", img:"/image/samosa4.jpg" },
  { id:5, name:"Mawa Samosa", rating:"₹30", time:"20-25 mins", category:"Mawa Samosa", location:"Meerut", img:"/image/samosa5.jpg" },
  { id:6, name:"Mawa Samosa", rating:"₹35", time:"25-30 mins", category:"Mawa Samosa", location:"Delhi", img:"/image/samosa6.jpg" },
  { id:7, name:"Keema Samosa", rating:"₹30", time:"25-30 mins", category:"Keema Samosa", location:"Noida", img:"/image/samosa7.jpg" },
  { id:8, name:"Keema Samosa", rating:"₹35", time:"25-30 mins", category:"Keema Samosa", location:"Ghaziabad", img:"/image/samosa8.jpg" },
  { id:9, name:"Pyaaz Samosa", rating:"₹15", time:"25-30 mins", category:"Pyaaz Samosa", location:"Meerut", img:"/image/samosa9.jpg" },
  { id:10, name:"Pyaaz Samosa", rating:"₹20", time:"25-30 mins", category:"Pyaaz Samosa", location:"Delhi", img:"/image/samosa10.png" },
  { id:11, name:"Noodle Samosa", rating:"₹25", time:"25-30 mins", category:"Noodle Samosa", location:"Noida", img:"/image/samosa11.png" },
  { id:12, name:"Noodle Samosa", rating:"₹30", time:"25-30 mins", category:"Noodle Samosa", location:"Ghaziabad", img:"/image/samosa12.jpg" },
  { id:13, name:"Cheese Samosa", rating:"₹35", time:"25-30 mins", category:"Cheese Samosa", location:"Meerut", img:"/image/samosa13.webp" },
],

   

coffee: [
  { id:1, name:"Espresso", rating:"₹80", time:"20-25 mins", category:"Espresso", location:"Meerut", img:"/image/cofee1.jpg" },
  { id:2, name:"Cappuccino", rating:"₹120", time:"20-25 mins", category:"Cappuccino", location:"Delhi", img:"/image/cofee2.jpg" },
  { id:3, name:"Latte", rating:"₹130", time:"20-25 mins", category:"Latte", location:"Noida", img:"/image/cofee3.webp" },
  { id:4, name:"Cold Coffee", rating:"₹150", time:"15-20 mins", category:"Cold Coffee", location:"Ghaziabad", img:"/image/cofee4.jpg" },
  { id:5, name:"Cold Coffee", rating:"₹140", time:"20-25 mins", category:"Cold Coffee", location:"Meerut", img:"/image/cofee5.jpg" },
  { id:6, name:"Black Coffee", rating:"₹70", time:"15-20 mins", category:"Black Coffee", location:"Delhi", img:"/image/cofee6.webp" },
  { id:7, name:"Black Coffee", rating:"₹75", time:"20-25 mins", category:"Black Coffee", location:"Noida", img:"/image/cofee7.jpg" },
  { id:8, name:"Mocha", rating:"₹160", time:"20-25 mins", category:"Mocha", location:"Ghaziabad", img:"/image/cofee8.jpg" },
  { id:9, name:"Mocha", rating:"₹150", time:"20-25 mins", category:"Mocha", location:"Meerut", img:"/image/cofee9.webp" },
  { id:10, name:"Americano", rating:"₹90", time:"20-25 mins", category:"Americano", location:"Delhi", img:"/image/cofee10.jpg" },
  { id:11, name:"Americano", rating:"₹95", time:"20-25 mins", category:"Americano", location:"Noida", img:"/image/cofee11.jpg" },
  { id:12, name:"Frappe", rating:"₹170", time:"20-25 mins", category:"Frappe", location:"Ghaziabad", img:"/image/cofee12.jpg" },
  { id:13, name:"Frappe", rating:"₹180", time:"20-25 mins", category:"Frappe", location:"Meerut", img:"/image/cofee13.jpg" },
  { id:14, name:"Irish Coffee", rating:"₹200", time:"20-25 mins", category:"Irish Coffee", location:"Delhi", img:"/image/cofee14.webp" },
],

   
poha: [
  { id:1, name:"Indori Poha", rating:"₹40", time:"15-20 mins", category:"Indori Poha", location:"Meerut", img:"/image/poha1.jpg" },
  { id:2, name:"Indori Poha", rating:"₹35", time:"15-20 mins", category:"Indori Poha", location:"Delhi", img:"/image/poha2.webp" },
  { id:3, name:"Kanda Poha", rating:"₹30", time:"15-20 mins", category:"Kanda Poha", location:"Noida", img:"/image/poha3.webp" },
  { id:4, name:"Kanda Poha", rating:"₹35", time:"15-20 mins", category:"Kanda Poha", location:"Ghaziabad", img:"/image/poha4.webp" },
  { id:5, name:"Poha Jalebi", rating:"₹50", time:"15-20 mins", category:"Poha Jalebi", location:"Meerut", img:"/image/poha5.jpg" },
  { id:6, name:"Poha Jalebi", rating:"₹55", time:"15-20 mins", category:"Poha Jalebi", location:"Delhi", img:"/image/poha10.webp" },
  { id:7, name:"Batata Poha", rating:"₹40", time:"15-20 mins", category:"Batata Poha", location:"Noida", img:"/image/poha7.jpg" },
  { id:8, name:"Batata Poha", rating:"₹35", time:"15-20 mins", category:"Batata Poha", location:"Ghaziabad", img:"/image/poha8.jpg" },
  { id:9, name:"Masala Poha", rating:"₹45", time:"15-20 mins", category:"Masala Poha", location:"Meerut", img:"/image/poha9.jpg" },
  { id:10, name:"Masala Poha", rating:"₹40", time:"15-20 mins", category:"Masala Poha", location:"Delhi", img:"/image/poha10.jpg" },
  { id:11, name:"Dadpe Pohe", rating:"₹50", time:"15-20 mins", category:"Dadpe Pohe", location:"Noida", img:"/image/poha11.webp" },
  { id:12, name:"Dadpe Pohe", rating:"₹45", time:"15-20 mins", category:"Dadpe Pohe", location:"Ghaziabad", img:"/image/poha12.jpg" },
  { id:13, name:"Dahi Poha", rating:"₹55", time:"15-20 mins", category:"Dahi Poha", location:"Meerut", img:"/image/poha13.webp" },
],

    
poori: [
  { id:1, name:"Aloo Poori", rating:"₹60", time:"20-25 mins", category:"Aloo Poori", location:"Meerut", img:"/image/puri1.jpg" },
  { id:2, name:"Aloo Poori", rating:"₹55", time:"20-25 mins", category:"Aloo Poori", location:"Delhi", img:"/image/puri2.jpg" },
  { id:3, name:"Poori Bhaji", rating:"₹50", time:"15-20 mins", category:"Poori Bhaji", location:"Noida", img:"/image/puri3.webp" },
  { id:4, name:"Poori Bhaji", rating:"₹55", time:"20-25 mins", category:"Poori Bhaji", location:"Ghaziabad", img:"/image/puri4.jpg" },
  { id:5, name:"Puri Sabzi", rating:"₹60", time:"20-25 mins", category:"Puri Sabzi", location:"Meerut", img:"/image/puri5.jpg" },
  { id:6, name:"Puri Sabzi", rating:"₹65", time:"20-25 mins", category:"Puri Sabzi", location:"Delhi", img:"/image/puri6.jpg" },
  { id:7, name:"Bedmi Poori", rating:"₹70", time:"20-25 mins", category:"Bedmi Poori", location:"Noida", img:"/image/puri7.webp" },
  { id:8, name:"Bedmi Poori", rating:"₹75", time:"20-25 mins", category:"Bedmi Poori", location:"Ghaziabad", img:"/image/puri8.jpg" },
  { id:9, name:"Halwa Poori", rating:"₹80", time:"20-25 mins", category:"Halwa Poori", location:"Meerut", img:"/image/puri9.jpg" },
  { id:10, name:"Halwa Poori", rating:"₹85", time:"20-25 mins", category:"Halwa Poori", location:"Delhi", img:"/image/puri10.jpg" },
  { id:11, name:"Chana Poori", rating:"₹65", time:"20-25 mins", category:"Chana Poori", location:"Noida", img:"/image/puri11.jpg" },
  { id:12, name:"Chana Poori", rating:"₹70", time:"20-25 mins", category:"Chana Poori", location:"Ghaziabad", img:"/image/puri12.webp" },
  { id:13, name:"Khasta Poori", rating:"₹60", time:"20-25 mins", category:"Khasta Poori", location:"Meerut", img:"/image/puri13.png" },
],

   juice: [
  { id:1, name:"Fresh Juice", rating:"₹60", time:"15-20 mins", category:"Fresh Juice", location:"Meerut", img:"/image/juice1.webp" },
  { id:2, name:"Fresh Juice", rating:"₹55", time:"15-20 mins", category:"Fresh Juice", location:"Delhi", img:"/image/juice2.webp" },
  { id:3, name:"Fresh Juice", rating:"₹70", time:"15-20 mins", category:"Fresh Juice", location:"Noida", img:"/image/juice3.jpg" },
  { id:4, name:"Fresh Juice", rating:"₹65", time:"15-20 mins", category:"Fresh Juice", location:"Ghaziabad", img:"/image/juice4.webp" },
  { id:5, name:"Fresh Juice", rating:"₹80", time:"15-20 mins", category:"Fresh Juice", location:"Meerut", img:"/image/juice5.jpeg" },
  { id:6, name:"Fresh Juice", rating:"₹75", time:"15-20 mins", category:"Fresh Juice", location:"Delhi", img:"/image/juice6.jpg" },
  { id:7, name:"Fresh Juice", rating:"₹90", time:"15-20 mins", category:"Fresh Juice", location:"Noida", img:"/image/juice7.jpg" },
  { id:8, name:"Fresh Juice", rating:"₹85", time:"15-20 mins", category:"Fresh Juice", location:"Ghaziabad", img:"/image/juice8.jpg" },
  { id:9, name:"Fresh Juice", rating:"₹50", time:"15-20 mins", category:"Fresh Juice", location:"Meerut", img:"/image/juice9.jpg" },
  { id:10, name:"Fresh Juice", rating:"₹55", time:"15-20 mins", category:"Fresh Juice", location:"Delhi", img:"/image/juice10.jpg" },
  { id:11, name:"Fresh Juice", rating:"₹70", time:"15-20 mins", category:"Fresh Juice", location:"Noida", img:"/image/juice11.jpg" },
  { id:12, name:"Fresh Juice", rating:"₹65", time:"15-20 mins", category:"Fresh Juice", location:"Ghaziabad", img:"/image/juice12.jpg" },
  { id:13, name:"Fresh Juice", rating:"₹80", time:"15-20 mins", category:"Fresh Juice", location:"Meerut", img:"/image/juice13.jpg" },
],

   
pakoda: [
  { id:1, name:"Aloo Pakoda", rating:"₹30", time:"20-25 mins", category:"Aloo Pakoda", location:"Meerut", img:"/image/pakoda1.jpg" },
  { id:2, name:"Aloo Pakoda", rating:"₹25", time:"20-25 mins", category:"Aloo Pakoda", location:"Delhi", img:"/image/pakoda2.webp" },
  { id:3, name:"Paneer Pakoda", rating:"₹50", time:"25-30 mins", category:"Paneer Pakoda", location:"Noida", img:"/image/pakoda3.webp" },
  { id:4, name:"Paneer Pakoda", rating:"₹45", time:"20-25 mins", category:"Paneer Pakoda", location:"Ghaziabad", img:"/image/pakoda4.jpg" },
  { id:5, name:"Pyaaz Pakoda", rating:"₹25", time:"20-25 mins", category:"Pyaaz Pakoda", location:"Meerut", img:"/image/pakoda5.jpg" },
  { id:6, name:"Pyaaz Pakoda", rating:"₹30", time:"20-25 mins", category:"Pyaaz Pakoda", location:"Delhi", img:"/image/pakoda6.jpg" },
  { id:7, name:"Palak Pakoda", rating:"₹35", time:"20-25 mins", category:"Palak Pakoda", location:"Noida", img:"/image/pakoda7.jpg" },
  { id:8, name:"Palak Pakoda", rating:"₹30", time:"20-25 mins", category:"Palak Pakoda", location:"Ghaziabad", img:"/image/pakoda8.jpg" },
  { id:9, name:"Bread Pakoda", rating:"₹40", time:"20-25 mins", category:"Bread Pakoda", location:"Meerut", img:"/image/pakoda9.jpg" },
  { id:10, name:"Bread Pakoda", rating:"₹35", time:"20-25 mins", category:"Bread Pakoda", location:"Delhi", img:"/image/pakoda10.webp" },
  { id:11, name:"Moong Dal Pakoda", rating:"₹30", time:"20-25 mins", category:"Moong Dal Pakoda", location:"Noida", img:"/image/pakoda11.jpg" },
  { id:12, name:"Moong Dal Pakoda", rating:"₹35", time:"20-25 mins", category:"Moong Dal Pakoda", location:"Ghaziabad", img:"/image/pakoda12.jpg" },
  { id:13, name:"Mix Pakoda", rating:"₹40", time:"20-25 mins", category:"Mix Pakoda", location:"Meerut", img:"/image/pakoda13.jpg" },
],

   
lassi: [
  { id:1, name:"Punjabi Lassi House", rating:"₹60", time:"15-20 mins", category:"Lassi, Beverages", location:"Meerut", img:"/image/lassi1.jpg" },
  { id:2, name:"Amritsari Lassi Corner", rating:"₹65", time:"15-20 mins", category:"Lassi, Punjabi Drinks", location:"Delhi", img:"/image/lassi2.jpg" },
  { id:3, name:"Desi Lassi Junction", rating:"₹55", time:"15-20 mins", category:"Beverages", location:"Noida", img:"/image/lassi3.jpg" },
  { id:4, name:"Sweet Lassi Cafe", rating:"₹50", time:"15-20 mins", category:"Lassi, Drinks", location:"Ghaziabad", img:"/image/lassi4.webp" },
  { id:5, name:"Traditional Lassi Point", rating:"₹80", time:"15-20 mins", category:"Lassi", location:"Meerut", img:"/image/lassi5.jpg" },
  { id:6, name:"Punjab Lassi Center", rating:"₹85", time:"15-20 mins", category:"Punjabi Drinks", location:"Delhi", img:"/image/lassi6.jpg" },
  { id:7, name:"Fresh Lassi Cafe", rating:"₹70", time:"15-20 mins", category:"Beverages", location:"Noida", img:"/image/lassi7.webp" },
  { id:8, name:"Royal Lassi Bar", rating:"₹75", time:"15-20 mins", category:"Lassi, Drinks", location:"Ghaziabad", img:"/image/lassi8.jpg" },
  { id:9, name:"Cool Lassi Hub", rating:"₹90", time:"15-20 mins", category:"Beverages", location:"Meerut", img:"/image/lassi9.jpg" },
  { id:10, name:"Village Style Lassi", rating:"₹85", time:"15-20 mins", category:"Traditional Drinks", location:"Delhi", img:"/image/lassi10.jpg" },
  { id:11, name:"Village Style Lassi", rating:"₹80", time:"15-20 mins", category:"Traditional Drinks", location:"Noida", img:"/image/lassi11.jpg" },
  { id:12, name:"Village Style Lassi", rating:"₹65", time:"15-20 mins", category:"Traditional Drinks", location:"Ghaziabad", img:"/image/lassi12.webp" },
  { id:13, name:"Village Style Lassi", rating:"₹100", time:"15-20 mins", category:"Traditional Drinks", location:"Meerut", img:"/image/lassi13.jpg" },
],

   
salad: [
  { id:1, name:"Fresh Salad Bowl", rating:"₹80", time:"15-20 mins", category:"Healthy Food, Salad", location:"Meerut", img:"/image/salad1.png" },
  { id:2, name:"Green Garden Salad", rating:"₹70", time:"15-20 mins", category:"Healthy Food", location:"Delhi", img:"/image/salad2.webp" },
  { id:3, name:"Healthy Bite Cafe", rating:"₹90", time:"20-25 mins", category:"Salad, Diet Food", location:"Noida", img:"/image/salad3.jpg" },
  { id:4, name:"Fit Food Salad Bar", rating:"₹85", time:"15-20 mins", category:"Healthy Salad", location:"Ghaziabad", img:"/image/salad4.jpg" },
  { id:5, name:"Organic Salad Cafe", rating:"₹100", time:"20-25 mins", category:"Organic Food", location:"Meerut", img:"/image/salad5.jpg" },
  { id:6, name:"Veggie Salad Corner", rating:"₹75", time:"15-20 mins", category:"Healthy Food", location:"Delhi", img:"/image/salad6.jpg" },
  { id:7, name:"Diet Delight Salad", rating:"₹90", time:"20-25 mins", category:"Diet Food", location:"Noida", img:"/image/salad7.jpg" },
  { id:8, name:"Fresh Veg Salad Hub", rating:"₹80", time:"15-20 mins", category:"Healthy Salad", location:"Ghaziabad", img:"/image/salad8.webp" },
  { id:9, name:"Green Plate Cafe", rating:"₹95", time:"20-25 mins", category:"Organic Salad", location:"Meerut", img:"/image/salad9.jpg" },
  { id:10, name:"Nature Salad Point", rating:"₹85", time:"15-20 mins", category:"Healthy Food", location:"Delhi", img:"/image/salad10.jpg" },
  { id:11, name:"Nature Salad Point", rating:"₹80", time:"15-20 mins", category:"Healthy Food", location:"Noida", img:"/image/salad11.webp" },
  { id:12, name:"Nature Salad Point", rating:"₹90", time:"15-20 mins", category:"Healthy Food", location:"Ghaziabad", img:"/image/salad12.jpg" },
  { id:13, name:"Nature Salad Point", rating:"₹75", time:"15-20 mins", category:"Healthy Food", location:"Meerut", img:"/image/salad13.jpg" },
],

   
biryani: [
  { id:1, name:"Hyderabadi Biryani", rating:"₹180", time:"30-35 mins", category:"Hyderabadi Biryani", location:"Meerut", img:"/image/biryani1.jpg" },
  { id:2, name:"Veg Biryani", rating:"₹200", time:"30-40 mins", category:"Veg Biryani", location:"Delhi", img:"/image/biryani2.webp" },
  { id:3, name:"Lucknowi Biryani", rating:"₹160", time:"30-35 mins", category:"Lucknowi Biryani", location:"Noida", img:"/image/biryani3.png" },
  { id:4, name:"Spicy Biryani", rating:"₹170", time:"30-40 mins", category:"Spicy Biryani", location:"Ghaziabad", img:"/image/biryani4.webp" },
  { id:5, name:"Dum Biryani", rating:"₹220", time:"30-35 mins", category:"Dum Biryani", location:"Meerut", img:"/image/biryani5.webp" },
  { id:6, name:"Chicken Biryani", rating:"₹150", time:"30-35 mins", category:"Chicken Biryani", location:"Delhi", img:"/image/biryani6.jpg" },
  { id:7, name:"Mutton Biryani", rating:"₹260", time:"30-40 mins", category:"Mutton Biryani", location:"Noida", img:"/image/biryani7.webp" },
  { id:8, name:"Egg Biryani", rating:"₹180", time:"30-35 mins", category:"Egg Biryani", location:"Ghaziabad", img:"/image/biryani8.jpg" },
  { id:9, name:"Paneer Biryani", rating:"₹200", time:"30-35 mins", category:"Paneer Biryani", location:"Meerut", img:"/image/biryani9.jpg" },
  { id:10, name:"Kofta Biryani", rating:"₹190", time:"30-40 mins", category:"Kofta Biryani", location:"Delhi", img:"/image/biryani10.jpg" },
  { id:11, name:"Shrimp Biryani", rating:"₹240", time:"30-40 mins", category:"Shrimp Biryani", location:"Noida", img:"/image/biryani11.webp" },
  { id:12, name:"Soya Biryani", rating:"₹220", time:"30-40 mins", category:"Soya Biryani", location:"Ghaziabad", img:"/image/biryani12.webp" },
  { id:13, name:"Special Biryani", rating:"₹250", time:"30-40 mins", category:"Special Biryani", location:"Meerut", img:"/image/biryani13.webp" },
],

   
dhokla: [
  { id:1, name:"Steamed Dhokla", rating:"₹60", time:"20-25 mins", category:"Steamed Dhokla", location:"Meerut", img:"/image/dhokala1.jpg" },
  { id:2, name:"Surti Dhokla", rating:"₹55", time:"20-25 mins", category:"Surti Dhokla", location:"Delhi", img:"/image/dhokala2.jpg" },
  { id:3, name:"Khatta Dhokla", rating:"₹50", time:"20-25 mins", category:"Khatta Dhokla", location:"Noida", img:"/image/dhokala3.webp" },
  { id:4, name:"Khatta Dhokla", rating:"₹65", time:"20-25 mins", category:"Khatta Dhokla", location:"Ghaziabad", img:"/image/dhokala4.jpg" },
  { id:5, name:"Rava Dhokla", rating:"₹60", time:"20-25 mins", category:"Rava Dhokla", location:"Meerut", img:"/image/dhokala5.jpg" },
  { id:6, name:"Rava Dhokla", rating:"₹70", time:"20-25 mins", category:"Rava Dhokla", location:"Delhi", img:"/image/dhokala6.webp" },
  { id:7, name:"Moong Dal Dhokla", rating:"₹55", time:"20-25 mins", category:"Moong Dal Dhokla", location:"Noida", img:"/image/dhokala7.webp" },
  { id:8, name:"Moong Dal Dhokla", rating:"₹65", time:"20-25 mins", category:"Moong Dal Dhokla", location:"Ghaziabad", img:"/image/dhokala8.jpg" },
  { id:9, name:"Cheese Dhokla", rating:"₹80", time:"20-25 mins", category:"Cheese Dhokla", location:"Meerut", img:"/image/dhokala9.webp" },
  { id:10, name:"Cheese Dhokla", rating:"₹75", time:"20-25 mins", category:"Cheese Dhokla", location:"Delhi", img:"/image/dhokala10.jpg" },
  { id:11, name:"Palak Dhokla", rating:"₹65", time:"20-25 mins", category:"Palak Dhokla", location:"Noida", img:"/image/dhokala11.webp" },
  { id:12, name:"Palak Dhokla", rating:"₹60", time:"20-25 mins", category:"Palak Dhokla", location:"Ghaziabad", img:"/image/dhokala12.jpg" },
  { id:13, name:"Special Dhokla", rating:"₹85", time:"20-25 mins", category:"Special Dhokla", location:"Meerut", img:"/image/dhokala13.jpg" },
],


  };

  const items = restaurantData[name] || [];
  const item = items.find(i => String(i.id) === String(id));

  if (!item) return (
    <div className="pd-page">
      <div style={{textAlign:"center",padding:"80px 20px",color:"var(--gray)"}}>
        <div style={{fontSize:56,marginBottom:16}}>🍽️</div>
        <h2>Item not found</h2>
        <button onClick={() => router.back()} style={{marginTop:16,padding:"10px 24px",background:"var(--primary)",color:"white",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:14}}>← Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="pd-page">
      <div className="pd-back-bar">
        <div className="pd-back-inner">
          <button className="pd-back-btn" onClick={() => router.back()}>← Back</button>
          <p className="pd-breadcrumb">Home / Food / {name} / <strong>{item.category || item.name}</strong></p>
        </div>
      </div>

      <div className="pd-main">
        <div className="pd-card">
          <div className="pd-img-col">
            <div className="pd-img-bg" />
            <img src={item.img} alt={item.name} />
          </div>
          <div className="pd-info-col">
            <span className="pd-badge">🍽️ Restaurant Item</span>
            <h1 className="pd-name">{item.category || item.name}</h1>
            <p className="pd-category">{item.name} • {item.location}</p>
            <div className="pd-price">{item.rating}</div>
            <p className="pd-price-sub">✅ Delivery in {item.time}</p>

            <div className="pd-meta-grid">
              <div className="pd-meta-item">
                <div className="pd-meta-label">Restaurant</div>
                <div className="pd-meta-value">📍 {item.location}</div>
              </div>
              <div className="pd-meta-item">
                <div className="pd-meta-label">Category</div>
                <div className="pd-meta-value">🍴 {item.category}</div>
              </div>
              <div className="pd-meta-item">
                <div className="pd-meta-label">Delivery Time</div>
                <div className="pd-meta-value">⏱ {item.time}</div>
              </div>
              <div className="pd-meta-item">
                <div className="pd-meta-label">Rating</div>
                <div className="pd-meta-value">⭐ 4.{(item.id % 5) + 1}/5</div>
              </div>
            </div>

            <div className="pd-actions">
              <button className="pd-btn-back" onClick={() => router.back()}>← Back</button>
              <button className="pd-btn-order" onClick={() =>
                router.push(`/order?productName=${encodeURIComponent(item.category || item.name)}&price=${encodeURIComponent(item.rating)}&category=${encodeURIComponent(item.category)}&image=${encodeURIComponent(item.img)}&location=${encodeURIComponent(item.location)}`)
              }>Order Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodproductDetails;
