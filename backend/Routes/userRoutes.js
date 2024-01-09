import express from "express";
import { loginController,registerController,fetchAllUsers } from "../Controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const Router = express.Router();

Router.post("/login",loginController)
Router.post("/register",registerController)
Router.get("/getallUsers",protect,fetchAllUsers);

export default Router;