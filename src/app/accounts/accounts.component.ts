import { Component, OnInit } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material";
import { AddAccountComponent } from "./add-account/add-account.component";
import { AngularFireAuth } from "@angular/fire/auth";

export interface Account {
  name: string;
  balance: number;
}

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  private accountsCollection: AngularFirestoreCollection<Account>;
  accounts: Observable<Account[]>;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.accountsCollection = afs.collection<Account>("accounts", ref =>
      ref.where("user", "==", afa.auth.currentUser.uid)
    );
    this.accounts = this.accountsCollection.valueChanges();
  }

  ngOnInit() {}

  addAccount(): void {
    this.dialog.open(AddAccountComponent);
  }
}
