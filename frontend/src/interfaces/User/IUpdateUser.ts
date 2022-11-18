import { User } from "../../types/User";

export interface IUpdateUser {
  name: string;
  email: string;
  id: string;
  oldPassword: string;
  newPassword: string;
  token?: string;
  user?: User;
}