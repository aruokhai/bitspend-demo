import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions'
import * as UserActions from './../user/user.action'
import { AuthService } from 'src/app/services/auth.service';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@firebase/auth';

@Injectable()

export class AuthEffects {

     constructor(
        private userService : UserService,
        private _authService : AuthService,
        private store: Store<AppState>,
        private router: Router,
        private actions$ : Actions,
        private snackbar : MatSnackBar,
        private zone: NgZone,
    ){}

    handleFirebaseError(errorMessage: string): string {
        if (errorMessage.indexOf('auth/wrong-password') > 0)return 'Invalid Password or Email';
        if (errorMessage.indexOf('auth/user-not-found') > 0)return 'Email Not Found';
        if (errorMessage.indexOf('auth/email-already-in-use') > 0)return 'This email is already in use';
        return 'Try again Later'
    }

    login$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap((action)=>{
                return from(this._authService.loginUser(action.email, action.password)).pipe(
                        map((user: {accessToken: string} & User)=>{
                            localStorage.setItem('tkn', user.accessToken);
                            this.store.dispatch(UserActions.FetchUserData({ userId: user.uid }))
                            this.router.navigate(['/dashboard/home'])
                            return (AuthActions.loginSuccess({ authToken: user.accessToken }));
                        }),
                        catchError((error) => {
                            let errorMsg = '';
                            if ( error.message.indexOf('Firebase') == 0 ) {
                                errorMsg = this.handleFirebaseError(error.message)
                            } 
                            return of(AuthActions.loginFail({ error: errorMsg }))
                        })
                )
            }),
        )
    });

    google$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(AuthActions.googleStart),
            switchMap(()=>{
                return from(this._authService.googleAuth()).pipe(
                        switchMap((user) => {
                            localStorage.setItem('tkn', user.accessToken);
                            return from(this.userService.getUserByUserId(user.uid)).
                            pipe(
                                switchMap((userData) =>  !userData ?  from(this.userService.createUser({ 
                                userId: user.uid,
                                createdAt: Date.now(),
                                updatedAt: Date.now(),
                                email: user.email || "",
                                type: 'google',
                                role: 'user',
                                firstName: user.displayName?.split(" ")[0] || undefined,
                                lastName: user.displayName?.split(" ")[1] || undefined,
                              })) : of(true)),
                              map((res) => {
                                    this.store.dispatch(UserActions.FetchUserData({ userId: user.uid }));
                                    this.router.navigate(['/dashboard/home'])
                                    return (AuthActions.googleSuccess({ authToken: user.accessToken }));
                              }
                            )
                        )
                            }))
            }),
            catchError(error => {
                let errorMsg = '';
                if ( error.message.indexOf('Firebase') == 0 ) {
                    errorMsg = this.handleFirebaseError(error.message)
                } 
                return of(AuthActions.googleFail({ error: errorMsg }))
            })
        )
    });


    
    signup$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(AuthActions.signUpStart),
            switchMap((action)=>{
                return from(this._authService.signupUser(action.email, action.password)).pipe(
                        switchMap((res)=>{
                            const userId = res.userId
                            const accessToken = res.accessToken
                            const user = {...action.userData, userId}
                            localStorage.setItem('tkn', accessToken)
                            localStorage.setItem('tkn', accessToken)
                            return from(this.userService.createUser( user )).pipe(
                                switchMap(() => {
                                    this.router.navigate(['/auth/login'])
                                    return of(AuthActions.signupSuccess());
                                }),
                                catchError(error => {
                                    let errorMsg = '';
                                    if ( error.message.indexOf('FirebaseError') > 0 ) {
                                        errorMsg = this.handleFirebaseError(error.message)
                                    } 
                                    return of(AuthActions.signupFail({ error: errorMsg }))
                                })
                            )
                        })
                        
                )
            })
        )
    });
}