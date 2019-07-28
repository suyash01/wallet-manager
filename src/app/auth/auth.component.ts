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
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  registerForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private afa: AngularFireAuth
  ) {
    if (afa.auth.currentUser) router.navigate(["/dashboard"]);
  }

  ngOnInit() {}

  login(): void {
    this.authService.loginUser(this.loginForm.value);
  }

  register(): void {
    this.authService.createUser(this.registerForm.value);
  }
}
