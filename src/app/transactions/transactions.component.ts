import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { Transaction } from "../interfaces/transaction";
import { DataService } from "../services/data.service";
import { Account } from "../interfaces/account";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  private selectedAccount: string;
  private transactions: Transaction[];
  filteredTransaction: Transaction[];
  accounts: Account[];

  constructor(private data: DataService) {
    this.data.getAccounts.subscribe(data => {
      this.accounts = data;
    });
    this.data.getTransactions.subscribe(data => {
      this.transactions = data;
      this.transactions.forEach(transaction => {
        const account: Account = this.accounts.find(account => account.id === transaction.account);
        transaction.date = moment(transaction.date).format("MM/DD/YYYY");
        transaction.accountName = account ? account.name : "NA";
      });
      this.filterTransactions();
    });
    this.data.getSelectedAccount.subscribe(data => {
      this.selectedAccount = data;
      this.filterTransactions();
    });
  }

  ngOnInit() {}

  private filterTransactions(): void {
    if (this.selectedAccount)
      this.filteredTransaction = this.transactions.filter(transaction => transaction.account === this.selectedAccount);
    else this.filteredTransaction = this.transactions;
  }
}
