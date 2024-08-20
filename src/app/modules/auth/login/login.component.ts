import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { EmailUser } from '../../../models/user-interface';
import { UserService } from '../../../services/user.service';
import * as FromUser from '../../../store/user/user.action'
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectAuth } from 'src/app/store/auth/auth.selector';
import { logOut, loginFail, loginStart, loginSuccess } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  togglePassword  = false;
  auth$ = this.store.select(selectAuth);
  userId : string | null = null;
  error :  string | undefined  = undefined;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router,
    private store: Store<AppState>,
    private snackbar: MatSnackBar,
    ){
    this.loginForm = this._fb.group({
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]]  
    })
  }
  
  ngOnInit(): void {
    this.store.dispatch(logOut())
    const isLoggedIn = this._authService.isLoggedIn()

    if(isLoggedIn){
      this.router.navigate(['/dashboard/home'])
    }
   return;
  }

async login(){

    const email : string = this.loginForm.get('email')?.value;
    const password : string = this.loginForm.get('password')?.value;
    if (!this.loginForm.valid) {
      this.store.dispatch(loginFail({error: "Please fill all input fields!"}));
      return
      }
    this.store.dispatch(loginStart({email , password}));
  }

  onTogglePassword(){
    this.togglePassword = !this.togglePassword;
  }
  
  
}
    
