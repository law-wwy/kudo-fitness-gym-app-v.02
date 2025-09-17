// /src/routes/userRoutes.js
import express from "express";
import { getUsers, signup } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
export default router;
