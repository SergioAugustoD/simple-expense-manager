export interface IFinance {
  finances: IListFinance;
};

export interface IListFinance {
  id?: number;
  category?: string;
  amount?: number;
  description?: string;
  type?: string;
  id_user?: number;
}
