import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { IUser } from "../../interfaces/User/IUser";
import { AuthContext } from "./AuthContext";
import { ToastNotification } from './../../components/Utils/ToastNotification/index';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const loginApi = useLogin();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if (storageData) {
        const data = await loginApi.checkAuthToken(storageData)
        if (data.user) {
          setUser(data.user)
        }
      }
    }
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signin = async (dataLogin: IUser) => {
    const data = await loginApi.login(dataLogin);

    if (data.user.login && data.user.token) {
      setUser(data.user)
      setToken(data.user.token);
      localStorage.setItem('id_user', data.user.id_user.toString());
      ToastNotification.toastSuccess(data.user.msg);
      return data.user
    }
    ToastNotification.toastError(data.user.err);
    return data.user;
  };

  const signout = async () => {
    setUser(null);
    setToken('')
    await loginApi.logout();
    ToastNotification.toastWarning('Deslogado com sucesso!');
  };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};