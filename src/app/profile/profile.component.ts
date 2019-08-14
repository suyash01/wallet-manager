import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private afa: AngularFireAuth) {
    this.user = this.afa.auth.currentUser;
  }

  ngOnInit() {}
}
