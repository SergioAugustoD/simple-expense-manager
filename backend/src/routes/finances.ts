import { Router } from "express";
import { financeController } from "../controllers/finances";

const financeRouter = Router();
financeRouter.post("/", financeController.insertFinance);
financeRouter.get("/:id_user", financeController.listFinances);
financeRouter.put("/:id", financeController.deleteFinance);
financeRouter.post("/:id", financeController.updateFinance);
export {
  financeRouter
};