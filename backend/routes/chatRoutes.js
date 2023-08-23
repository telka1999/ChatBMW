import express from "express";
import {
  createChat,
  getChats,
  deleteChat,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.get("/:userId", getChats);
router.route("/").post(createChat).delete(deleteChat);

export default router;
