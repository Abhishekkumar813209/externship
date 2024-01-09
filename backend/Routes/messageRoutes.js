import express from "express"

import { allMessages,sendMessage } from "../Controllers/messageController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/message/:chatId").get(protect, allMessages);
router.route("/message").post(protect, sendMessage);

export default router;