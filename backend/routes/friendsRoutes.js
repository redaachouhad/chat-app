import express from "express";
import {
  addFriends,
  deleteFriend,
  getFriends,
} from "../controllers/friendsController.js";

const router = express.Router();

router.post("/addFriends", addFriends);
router.get("/getFriends/:id", getFriends);
router.delete("/deleteFriend/:id", deleteFriend);
export default router;
