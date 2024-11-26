import express from "express"
import { login, logout, signup , updateProfile , authCheck} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.post("/signup",signup )

router.post("/login", login)

router.post("/logout", logout)

router.put("/update-profile",protectRoute, updateProfile)

router.get("/check", protectRoute, authCheck)

export default router

