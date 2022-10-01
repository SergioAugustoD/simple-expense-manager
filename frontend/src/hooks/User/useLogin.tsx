import { IUser } from "../../interfaces/User/IUser";
import { LoginService } from "../../services/User/LoginService";


export const useLogin = () => ({

  login: async (dataLogin: IUser) => {
    const { data } = await LoginService.login(dataLogin);
    return data;
  },
  logout: async () => {
    const { data } = await LoginService.logout();

    return data;
  },
  checkAuthToken: async (token: string) => {
    const { data } = await LoginService.checkToken(token);
    return data;
  }
});
