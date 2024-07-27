import express from "express";
import {
  deleteReceivedInvitation,
  deleteSentInvitation,
  getReceiveInvitation,
  getSentInvitation,
  sendInvitation,
} from "../controllers/invitationController.js";

const router = express.Router();

router.post("/sendInvitation", sendInvitation);
router.get("/getSentInvitation/:id", getSentInvitation);
router.get("/getReceiveInvitation/:id", getReceiveInvitation);
router.delete("/deleteSentInvitation/:id", deleteSentInvitation);
router.delete("/deleteReceivedInvitation/:id", deleteReceivedInvitation);



export default router;
