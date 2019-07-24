import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
