import { IUser } from "../../interfaces/User/IUser"
import { Api } from "../../providers"

const login = (data: IUser) => Api.post<IUser>('/user/login', data)
const logout = () => Api.post('/user/logout');
const checkToken = (token: string) => Api.post('user/checktoken', { token });

export const LoginService = {
  login,
  logout,
  checkToken
}