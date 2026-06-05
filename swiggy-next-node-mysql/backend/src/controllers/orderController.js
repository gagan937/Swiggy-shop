import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

function getUserId(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    return decoded.id || null;
  } catch {
    return null;
  }
}

export const createOrder = async (req, res) => {
  const productName = String(req.body.productName || "").trim();
  const price = String(req.body.price || "").trim();
  const category = String(req.body.category || "").trim();
  const image = String(req.body.image || "").trim();
  const customerName = String(req.body.customerName || "").trim();
  const phone = String(req.body.phone || "").trim();
  const address = String(req.body.address || "").trim();
  const quantity = Number(req.body.quantity || 1);
  const deliveryTime = String(req.body.deliveryTime || "30-45 minutes").trim();
  const distanceKm = Number(req.body.distanceKm || 0);
  const vendorLocation = String(req.body.vendorLocation || req.body.vendor_location || "").trim();
  const deliveryCity = String(req.body.deliveryCity || req.body.delivery_city || "").trim();

  if (!productName || !price || !customerName || !phone || !address) {
    return res.status(400).json({ message: "Product, price, name, phone and address are required" });
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ message: "Phone number must be 10 digits" });
  }

  const userId = getUserId(req);
  const [result] = await pool.query(
    `INSERT INTO orders
      (user_id, product_name, price, category, image, customer_name, phone, address, quantity, delivery_time, distance_km, vendor_location, delivery_city, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, productName, price, category, image, customerName, phone, address, quantity, deliveryTime, distanceKm, vendorLocation, deliveryCity, "confirmed"]
  );

  return res.status(201).json({
    message: "Order placed successfully",
    order: {
      id: result.insertId,
      productName,
      price,
      category,
      image,
      customerName,
      phone,
      address,
      quantity,
      deliveryTime,
      distanceKm,
      vendorLocation,
      deliveryCity,
      status: "confirmed",
    },
  });
};

export const getOrders = async (_req, res) => {
  const [orders] = await pool.query("SELECT * FROM orders ORDER BY id DESC LIMIT 100");
  res.json({ orders });
};
