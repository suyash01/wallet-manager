export interface Transaction {
  id?: string;
  title: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  account: string;
  user: String;
}
