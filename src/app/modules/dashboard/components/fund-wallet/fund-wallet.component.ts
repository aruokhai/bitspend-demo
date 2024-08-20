import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { GetWalletResponse } from '../../../../interfaces/wallet-interface';
import { getWalletData } from '../../../../store/wallet/wallet.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserData } from 'src/app/store/user/user.selector';
import { GetUserResponse } from 'src/app/interfaces/user-response';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.css']
})
export class FundWalletComponent implements OnInit{

  @Output() cancelDepositClicked = new EventEmitter<boolean>();
  cancelButtonIsClicked = false;
  accountNumber = '';
  accountName = '';
  numberToCopy = '';
  isCopied = false;
  copiedMessage = 'Account number copied!'

  constructor(private clipboard: Clipboard, private store : Store<AppState>) {}
    
  ngOnInit(): void {
     this.store.select(getWalletData).subscribe((data : GetWalletResponse | null)=>{ 
      if(data != null){
        this.accountNumber = data.accountNumber;
      }
    })

    this.store.select(getUserData).subscribe((data: GetUserResponse | null)=>{
      if(data){
        this.accountName = `${data.firstName} ${data.lastName}`
      }
    })
  }

  copyAccountNumber() {
    this.clipboard.copy(this.accountNumber);
    this.isCopied =  true;
    this.displayTimeout();
  }

  displayTimeout() {
    setTimeout (()=>{
      this.isCopied = false
    }, 2000)
  }

  onCancelButtonClicked(){
    this.cancelDepositClicked.emit(true)
  }

}
