import { useCallback } from "react";
import { ICreateUser } from "../../interfaces";
import { IUpdateUser } from "../../interfaces/User/IUpdateUser";
import { UserService } from "../../services/User/UserService";


export const useUser = () => {

  const createUser = useCallback(async (dataUser: ICreateUser) => {
    const { data } = await UserService.createUser(dataUser);
    return data;
  }, []);

  const updateUser = useCallback(async (dataUser: IUpdateUser) => {
    const { data } = await UserService.updateUser(dataUser);
    return data;
  }, []);

  return {
    createUser,
    updateUser
  };
};
