import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  selectedTab: number = 0;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  registerForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private afa: AngularFireAuth) {
    if (this.afa.auth.currentUser) this.router.navigate(["/dashboard"]);
  }

  ngOnInit() {}

  login(event: any): void {
    this.authService.loginUser(this.loginForm.value);
    event.currentTarget.reset();
    this.loginForm.reset();
  }

  register(event: any): void {
    this.authService.createUser(this.registerForm.value);
    event.currentTarget.reset();
    this.registerForm.reset();
    this.selectedTab = 0;
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }
}
