import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { loginFail } from './store/auth/auth.actions';
import { AppState } from './store/app.reducer';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private snackbar: MatSnackBar,
    private injector: Injector,
  ) {}

  handleError(error: Error) {
    const errorMsg = 'Error encountered';
    this.zone.run(() =>{
      this.snackbar.open(errorMsg, undefined, { verticalPosition: "top", duration: 5000  })
  });

    console.error('Error from global error handler', error);
  }


    
}