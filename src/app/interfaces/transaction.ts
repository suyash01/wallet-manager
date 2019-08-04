export interface Transaction {
  id?: string;
  title: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  date: string;
  account: string;
  user: String;
}
