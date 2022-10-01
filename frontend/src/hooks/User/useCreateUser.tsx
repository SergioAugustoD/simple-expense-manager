import { useCallback } from "react";
import { ICreateUser } from "../../interfaces";
import { UserService } from "../../services/User/UserService";


export const useCreateUser = () => {

  const createUser = useCallback(async (dataUser: ICreateUser) => {
    const { data } = await UserService.createUser(dataUser);
    return data;
  }, []);

  return {
    createUser
  };
};
