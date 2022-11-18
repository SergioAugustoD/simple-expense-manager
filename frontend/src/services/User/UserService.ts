import { Api } from "../../providers";
import { IUser } from "./../../interfaces/User/IUser";

const createUser = (data: IUser) => Api.post<IUser>("/user/", data);

const updateUser = (data: IUser) => Api.post<IUser>("user/updateuser/", data);

const getInfoUser = (id_user: string) => Api.get<string>(`user/infouser/${id_user}`);

const getName = (id_user: string) => Api.get<string>(`user/name-user/${id_user}`);

export const UserService = {
  createUser,
  getName,
  updateUser,
  getInfoUser
};