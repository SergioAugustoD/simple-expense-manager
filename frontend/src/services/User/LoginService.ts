import { ICreateUser } from "../../interfaces"
import { ILogin } from "../../interfaces/User/ILogin"
import { Api } from "../../providers"

const login = (data: ILogin) => Api.post<ICreateUser>('/user/login', data)

export const LoginService = {
  login,
}