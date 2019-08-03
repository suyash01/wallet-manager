import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Transaction } from "src/app/interfaces/transaction";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-add-transaction",
  templateUrl: "./add-transaction.component.html",
  styleUrls: ["./add-transaction.component.scss"]
})
export class AddTransactionComponent implements OnInit {
  transactionForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl(),
    amount: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    account: new FormControl("", [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddTransactionComponent>,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  addTransaction(): void {
    this.afs.collection<Transaction>("transactions").add({
      ...this.transactionForm.value,
      user: this.afa.auth.currentUser.uid
    });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
