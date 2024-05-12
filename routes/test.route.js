import express from "express";
import {
  adminRequired,
  loggedInRequired,
} from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-loggedin", verifyToken, loggedInRequired);
router.get("/should-be-admin", adminRequired);

export default router;
