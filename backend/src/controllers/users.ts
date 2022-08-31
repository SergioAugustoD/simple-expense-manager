import { Request, Response } from "express"
import { User, userModel } from "../models/users";
import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/util';

const insertUser = (req: Request, res: Response) => {
  {
    const user = req.body;

    if (!user.name)
      return badRequest(res, "Informe seu nome!")
    if (!user.email)
      return badRequest(res, "Informe o e-mail")
    if (!user.login)
      return badRequest(res, "Informe o login")
    if (!user.password)
      return badRequest(res, "Informe uma senha")
  }
  const user = req.body as User
  userModel.insertUser(user)
    .then(user => {
      res.json({
        user
      })
    })
    .catch(err => internalServerError(res, err))
}

const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id))
      return badRequest(res, 'id inválido');
  }
  const user = req.body as User
  userModel.updateUser(user)
    .then(user => {
      res.json({
        user
      })
    })
    .catch(err => internalServerError(res, err))
}

const userLogin = (req: Request, res: Response) => {
  {
    const user = req.body;

    if (!user.login)
      return badRequest(res, "Informe seu login")
    if (!user.password)
      return badRequest(res, "Informe sua senha")
  }
  const user = req.body as User
  userModel.checkLogin(user)
    .then(user => {
      res.json({ user })
    })
}
export const userController = {
  insertUser,
  updateUser,
  userLogin
}