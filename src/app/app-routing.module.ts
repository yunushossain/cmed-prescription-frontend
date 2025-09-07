import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PrescriptionListComponent } from './prescriptions/prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescriptions/prescription-form/prescription-form.component';
import { ReportComponent } from './reports/report/report.component';
import { RxInteractionsComponent } from './rx/rx-interactions/rx-interactions.component';

const routes: Routes = [
  // public
  { path: 'login', component: LoginComponent },

  // protected (guard applies to these paths only)
  { path: 'prescriptions', canActivate: [AuthGuard], component: PrescriptionListComponent },
  { path: 'prescriptions/create', canActivate: [AuthGuard], component: PrescriptionFormComponent },
  { path: 'prescriptions/:id/edit', canActivate: [AuthGuard], component: PrescriptionFormComponent },
  { path: 'reports/day-count', canActivate: [AuthGuard], component: ReportComponent },
  { path: 'rxnav', canActivate: [AuthGuard], component: RxInteractionsComponent },

  // default -> login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // fallback
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // useHash optional but helpful
  exports: [RouterModule]
})
export class AppRoutingModule {}
