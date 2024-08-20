import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/auth/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../../store/auth/auth.reducer';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { userReducer } from '../../store/user/user.reducer';
import { UserEffects } from '../../store/user/user.effects';



const routes : Routes = [
  { 
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  }

]

@NgModule({
  declarations: [
  
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthEffects, UserEffects]),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('user', userReducer),
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
