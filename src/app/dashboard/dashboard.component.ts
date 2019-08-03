import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddTransactionComponent } from "../transactions/add-transaction/add-transaction.component";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  selectedAccount: string = null;
  private accountsCollection: AngularFirestoreCollection<Account>;
  accounts: Account[];

  constructor(
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) {}

  ngOnInit() {
    this.accountsCollection = this.afs.collection<Account>("accounts", ref =>
      ref.where("user", "==", this.afa.auth.currentUser.uid)
    );
    this.accountsCollection.valueChanges({ idField: "id" }).subscribe(data => {
      this.accounts = data;
    });
  }

  selectAccount(id: string): void {
    this.selectedAccount = id;
  }

  addTransaction(): void {
    this.dialog.open(AddTransactionComponent, {
      width: "90%",
      data: { selectedAccount: this.selectedAccount, accounts: this.accounts }
    });
  }
}
