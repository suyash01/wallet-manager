import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private authService: AuthService, public afa: AngularFireAuth) {}

  logoutUser() {
    this.authService.logoutUser();
  }
}
