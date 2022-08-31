import { useCallback } from "react"
import { ICreateUser } from "../interfaces"
import { CreateUserService } from "../services"


export const useCreateUser = () => {

  const createUser = useCallback(async (dataUser: ICreateUser) => {
    const { status, data } = await CreateUserService.createUser(dataUser);

    console.log(data)

  }, [])

  return {
    createUser
  }
}
