import { Request, Response } from "express";
import { Finance, financeModel } from "../models/finances";
import { badRequest, internalServerError, notFound, validateNumber, ok } from "../services/util";

const insertFinance = (req: Request, res: Response) => {
  {
    const finance = req.body;

    if (!finance.category)
      return badRequest(res, "Informe a categoria!");
    if (!validateNumber(finance.amount))
      return badRequest(res, "Informe o valor");
    if (!finance.type)
      return badRequest(res, "Informe o tipo");
  }
  const finance = req.body as Finance;
  financeModel.insertFinance(finance)
    .then(finance => {
      res.json({
        finance
      });
    })
    .catch(err => internalServerError(res, err));
};

const updateFinance = (req: Request, res: Response) => {
  const finance = req.body as Finance;
  {
    if (!validateNumber(finance.id))
      return badRequest(res, "id inválido");
  }

  financeModel.updateFinance(finance)
    .then(finance => {
      res.json({
        finance
      });
    })
    .catch(err => internalServerError(res, err));
};

const listFinances = (req: Request, res: Response) => {
  const id_user = parseInt(req.params.id_user);
  {
    if (!validateNumber(id_user))
      return badRequest(res, "id inválido");
  }

  financeModel.listFinances(id_user)
    .then((finance) => {
      if (finance)
        return res.json(finance);
      else
        return notFound(res);
    })
    .catch(err => internalServerError(res, err));
};

const deleteFinance = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id))
      return badRequest(res, "id inválido");
  }

  financeModel.deleteFinance(id)
    .then((finance) => {
      return { ok: ok(res), finance: finance };
    })
    .catch(err => internalServerError(res, err));
};
export const financeController = {
  insertFinance,
  listFinances,
  deleteFinance,
  updateFinance
};