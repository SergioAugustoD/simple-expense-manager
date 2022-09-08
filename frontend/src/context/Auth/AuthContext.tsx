import { createContext } from 'react';
import { User } from '../../types/User';
import { IUser } from './../../interfaces/User/IUser';

export type AuthContextType = {
  user: User | null;
  signin: (dataLogin: IUser) => Promise<any>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null);