import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { DataService } from "../services/data.service";
import { Transaction } from "../interfaces/transaction";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"]
})
export class StatsComponent implements OnInit {
  private transactions: Transaction[];
  weeklyExp: number;
  monthlyExp: number;
  weeklyTxn: number;
  monthlyTxn: number;

  constructor(private data: DataService) {
    this.data.getTransactions.subscribe(data => {
      this.transactions = data;
      this.calculateExpenditure();
    });
  }

  ngOnInit() {}

  calculateExpenditure() {
    this.weeklyExp = 0;
    this.monthlyExp = 0;
    this.weeklyTxn = 0;
    this.monthlyTxn = 0;
    const weekStart: string = moment()
      .startOf("week")
      .toISOString();
    const monthStart: string = moment()
      .startOf("month")
      .toISOString();
    this.transactions.forEach((transaction, i) => {
      if (transaction.date >= weekStart) {
        this.weeklyTxn++;
        this.weeklyExp += transaction.amount;
      }
      if (transaction.date >= monthStart) {
        this.monthlyTxn++;
        this.monthlyExp += transaction.amount;
      }
    });
  }
}
