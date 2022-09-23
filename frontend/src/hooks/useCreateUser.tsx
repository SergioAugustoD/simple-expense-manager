import { useCallback } from "react"
import { ICreateUser } from "../interfaces"
import { CreateUserService } from "../services/User/CreateUserService"


export const useCreateUser = () => {

  const createUser = useCallback(async (dataUser: ICreateUser) => {
    const { data } = await CreateUserService.createUser(dataUser);
    return data
  }, [])

  return {
    createUser
  }
}
