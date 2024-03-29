import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { auth } from "firebase/app";

interface Credentials {
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private snackbar: MatSnackBar, private router: Router) {}

  createUser(credentials: Credentials): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: credentials.name
        });
        this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
          this.snackbar.open("Verify email...", "OK", {
            duration: 2000
          });
        });
        this.afAuth.auth.signOut();
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
        if (this.afAuth.auth.currentUser.emailVerified) {
          this.snackbar.open("Logged In...", "OK", {
            duration: 2000
          });
          this.router.navigate(["/dashboard"]);
        } else {
          this.afAuth.auth.signOut();
          this.snackbar.open("Email not verified...", "OK", {
            duration: 2000
          });
        }
      })
      .catch(err => {
        if (err["code"] === "auth/wrong-password" || err["code"] === "auth/user-not-found")
          this.snackbar.open("Invalid Credentials...", "OK", {
            duration: 2000
          });
      });
  }

  googleLogin(): void {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.router.navigate(["dashboard"]);
      })
      .catch(err => {
        this.snackbar.open("Login failed...", "OK", { duration: 2000 });
      });
  }

  logoutUser(): void {
    this.afAuth.auth.signOut().then(() => {
      this.snackbar.open("Logged out successfully", "OK", {
        duration: 2000
      });
    });
    this.router.navigate(["/"]);
  }
}
