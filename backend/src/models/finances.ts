import { dbQuery } from "../services/db";

export type Finance = {
  id?: number;
  amount: number;
  description: string;
  type: string;
  id_user?: number;
  login: string;
}

const insertFinance = async (finance: Finance) => {
  try {
    const data = await dbQuery(`INSERT INTO finance (amount,description,type,id_user) 
      VALUES(?,?,?,?)`, [finance.amount, finance.description, finance.type, finance.id_user]);
    return { msg: "Criado com sucesso!", data: data };
  } catch (error: any) {
    return { err: error.message };
  }
};

const updateFinance = async (finance: Finance) => {
  try {
    if (finance.amount)
      await dbQuery("UPDATE finance SET amount = ? WHERE ID = ? ", [finance.amount, finance.id]);
    if (finance.description)
      await dbQuery("UPDATE finance SET description = ? WHERE ID = ? ", [finance.description, finance.id]);
    if (finance.type)
      await dbQuery("UPDATE finance SET type = ? WHERE ID = ? ", [finance.type, finance.id]);

    const retorno = await dbQuery("SELECT * FROM finance where id = ? ", [finance.id]);
    return { msg: "Atualizado com sucesso !", data: retorno[0] };
  } catch (error: any) {
    return { err: error.message };
  }



};

const listFinances = async (id_user: number) => {
  const retorno = await dbQuery("SELECT * FROM FINANCE WHERE id_user = ?", [id_user]);
  const amountIn = await dbQuery("SELECT ifnull(SUM(amount),0) as amountin FROM FINANCE WHERE id_user = ? AND Type = 'E'", [id_user]);
  const amountOut = await dbQuery("SELECT ifnull(SUM(amount),0) as amountout FROM FINANCE WHERE id_user = ? AND Type = 'S'", [id_user]);

  return { data: retorno as Finance[], amountIn: amountIn[0].amountin, amountOut: amountOut[0].amountout };

};

const deleteFinance = async (id: number) => {
  try {
    await dbQuery("DELETE FROM FINANCE WHERE id = ?", [id]);
    return { msg: "Registro deletado com sucesso !" };
  } catch (error: any) {
    return { err: error.message };
  }

};

export const financeModel = {
  insertFinance,
  listFinances,
  deleteFinance,
  updateFinance
};