// /src/services/userService.js
import { getAllUsers, createUser } from "../models/userModel.js";

export async function listUsers() {
  return await getAllUsers();
}

export async function registerUser(username, email, password) {
  // Add validations here (e.g. check if email exists)
  return await createUser(username, email, password);
}
