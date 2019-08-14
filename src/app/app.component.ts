import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatDialog } from "@angular/material";
import { ProfileComponent } from "./profile/profile.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private authService: AuthService, public afa: AngularFireAuth, private dialog: MatDialog) {}

  logoutUser(): void {
    this.authService.logoutUser();
  }

  openProfile(): void {
    this.dialog.open(ProfileComponent, { width: "90%" });
  }
}
