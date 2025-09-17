// /src/controllers/userController.js
import { listUsers, addUser } from "../services/userService.js";

export async function getUsers(req, res) {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

import { registerUser } from "../services/userService.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const id = await registerUser(username, email, password);
    res.json({ id, username, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
