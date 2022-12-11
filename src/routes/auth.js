import express from "express"
import { loginController, refreshController, registerController, userController } from "../controllers";
import { admin, auth } from "../middlewares";

var route = express.Router();

route.post("/register",[auth, admin], registerController.register);
route.post("/login", loginController.login);
route.get("/user",[auth, admin], userController.user);
route.post("/refresh",[auth, admin], refreshController.refresh);
route.post("/logout",[auth, admin], loginController.logout);

export default route