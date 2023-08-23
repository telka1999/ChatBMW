import express from "express";
import {
  createMessage,
  deleteMessages,
  getMessages,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/:chatId", getMessages);
router.route("/").post(createMessage).delete(deleteMessages);

export default router;
