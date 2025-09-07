import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token-interceptor.service';

import { PrescriptionListComponent } from './prescriptions/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescriptions/prescription-form/prescription-form.component';
import { ReportComponent } from './reports/report/report.component';
import { RxInteractionsComponent } from './rx/rx-interactions/rx-interactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrescriptionListComponent,
    PrescriptionFormComponent,
    ReportComponent,
    RxInteractionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
