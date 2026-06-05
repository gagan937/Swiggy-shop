import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });

const cleanUser = (user) => ({ id: user.id, name: user.name, email: user.email });

export const register = async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "").trim();

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
  if (existing.length) return res.status(409).json({ message: "User already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  const user = { id: result.insertId, name, email };
  return res.status(201).json({ message: "Registration successful", user: cleanUser(user), token: signToken(user) });
};

export const login = async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "").trim();

  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length) return res.status(404).json({ message: "User not found. Please register first." });

  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Incorrect password" });

  return res.json({ message: "Login successful", user: cleanUser(user), token: signToken(user) });
};
