import { Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { QuickActionProps } from './quick-action-data.interface';
import { PaymentCardComponent } from '../withdraw-wallet/withdraw-wallet.component';
import { AppState } from '../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../../../store/user/user.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createWallet } from 'src/app/store/wallet/wallet.actions';
import { getWalletData } from 'src/app/store/wallet/wallet.selector';
import { GetUserResponse } from 'src/app/interfaces/user-response';
import { take } from 'rxjs';
import { GetWalletResponse } from 'src/app/interfaces/wallet-interface';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.css']
})
export class QuickActionCardComponent implements OnInit {
  cancelButtonClicked  = true;
  fundWalletClicked  = false;
  showDialogue  = false;
  sendPaymentClicked  = false;
  Text  = "";
  user: GetUserResponse | null = null;
  firstname = '';
  lastname = '';
  phoneNumber = '';
  email = '';
  walletData$ = this.store.pipe(select(getWalletData));
  wallet : GetWalletResponse | null = null;
  user$ = this.store.pipe(select(getUserData));

  constructor(
    private store : Store<AppState>
  ){}
  

  @ViewChild('container', {read: ViewContainerRef})
  container!: ViewContainerRef;


  public renderComponent() {
    this.container.clear()
    this.container.createComponent(PaymentCardComponent)
  }



  asset1  = '../../../../assets/QAicons/1.png';
  asset2  = '../../../../assets/QAicons/2.png';
  asset3  = '../../../../assets/QAicons/3.png';
  asset4  = '../../../../assets/QAicons/4.png';

  items: Array<QuickActionProps> = [
    { title : 'Deposit', icon: this.asset1, link: '/dashboard/transaction-history'},
    { title : 'Withdraw', icon: this.asset2, link: '/dashboard/transaction-history'},
    { title : 'Send', icon: this.asset3, link: '/dashboard/transaction-history'},
    { title : 'Wallet', icon: this.asset4, link: '/dashboard/transaction-history'},
  ]

  onCancel(e : boolean){
    if(e === true){
      this.cancelButtonClicked = true;
  }

  }

  ngOnInit(): void {
      this.walletData$.pipe(take(5)).subscribe(wallet => {
        this.wallet = wallet;
      })
  }

  renderPaymentComponent(vl : string){
    if(!this.wallet) return
    this.cancelButtonClicked = false;

    switch(vl){
      case "SEND":
        this.Text = "Send Money"
        break;
      
      case "WITHDRAW":
        this.Text = "Withdraw Money"
        break;

      default:
        null;
    }
  }

  renderFundWalletComponent(){
    if(!this.wallet) return
    this.fundWalletClicked = true;
  }

  renderSendPaymentComponent(){
    if(!this.wallet) return
    this.sendPaymentClicked = true;
  }

  onCancelDepositClicked(e: boolean){
    if(e=== true)
    this.fundWalletClicked = false;
  }

  onCancelButtonClicked(e : boolean){
    if(e=== true)
    this.fundWalletClicked = false;
  }

  onCloseSendPaymentComponent(e : boolean){
    if(e=== true)
    this.sendPaymentClicked = false;
  }

  async createWalletBtnClicked(){
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user && user.phoneNumber !== undefined){
        this.firstname = user.firstName
        this.lastname = user.lastName
        this.email = user.email
        this.phoneNumber = user.phoneNumber
        this.store.dispatch(createWallet({ email: this.email, phoneNumber: this.phoneNumber, firstName: this.firstname, lastName: this.lastname }))
      }
      if(!user?.phoneNumber){
        this.onOpenDialogue();
      }
    })
  }


onOpenDialogue(){
    this.showDialogue = true;
}

onCloseDialogue(e: boolean){
  this.showDialogue = false;
}
}
