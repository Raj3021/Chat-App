import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getMessages, getUSersForSidebaar, markMessagesAsSeen, sendMessage } from "../controllers/messageController.js";


const messageRouter = express.Router();

messageRouter.get("/user", protectRoute, getUSersForSidebaar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
