import { IInsertFinance } from '../../interfaces/Finance/IInsertFinance';
import { IUpdateFinance } from '../../interfaces/Finance/IUpdateFinance';
import { Api } from '../../providers';

const listFinance = (idUser: number) => Api.get(`/finances/${idUser}`);

const updateFinance = (dataUpdate: IUpdateFinance) => Api.post(`/finances/${dataUpdate.id}`, dataUpdate)

const insertFinance = (dataInsert: IInsertFinance) => Api.post(`/finances/`, dataInsert)

export const FinanceService = {
  listFinance,
  updateFinance,
  insertFinance
}