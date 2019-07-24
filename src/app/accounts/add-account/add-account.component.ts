import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Account } from "../accounts.component";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.scss"]
})
export class AddAccountComponent implements OnInit {
  accountTypes: string[] = ["Cash", "Bank Account", "Credit Card"];
  account: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    balance: new FormControl("", [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddAccountComponent>,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) {}

  ngOnInit() {}

  addAccount(): void {
    this.afs.collection<Account>("accounts").add({
      ...this.account.value,
      user: this.afa.auth.currentUser.uid
    });
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
