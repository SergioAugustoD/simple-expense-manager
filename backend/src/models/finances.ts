import { dbQuery } from "../services/db";

export type Finance = {
  id?: number;
  category: string;
  amount: number;
  description: string;
  type: string;
  id_user?: number;
  login: string;
}

const insertFinance = async (finance: Finance) => {
  try {
    const data = await dbQuery(`INSERT INTO finance (category,amount,description,type,id_user) 
      VALUES(?,?,?,?,?)`, [finance.category, finance.amount, finance.description, finance.type, finance.id_user])
    console.log(data)
    return { msg: 'Criado com sucesso!' };
  } catch (error: any) {
    return { err: error.message }
  }
}

const updateFinance = async (finance: Finance) => {
  try {
    if (finance.category)
      await dbQuery(`UPDATE finance SET category = ? WHERE ID = ? `, [finance.category, finance.id])
    if (finance.amount)
      await dbQuery(`UPDATE finance SET amount = ? WHERE ID = ? `, [finance.amount, finance.id])
    if (finance.description)
      await dbQuery(`UPDATE finance SET description = ? WHERE ID = ? `, [finance.description, finance.id])
    if (finance.type)
      await dbQuery(`UPDATE finance SET type = ? WHERE ID = ? `, [finance.type, finance.id])

    let retorno = await dbQuery(`SELECT * FROM finance where id = ? `, [finance.id]);
    return { msg: 'Atualizado com sucesso !', data: retorno[0] }
  } catch (error: any) {
    return { err: error.message }
  }



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