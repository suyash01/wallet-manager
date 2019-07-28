import { Component, OnInit } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Account } from "../interfaces/account";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  private accountsCollection: AngularFirestoreCollection<Account>;
  accounts: Observable<Account[]>;

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
    this.accountsCollection = afs.collection<Account>("accounts", ref =>
      ref.where("user", "==", afa.auth.currentUser.uid)
    );
    this.accounts = this.accountsCollection.valueChanges({ idField: "id" });
  }

  ngOnInit() {}
}
