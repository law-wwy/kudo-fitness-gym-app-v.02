// /src/models/userModel.js
import pool from "../config/db.js";

export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function createUser(username, email, password) {
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return result.insertId;
}
