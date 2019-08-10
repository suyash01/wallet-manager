import { Component, OnInit, Input } from "@angular/core";
import { combineLatest } from "rxjs";
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
  @Input() selectedAccount: string;
  transactions: Transaction[];
  accounts: Account[];

  constructor(private data: DataService) {
    combineLatest(this.data.getAccounts, this.data.getTransactions).subscribe(([accountsData, transactionData]) => {
      this.accounts = accountsData;
      this.transactions = transactionData;
      this.transactions.forEach(transaction => {
        transaction.date = moment(transaction.date).format("MM/DD/YYYY");
        transaction.account = this.accounts.find(account => account.id === transaction.account).name;
      });
    });
  }

  ngOnInit() {}
}
