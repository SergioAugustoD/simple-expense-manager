import { useCallback } from "react"
import { ILogin } from "../interfaces/User/ILogin"
import { LoginService } from "../services/User/LoginService"


export const useLogin = () => {

  const login = useCallback(async (dataLogin: ILogin) => {
    const { status, data } = await LoginService.login(dataLogin);

    console.log(data)

  }, [])

  return {
    login
  }
}
