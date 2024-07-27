import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { mongoDbConnect } from "./mongoDbConnect.js";
import friendsRouter from "./routes/friendsRoutes.js";
import invitationRouter from "./routes/invitationRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

mongoDbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/friends", friendsRouter);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
