import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromWallet from './wallet.actions';
import { WalletService } from '../../services/wallet.service';
import { from, of, pipe } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { dispatchAction } from "../../utils/effects";
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetWalletResponse } from 'src/app/interfaces/wallet-interface';
import { UserService } from 'src/app/services/user.service';
import { AppState } from '../app.reducer';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../user/user.selector';
import { FetchUserData } from '../user/user.action';

@Injectable()
export class WalletEffects {

    user$ = this.store.pipe(select(getUserData));

     constructor(
        private _walletService : WalletService,
        private _userService : UserService,
        private router : Router,
        private store : Store<AppState>,
        private actions$ : Actions,
        private snackbar : MatSnackBar,
        private zone: NgZone,

    ){}

    wallet$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromWallet.FetchWallet),
            switchMap((action)=>{
                return from(this._walletService.getWallet(action.walletId))
                .pipe(
                    map((res: GetWalletResponse)=>{
                        return (fromWallet.FetchWalletSuccess({ wallet: res }))
                    })
                )
            }),
            catchError(error => {
                console.log(error);
                this.zone.run(() =>{
                    this.snackbar.open("Error Fetching Wallet", undefined, { verticalPosition: "top", duration: 5000  })
                });
                return of(fromWallet.FetchWalletFailure({ error: 'Error retrieving wallet details' }))
            })
        )
    });

    createWallet$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromWallet.createWallet),
            switchMap((action)=>{
                return from(this._walletService.createWallet(action.email, action.phoneNumber, action.firstName, action.lastName)).pipe(
                    map((res)=>{
                        this.user$.pipe(take(10)).subscribe(async (user)=>{
                            const USERID = user?.userId as string
                            await this._userService.updateUserWalletId(USERID, res.id)
                            this.store.dispatch(FetchUserData({userId: USERID}))
                            this.router.navigate(['/dashboard/home'])
                        }) 
                            this.zone.run(() =>{
                                this.snackbar.open("Success Creating Wallet", undefined, { verticalPosition: "top", duration: 5000  })
                            });
                            return (fromWallet.createWalletSuccess({ wallet: res }));
                        })
                )
            }),
            catchError(error => {
                this.zone.run(() =>{
                    this.snackbar.open("Error Creating Wallet", undefined, { verticalPosition: "top", duration: 5000  })
                });
                return of(fromWallet.createWalletFailure({ error: 'Error creating user wallet' }));
            })
        )
    })
    
}