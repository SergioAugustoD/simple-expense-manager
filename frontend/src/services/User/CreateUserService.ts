import { Api } from "../../providers"
import { IUser } from './../../interfaces/User/IUser';

const createUser = (data: IUser) => Api.post<IUser>('/user/', data)

export const CreateUserService = {
  createUser,
}