import { Component, OnInit, Input } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Transaction } from "../interfaces/transaction";
import { Observable } from "rxjs";
import { Account } from "../interfaces/account";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  @Input() selectedAccount: string;
  private transactionsCollection: AngularFirestoreCollection<Transaction>;
  transactions: Observable<Transaction[]>;

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
    this.transactionsCollection = afs.collection<Transaction>(
      "transactions",
      ref => ref.where("user", "==", afa.auth.currentUser.uid)
    );
    this.transactions = this.transactionsCollection.valueChanges({
      idField: "id"
    });
  }

  ngOnInit() {}
}
