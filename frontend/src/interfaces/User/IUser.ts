import { User } from "../../types/User";

export interface IUser {
  name?: string;
  email?: string;
  login?: string;
  password?: string;
  token?: string;
  user?: User;
}