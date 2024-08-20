import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { BankListResponse } from '../../../../interfaces/bank.interface';
import { BankService } from '../../../../services/bank.service';
import { WalletService } from '../../../../services/wallet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getUserData } from 'src/app/store/user/user.selector';
import { AppState } from 'src/app/store/app.reducer';
import { GetUserResponse } from 'src/app/interfaces/user-response';
import { AccountNameResponse } from 'src/app/interfaces/withdrawal.interface';
import { take } from 'rxjs';
import * as fromWallet from '../../../../store/wallet/wallet.actions' 
import * as fromTransaction from '../../../../store/transaction/transaction.action'


@Component({
  selector: 'app-withdraw-wallet',
  templateUrl: './withdraw-wallet.component.html',
  styleUrls: ['./withdraw-wallet.component.css']
})


export class PaymentCardComponent implements OnInit {
  paymentForm : FormGroup;
  banks : BankListResponse[] = [];
  loading  = false;
  paymentLoading  = false;
  isNotSuccessful = false;
  accountName   = '';
  bankName   = '';
  accountNumber   = '';
  amount   = 0;
  bankCode  = '';
  sessionId  = '';
  step  = 1;
  user: GetUserResponse | null = null
  user$ = this.store.pipe(select(getUserData));
  @Output() cancelButtonClicked = new EventEmitter<boolean>();
  @Input() text  = "";
 

  constructor(
    private _walletService: WalletService,
    private _bnk: BankService,
    private _fb: FormBuilder,
    private store: Store<AppState>,
    private snackbar: MatSnackBar
  ){
     this.paymentForm = this._fb.group({
        accountNumber: ['', [Validators.required]] ,
        bankName: ['', [Validators.required]],
        amount: ['', [Validators.required]]
    })
  }

  ngOnInit() : void{
    this.getBankList();
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user){
         this.user = user
      }
    })
  }

  async getBankList(){
    try {
      this.banks =  (await this._walletService.getbankList())
    } catch (err) {
      this.snackbar.open("Failed Getting Bank Details", undefined, { verticalPosition: "top", duration: 5000  })
    }
    
  }

  prevStep(){
    this.step -= 1;
  }

  public confirmPaymentDetails(){
      this.accountNumber = this.paymentForm.get('accountNumber')?.value;
      this.bankName = this.paymentForm.get('bankName')?.value;
      this.amount = parseFloat(this.paymentForm.get('amount')?.value);
      this.step = 2;
      
  }

  public async submitWithdrawal(){
    this.step = 0;  
    this.paymentLoading = true;
    this.isNotSuccessful = false;
    const walletId = this.user?.walletId as string 
    try {
      const res = await this._walletService.withdrawal(walletId,{
      beneficiaryAccountNumber: this.accountNumber,
      beneficiaryBankCode: this.bankCode,
      beneficiaryName: this.accountName,
      amount: this.amount,
      nameEnquirySessionId: this.sessionId
    })
      if(res){
        this.store.dispatch(fromWallet.FetchWallet({walletId: walletId}))
        this.store.dispatch(fromTransaction.FetchRecentTransactions({walletId: walletId}))
        this.paymentLoading = false;
        this.step = 3
      }
    } catch (error) {
      this.step = 0;
      this.paymentLoading = false;
      this.isNotSuccessful = true;
      this.snackbar.open("Withdrawal failed", undefined, { verticalPosition:"top" , duration: 5000 })
    }
  }

  public async onAccountInputChange(){
    const acctNumber : string = this.paymentForm.get('accountNumber')?.value;
    const bankName = this.paymentForm.get('bankName')?.value;
    if(acctNumber.length < 9){
      this.loading = false;
      this.accountName = '';
      return 
    }
    const bankDetails = this.banks.find(b => {
        return b.BankName === bankName
      })
    if(!bankDetails) return ;
    this.bankCode = bankDetails.BankCode;
    this.loading = true;
    const accountName: AccountNameResponse = await this._bnk.getAccountName(acctNumber, this.bankCode);
    this.loading = false;
    this.accountName = accountName.beneficiaryName
    this.sessionId = accountName.sessionID
  }


  public onCancelButtonClicked(){
    this.cancelButtonClicked.emit(true)
  }

}
