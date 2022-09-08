import { User } from "../../types/User";

export interface ICreateUser {
  name: string;
  email: string;
  login: string;
  password: string;
  token?: string;
  user?: User;
}