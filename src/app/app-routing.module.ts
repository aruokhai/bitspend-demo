import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { authGuard } from './guard/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'auth', 
    loadChildren: ()=>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  { 
    path: 'dashboard', 
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),

  },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
   // otherwise redirect to home
  { path: '', redirectTo: 'auth/login', pathMatch: "full" },
  {path:'**', component: PageNotFoundComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
