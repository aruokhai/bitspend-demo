import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { GetWalletResponse } from '../../../../interfaces/wallet-interface';
import { WalletService } from '../../../../services/wallet.service';
import { AppState } from '../../../../store/app.reducer';
import { getWalletData } from '../../../../store/wallet/wallet.selector';

@Component({
  selector: 'app-card-balance',
  templateUrl: './card-balance.component.html',
  styleUrls: ['./card-balance.component.css']
})
export class CardBalanceComponent implements OnInit{

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  toggleBalance = true;

  walletData: GetWalletResponse[] = [];
  accountNumber: string | null = null;
  accountBalance: number | null = null;
  

  
  constructor(
    private _walletService : WalletService,
    private store : Store<AppState>,
  ){}

   ngOnInit() {
    this.store.select(getWalletData).subscribe((data : GetWalletResponse | null)=>{ 
      if(data != null){
        this.accountNumber = data.accountNumber;
        this.accountBalance = data.balance;
      }
    })
  }



  public onToggleBalance() : void{
    this.toggleBalance = !this.toggleBalance;
  }
}
