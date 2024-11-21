import { Router } from "express";
import {
  signInUser,
  signOutUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/signout", signOutUser);

export default router;
