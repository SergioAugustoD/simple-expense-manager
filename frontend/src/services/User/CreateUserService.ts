import { ICreateUser } from "../../interfaces"
import { Api } from "../../providers"

const createUser = (data: ICreateUser) => Api.post<ICreateUser>('/user/', data)

export const CreateUserService = {
  createUser,
}