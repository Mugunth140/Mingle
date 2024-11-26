import express from "express"
import { protectRoute } from "../middleware/protectRoute.middleware.js"
import { UserSidebar , SendUserMessage, FetchUserMessage} from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users", protectRoute, UserSidebar)
router.get("/:id", protectRoute, FetchUserMessage)
router.get("/send/:id", protectRoute, SendUserMessage)

 export default router