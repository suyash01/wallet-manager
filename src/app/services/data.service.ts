import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Account } from "../interfaces/account";
import { Transaction } from "../interfaces/transaction";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private accountsCollection: AngularFirestoreCollection<Account>;
  private transactionsCollection: AngularFirestoreCollection<Transaction>;
  private accounts: Observable<Account[]>;
  private transactions: Observable<Transaction[]>;

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
    this.accountsCollection = this.afs.collection<Account>("accounts", ref =>
      ref.where("user", "==", this.afa.auth.currentUser.uid)
    );
    this.accounts = this.accountsCollection.valueChanges({ idField: "id" });
    this.transactionsCollection = afs.collection<Transaction>("transactions", ref =>
      ref.where("user", "==", afa.auth.currentUser.uid)
    );
    this.transactions = this.transactionsCollection.valueChanges({
      idField: "id"
    });
  }

  get getAccounts() {
    return this.accounts;
  }

  get getTransactions() {
    return this.transactions;
  }
}
