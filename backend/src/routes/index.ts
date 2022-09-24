import { Application, Router } from "express";
import { financeRouter } from "./finances";
import { userRouter } from "./users";


export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use("/finances", financeRouter);
  apiRouter.use("/user", userRouter);

  app.use("/api/v1", apiRouter);
};