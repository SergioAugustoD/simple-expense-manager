import { useCallback } from "react";
import { IInsertFinance } from "../interfaces/Finance/IInsertFinance";
import { IUpdateFinance } from "../interfaces/Finance/IUpdateFinance";
import { FinanceService } from "../services/Finance";

export const useFinances = () => {

  const getListFinances = useCallback(async (idUser: number) => {
    const { data } = await FinanceService.listFinance(idUser);
    return data;
  }, []);

  const updateFinance = useCallback(async (dataUpdate: IUpdateFinance) => {
    const { data } = await FinanceService.updateFinance(dataUpdate);
    return data;
  }, []);

  const insertFinance = useCallback(async (dataInsert: IInsertFinance) => {
    const { data } = await FinanceService.insertFinance(dataInsert);
    return data;
  }, []);

  return {
    getListFinances,
    updateFinance,
    insertFinance
  };
};