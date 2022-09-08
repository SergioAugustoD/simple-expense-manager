import { useCallback } from "react"
import { ICreateUser } from "../interfaces"
import { CreateUserService } from "../services"


export const useCreateUser = () => {

  const createUser = useCallback(async (dataUser: ICreateUser) => {
    const { data } = await CreateUserService.createUser(dataUser);
    return data
  }, [])

  return {
    createUser
  }
}
