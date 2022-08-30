import { Router } from "express";
import { userController } from "../controllers/users";

const userRouter = Router();
userRouter.post('/', userController.insertUser)
userRouter.post('/login', userController.userLogin)
userRouter.put('/:id', userController.updateUser)

export {
  userRouter
};