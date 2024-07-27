import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/sendMessage", sendMessage);
router.post("/getAllMessages", getAllMessages);

export default router;
