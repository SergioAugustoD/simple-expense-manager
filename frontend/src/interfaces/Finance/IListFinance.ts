export interface IFinance {
  finances: IListFinance;
}

export interface IListFinance {
  id?: number;
  amount?: number;
  description?: string;
  type?: string;
  id_user?: number;
}
