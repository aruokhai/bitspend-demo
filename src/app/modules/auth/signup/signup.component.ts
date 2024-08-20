import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { EmailUser } from '../../../models/user-interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { logOut, signUpStart, signupFail } from 'src/app/store/auth/auth.actions';
import { selectAuth } from 'src/app/store/auth/auth.selector';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  auth$ = this.store.select(selectAuth);
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  togglePassword  = false;
  loading  = false;
  error : string | undefined = undefined;

  constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>,
    ){
    this.signupForm = this._fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        country: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[!@#$%^&*+=?_.,/'|()])[a-zA-Z0-9!@#$%^&*].+$/gi)]],
        // eslint-disable-next-line no-useless-escape
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{3}?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/)]]
    })
  }

  ngOnInit(): void {
    this.store.dispatch(logOut())
  }

  async signup(){
    const firstName = this.signupForm.get('firstname')?.value;
    const lastName = this.signupForm.get('lastname')?.value;
    const email = this.signupForm.get('email')?.value;
    const country = this.signupForm.get('country')?.value;
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    const phoneNumber = this.signupForm.get('phoneNumber')?.value;
    console.log({confirmPassword: confirmPassword})
    if (!this.signupForm.valid) {
      this.store.dispatch(signupFail({error: "Please fill all input fields!"}));
      return
    }
    if (password !== confirmPassword) {
      this.store.dispatch(signupFail({error: "Passwords do not match!"}));
      return
    }
    const userData: EmailUser = {
      type: "email",
      role: "user",
      firstName,
      lastName,
      email,
      country,
      phoneNumber,
      userId: '',
      emailVerified: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),           
    }
    this.store.dispatch(signUpStart({email, password, userData}));
  }

  onTogglePassword(){
    this.togglePassword = !this.togglePassword;
  }

}
