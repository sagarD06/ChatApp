import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";

const router = Router();

router.post("/send/:id",isUserAuthenticated,sendMessage)
router.get("/:id",isUserAuthenticated,getMessages)

export default router;
