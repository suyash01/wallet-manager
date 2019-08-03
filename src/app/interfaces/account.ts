export interface Account {
  id?: string;
  name: string;
  balance: number;
  type: "cash" | "bank-account" | "credit-card";
  user: string;
}
