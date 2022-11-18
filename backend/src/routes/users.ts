import { Router } from "express";
import { userController } from "../controllers/users";

const userRouter = Router();
userRouter.post("/", userController.insertUser);
userRouter.post("/login", userController.userLogin);
userRouter.post("/logout", userController.logout);
userRouter.post("/updateuser/", userController.updateUser);
userRouter.post("/checktoken", userController.checkToken);
userRouter.get("/name-user/:id_user", userController.getName);
userRouter.get("/infouser/:id_user", userController.getInfo);

export {
  userRouter
};