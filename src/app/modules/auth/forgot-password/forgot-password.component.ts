import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    error: string | null = null;
    forgotPasswordForm: FormGroup;

    constructor(
      private _fb: FormBuilder,
      private router: Router
    ){
      this.forgotPasswordForm = this._fb.group({
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    })

  }

  onSubmit(){
    const auth = getAuth()
    const email = this.forgotPasswordForm.get('email')?.value
    sendPasswordResetEmail(auth, email)
    .then((res) => {
      console.log({
        email,
        res
      })
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const err = errorHandler(errorCode)
     // this.error = err.message;
    });
    this.router.navigate(['/reset-password'])
  }

}
