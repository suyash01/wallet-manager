import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Account } from "src/app/interfaces/account";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.scss"]
})
export class AddAccountComponent implements OnInit {
  accountTypes: string[][] = [
    ["Cash", "cash"],
    ["Bank Account", "bank-account"],
    ["Credit Card", "credit-card"]
  ];
  accountForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    balance: new FormControl("", [
      Validators.required,
      Validators.pattern(/^([1-9]\d*)|0(\.\d{1,2})?$/)
    ])
  });

  constructor(
    private dialogRef: MatDialogRef<AddAccountComponent>,
    private snackbar: MatSnackBar,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) {}

  ngOnInit() {}

  addAccount(): void {
    if (!this.accountForm.valid) {
      this.snackbar.open("Incorrect details", "OK", { duration: 2000 });
      return;
    }
    this.afs.collection<Account>("accounts").add({
      ...this.accountForm.value,
      user: this.afa.auth.currentUser.uid
    });
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
