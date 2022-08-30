import { dbQuery } from "../services/db";

export type Finance = {
  id: number;
  category: string;
  amount: number;
  description: string;
  type: string;
  id_user: number;
}

const insertFinance = async (finance: Finance) => {
  await dbQuery(`INSERT INTO finance (category,amount,description,type,id_user) 
  VALUES(?,?,?,?,?)`, [finance.category, finance.amount, finance.description, finance.type, finance.id_user])
  let retorno = await dbQuery(`SELECT * FROM finance order by id desc`);
  return retorno[0];
}

const updateFinance = async (finance: Finance) => {

  if (finance.category)
    await dbQuery(`UPDATE finance SET category = ? WHERE ID = ? `, [finance.category, finance.id])
  if (finance.amount)
    await dbQuery(`UPDATE finance amount = ? WHERE ID = ? `, [finance.amount, finance.id])
  if (finance.description)
    await dbQuery(`UPDATE finance SET description = ? WHERE ID = ? `, [finance.description, finance.id])
  if (finance.type)
    await dbQuery(`UPDATE finance SET type = ? WHERE ID = ? `, [finance.type, finance.id])

  let retorno = await dbQuery(`SELECT * FROM finance where id = ? `, [finance.id]);
  return retorno[0];
}

const listFinances = async (id_user: number) => {
  const retorno = await dbQuery(`SELECT * FROM FINANCE WHERE id_user = ?`, [id_user])
  return retorno as Finance[];
}

const deleteFinance = async (id: number) => {
  await dbQuery(`DELETE FROM FINANCE WHERE id = ?`, [id])
}
export const financeModel = {
  insertFinance,
  listFinances,
  deleteFinance,
  updateFinance
}