import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat,fetchChat,fetchGroups,createGroupChat,groupExit } from "../Controllers/chatController.js";

const router = express.Router();

router.route("/chats").post(protect,accessChat);
router.route("/chats").get(protect,fetchChat);
router.route("/createGroup").post(protect,createGroupChat);
router.route("/fetchGroups").get(protect,fetchGroups);
router.route("/groupexit").put(protect,groupExit);

export default router;