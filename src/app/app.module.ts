import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { AppMaterialModule } from "./app-material.module";
import { AccountsComponent } from "./accounts/accounts.component";
import { AddAccountComponent } from "./accounts/add-account/add-account.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./services/auth.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { AddTransactionComponent } from "./transactions/add-transaction/add-transaction.component";
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AddAccountComponent,
    AuthComponent,
    DashboardComponent,
    TransactionsComponent,
    AddTransactionComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    FlexLayoutModule
  ],
  providers: [AuthService],
  entryComponents: [AddAccountComponent, AddTransactionComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
