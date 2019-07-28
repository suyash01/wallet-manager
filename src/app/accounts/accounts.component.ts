import { Component, OnInit, Input } from "@angular/core";
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

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  addAccount(): void {
    this.dialog.open(AddAccountComponent);
  }
}
