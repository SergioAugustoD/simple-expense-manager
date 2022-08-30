import { Response } from 'express';
const bcrypt = require('bcrypt');

export const badRequest = (res: Response, err: string) => {
  res.status(400).json({
    err
  })

}

export const notFound = (res: Response) => res.sendStatus(404);

export const ok = (res: Response) => res.sendStatus(200);

export const internalServerError = (res: Response, err: Error) => {
  res.status(500).json({
    err: err.message
  })
}

export const generatePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return await hashed;
}

// compara a senha do usuário se está correta
export const checkPassword = async (password: string, hashedPassword: string) => {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword
}

export const validateNumber = (num: any) => parseFloat(num) > 0;