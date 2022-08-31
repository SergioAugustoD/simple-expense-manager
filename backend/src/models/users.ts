import { dbQuery } from "../services/db";
import { checkPassword, generatePassword } from '../services/util';
import jwt from 'jsonwebtoken';

export type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
}

const insertUser = async (user: User) => {
  let getEmail = await dbQuery(`SELECT email from users where email = ?`, [user.email])
  if (getEmail.length > 0)
    return 'Este e-mail já existe no banco de dados!'
  else
    await dbQuery(`INSERT INTO users (name,email,login,password) 
    VALUES(?,?,?,?)`, [user.name, user.email, user.login, await generatePassword(user.password)])
  let retorno = await dbQuery(`SELECT * FROM users order by id desc`);
  return retorno[0];
}

const updateUser = async (user: User) => {
  console.log(user)
  if (user.name)
    await dbQuery(`UPDATE users SET name = ? WHERE ID = ? `, [user.name, user.id])
  if (user.login)
    await dbQuery(`UPDATE users SET login = ? WHERE ID = ? `, [user.login, user.id])
  if (user.password)
    await dbQuery(`UPDATE users SET password = ? WHERE ID = ? `, [await generatePassword(user.password), user.id])

  let retorno = await dbQuery(`SELECT * FROM users where id = ? `, [user.id]);
  return retorno[0];
}

const checkLogin = async (user: User) => {
  let login = await dbQuery(`SELECT login from users where login = ?`, [user.login]);
  let idUser = await dbQuery(`SELECT id from users where login = ? `, [user.login]);
  if (login.length > 0) {
    let password = await dbQuery(`SELECT password from users where login = ?`, [user.login])
    if (await checkPassword(user.password, password[0].password)) {
      return { msg: 'Usuário logado com sucesso!', token: jwt.sign({ id: idUser }, process.env.SECRET ?? '', { expiresIn: '8h' }) }
    }
  } else {
    return { err: 'Usuário não existe' }
  }
}
export const userModel = {
  insertUser,
  updateUser,
  checkLogin
}