import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TransactionActions from './transaction.action'
import { WalletService } from '../../services/wallet.service';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetTransactionResponse } from 'src/app/models/transacton.interface';

@Injectable()

export class TransactionEffects {

     constructor(
        private _walletService : WalletService,
        private actions$ : Actions
    ){}

    wallet$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(TransactionActions.FetchAllTransactions),
            switchMap((action)=>{
                return from(this._walletService.allTransactions(action.walletId)).pipe(
                        map((res: GetTransactionResponse[])=>{
                            return (TransactionActions.FetchAllTransactionsSuccess({ transactions: res }));
                        })
                )
            }),
            catchError(error => of(TransactionActions.FetchAllTransactionsFailure({ error: 'Error retrieving transaction History' })))
        )
    });


    recentTransactions$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(TransactionActions.FetchRecentTransactions),
            switchMap((action)=>{
                return from(this._walletService.recentTransactions(action.walletId)).pipe(
                        map((res: GetTransactionResponse[])=>{
                            return (TransactionActions.FetchRecentTransactionsSuccess({ recentTransactions: res }));
                        })
                )
            }),
            catchError(error => of(TransactionActions.FetchRecentTransactionsFailure({ error: 'Error retrieving transaction History' })))
        )
    });

}