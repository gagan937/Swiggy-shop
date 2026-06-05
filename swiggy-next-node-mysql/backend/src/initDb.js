import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "swiggy_next_db";
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true,
});

await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
await connection.query(`USE \`${dbName}\``);
await connection.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('food','shop') NOT NULL DEFAULT 'food',
    slug VARCHAR(120) NOT NULL,
    name VARCHAR(160) NOT NULL,
    price VARCHAR(40),
    category VARCHAR(160),
    location VARCHAR(160),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_products_slug (slug)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    product_name VARCHAR(160) NOT NULL,
    price VARCHAR(60) NOT NULL,
    category VARCHAR(160),
    image VARCHAR(255),
    customer_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    delivery_time VARCHAR(60) NOT NULL DEFAULT '30-45 minutes',
    distance_km DECIMAL(8,2) NOT NULL DEFAULT 0,
    vendor_location VARCHAR(160),
    delivery_city VARCHAR(120),
    status VARCHAR(40) NOT NULL DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_orders_user_id (user_id),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  );
`);

const safeAlter = async (sql) => {
  try { await connection.query(sql); } catch (err) { if (err.code !== "ER_DUP_FIELDNAME") throw err; }
};

await safeAlter("ALTER TABLE orders ADD COLUMN distance_km DECIMAL(8,2) NOT NULL DEFAULT 0 AFTER delivery_time");
await safeAlter("ALTER TABLE orders ADD COLUMN vendor_location VARCHAR(160) AFTER distance_km");
await safeAlter("ALTER TABLE orders ADD COLUMN delivery_city VARCHAR(120) AFTER vendor_location");

await connection.end();
console.log(`Database ready: ${dbName}`);
