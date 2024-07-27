import express from "express";
import { addUsers, findPeople } from "../controllers/userController.js";

const router = express.Router();

router.post("/addUsers", addUsers);
router.get("/findPeople/:id", findPeople);
export default router;
