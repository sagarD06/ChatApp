import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middleware/isUserAuthenticated.js";

const router = Router();

router.get("/",isUserAuthenticated, getUsers)

export default router;