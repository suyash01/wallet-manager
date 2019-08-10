import { Component, OnInit, Inject, ɵConsole } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Transaction } from "src/app/interfaces/transaction";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import * as moment from "moment";
import { Account } from "src/app/interfaces/account";

@Component({
  selector: "app-add-transaction",
  templateUrl: "./add-transaction.component.html",
  styleUrls: ["./add-transaction.component.scss"]
})
export class AddTransactionComponent implements OnInit {
  account: Account;
  transactionForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl(),
    amount: new FormControl("", [Validators.required, Validators.pattern(/^[1-9]\d{0,9}(\.\d{1,2})?|0\.\d{1,2}$/)]),
    date: new FormControl(moment(new Date()).toISOString(true), [Validators.required]),
    type: new FormControl("", [Validators.required]),
    account: new FormControl("", [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddTransactionComponent>,
    private snackbar: MatSnackBar,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data["selectedAccount"]) {
      this.transactionForm.controls["account"].setValue(this.data["selectedAccount"]);
      this.account = this.data["accounts"].find(
        (account: Account) => account.id === this.transactionForm.value.account
      );
    }
  }

  addTransaction(): void {
    this.account = this.data["accounts"].find((account: Account) => account.id === this.transactionForm.value.account);
    const newBalance: number =
      this.transactionForm.value.type === "debit"
        ? this.account.balance - Number(this.transactionForm.value.amount)
        : this.account.balance + Number(this.transactionForm.value.amount);
    if (!this.transactionForm.valid || newBalance < 0) {
      this.snackbar.open("Incorrect details", "OK", { duration: 2000 });
      return;
    }
    console.log(this.transactionForm.value);
    this.afs.collection<Transaction>("transactions").add({
      ...this.transactionForm.value,
      user: this.afa.auth.currentUser.uid
    });
    this.afs
      .doc<Account>("accounts/" + this.transactionForm.value.account)
      .update({ balance: Number(newBalance.toFixed(2)) });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
