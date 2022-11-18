import { dbQuery } from "../services/db";
import { checkPassword, generatePassword } from "../services/util";
import jwt from "jsonwebtoken";

export type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
  oldPassword?: string;
  newPassword?: string;
  token?: string;
}

const insertUser = async (user: User) => {
  const getLogin = await dbQuery("SELECT login from users where login = ?", [user.login]);
  if (getLogin.length > 0) {
    return { err: "Este login já existe no banco de dados!" };
  }
  const getEmail = await dbQuery("SELECT email from users where email = ?", [user.email]);
  if (getEmail.length > 0)
    return { err: "Este e-mail já existe no banco de dados!" };
  else
    await dbQuery(`INSERT INTO users (name,email,login,password) 
    VALUES(?,?,?,?)`, [user.name, user.email, user.login, await generatePassword(user.password)]);
  return { msg: "Usuário criado com sucesso!" };
};

const getInfoUser = async (id_user: number) => {
  const infoUser = await dbQuery("SELECT name,email FROM users where id = ?", [id_user]);

  return infoUser[0];
};

const updateUser = async (user: User) => {

  try {
    const password = await dbQuery("SELECT password from users where id = ?", [user.id]);

    if (user.name)
      await dbQuery("UPDATE users SET name = ? WHERE ID = ? ", [user.name, user.id]);
    if (user.email)
      await dbQuery("UPDATE users SET email = ? WHERE ID = ? ", [user.email, user.id]);
    if (user.oldPassword)
      if (await checkPassword(user.oldPassword, password[0].password))
        await dbQuery("UPDATE users SET password = ? WHERE ID = ? ", [await generatePassword(user.newPassword!), user.id]);
      else
        return { err: "Senha incorreta, verifique!" };

    return { msg: "Atualizado com sucesso!" };
  } catch (error: any) {
    console.log(error.message);
    return { err: "Erro interno, verifique com o administrador" };
  }

};

const getNameUser = async (id_user: number) => {
  try {
    const nameUser = await dbQuery("SELECT name from users where id = ? ", [id_user]);

    if (nameUser.length > 0) {
      return { nameUser: nameUser[0].name };
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const checkLogin = async (user: User) => {
  try {
    const login = await dbQuery("SELECT login from users where login = ?", [user.login]);
    const idUser = await dbQuery("SELECT id as id_user from users where login = ? ", [user.login]);

    if (login.length > 0) {
      const password = await dbQuery("SELECT password from users where login = ?", [user.login]);
      if (await checkPassword(user.password, password[0].password)) {
        return { msg: "Usuário logado com sucesso!", id_user: idUser[0].id_user, login: user.login, auth: true, token: jwt.sign({ id: idUser }, process.env.SECRET ?? "", { expiresIn: "8h" }) };
      } else {
        return { err: "Usuário ou senha incorretos! Verifique" };
      }
    } else {
      return { err: "Usuário não existe" };
    }
  } catch (error) {
    console.log(error);
    return { err: error };
  }

};

const checkAuthToken = async (token: string) => {
  if (!token) {
    return { err: "Não contem token!" };
  }
  const tokenDecoded = jwt.verify(token, process.env.SECRET!);

  if (tokenDecoded) {

    return { msg: "Usuário autorizado", auth: true, token: token };

  } else {
    return { err: "Usuário não autorizado", auth: true };
  }
};
export const userModel = {
  insertUser,
  updateUser,
  checkLogin,
  checkAuthToken,
  getNameUser,
  getInfoUser
};