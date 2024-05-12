import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addPost,
  deletePost,
  getPost,
  singlePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPost);
router.get("/:id", verifyToken, singlePost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
