import { Component, Input, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as fromWallet from '../../../store/wallet/wallet.actions' 
import * as FromTransactions from '../../../store/transaction/transaction.action'
import { getUserData, selectUser } from '../../../store/user/user.selector';
import { Convert } from '../../../utils/conversion'
import { getRecentTransactions } from 'src/app/store/transaction/transaction.selector';
import { map, take } from 'rxjs';
import { selectWallet } from 'src/app/store/wallet/wallet.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() isToggled = false;
  transactions$  = this.store.pipe(select(getRecentTransactions) , map((value) => Convert(value) ));
  user$ = this.store.pipe(select(getUserData));
  isLoading$ = this.store.pipe(select(selectUser))
  walletLoading$ = this.store.pipe(select(selectWallet));
  public sideNavStatus  = false;

  constructor(
    private store : Store<AppState>,
  ){}

   ngOnInit() {
      this.getUser();
  }

  getWallet(walletId: string){

    this.store.dispatch(fromWallet.FetchWallet({walletId: walletId}))
  }

 public getUser(){
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user?.walletId){
         this.getWallet(user.walletId)
         this.getRecentTransactions(user.walletId)
      }
    })
  }
  
  public async getRecentTransactions(walletId: string){
    this.store.dispatch(FromTransactions.FetchRecentTransactions({ walletId }))
  }


 

  onButtonToggled(){
    this.isToggled = !this.isToggled;
  }

}
