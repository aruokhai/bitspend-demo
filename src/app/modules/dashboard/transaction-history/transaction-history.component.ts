import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as FromTransactions from '../../../store/transaction/transaction.action'
import { getTransactionsData, selectTransactions } from '../../../store/transaction/transaction.selector';
import { Convert } from '../../../utils/conversion';
import { map, take } from 'rxjs';
import { getUserData } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit{

  @Input() isToggled = false;
  public sideNavStatus  = false;
  transactions$ = this.store.pipe(select(getTransactionsData), map((value) => Convert(value) ));
  isLoading$ = this.store.pipe(select(selectTransactions))
  user$ = this.store.pipe(select(getUserData));

  constructor(
    private store : Store<AppState>,
  ){}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  public async getAllTransactions(){
    this.user$.pipe(take(5)).subscribe((user) =>{
      if(user?.walletId){
        const WALLETID = user?.walletId
        this.store.dispatch(FromTransactions.FetchAllTransactions({ walletId: WALLETID }))
      }
    })
  }

}
