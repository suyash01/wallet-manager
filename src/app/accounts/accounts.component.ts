import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddAccountComponent } from "./add-account/add-account.component";
import { Account } from "../interfaces/account";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  @Input() accounts: Account[];
  accountId: string;

  constructor(private dialog: MatDialog, private data: DataService) {}

  ngOnInit() {}

  selectAccount(id: string): void {
    if (id === this.accountId) {
      this.accountId = null;
      this.data.setSelectedAccount = null;
    } else {
      this.accountId = id;
      this.data.setSelectedAccount = id;
    }
  }

  addAccount(): void {
    this.dialog.open(AddAccountComponent, {
      width: "90%"
    });
  }
}
