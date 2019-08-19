import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddTransactionComponent } from "../transactions/add-transaction/add-transaction.component";
import { DataService } from "../services/data.service";
import { Account } from "../interfaces/account";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  selectedAccount: string;
  accounts: Account[];

  constructor(private dialog: MatDialog, private data: DataService) {
    this.data.getAccounts.subscribe(data => {
      this.accounts = data;
    });
    this.data.getSelectedAccount.subscribe(data => {
      this.selectedAccount = data;
    });
  }

  ngOnInit() {}

  addTransaction(): void {
    this.dialog.open(AddTransactionComponent, {
      width: "90%",
      data: { selectedAccount: this.selectedAccount, accounts: this.accounts }
    });
  }
}
