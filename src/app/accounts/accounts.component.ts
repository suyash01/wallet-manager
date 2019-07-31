import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddAccountComponent } from "./add-account/add-account.component";
import { Observable } from "rxjs";
import { Account } from "../interfaces/account";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  @Input() accounts: Observable<Account[]>;
  @Output() selectedAccount: EventEmitter<string>;
  accountId: string;

  constructor(private dialog: MatDialog) {
    this.selectedAccount = new EventEmitter<string>();
  }

  ngOnInit() {}

  selectAccount(id: string): void {
    this.accountId = id;
    this.selectedAccount.emit(id);
  }

  addAccount(): void {
    this.dialog.open(AddAccountComponent);
  }
}
