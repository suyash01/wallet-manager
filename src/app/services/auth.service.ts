import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

interface Credentials {
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  createUser(credentials: Credentials): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: credentials.name
        });
        this.snackbar.open("Registered Successfully :)", "OK", {
          duration: 2000
        });
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        if (err["code"] === "auth/weak-password")
          this.snackbar.open("Password should be 6 characters", "OK", {
            duration: 2000
          });
        else if (err["code"] === "auth/email-already-in-use")
          this.snackbar.open("Email already in use", "OK", {
            duration: 2000
          });
      });
  }

  loginUser(credentials: Credentials): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        this.snackbar.open("Logged In...", "OK", {
          duration: 2000
        });
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        console.log(err);
        if (
          err["code"] === "auth/wrong-password" ||
          err["code"] === "auth/user-not-found"
        )
          this.snackbar.open("Invalid Credentials...", "OK", {
            duration: 2000
          });
      });
  }

  logoutUser(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
    this.snackbar.open("Logged out successfully", "OK", {
      duration: 2000
    });
  }
}
