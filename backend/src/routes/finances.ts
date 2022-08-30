import { Router } from "express";
import { financeController } from '../controllers/finances';

const financeRouter = Router();
financeRouter.post('/', financeController.insertFinance);
financeRouter.get('/:id_user', financeController.listFinances)
financeRouter.delete('/:id', financeController.deleteFinance)
financeRouter.put('/:id', financeController.updateFinance)
export {
  financeRouter
};