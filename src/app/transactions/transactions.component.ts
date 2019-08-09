import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "../interfaces/transaction";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  @Input() selectedAccount: string;
  transactions: Transaction[];

  constructor(private data: DataService) {
    this.data.getTransactions.subscribe(data => {
      this.transactions = data;
    });
  }

  ngOnInit() {}
}
