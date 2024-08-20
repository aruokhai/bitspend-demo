import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDetailsResponse, PaymentSuccessResponse } from '../../../../models/payment.model';
import { PaymentService } from '../../../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromWallet from '../../../../store/wallet/wallet.actions' 
import * as fromTransaction from '../../../../store/transaction/transaction.action' 
import { GetUserResponse } from 'src/app/interfaces/user-response';
import { getUserData } from 'src/app/store/user/user.selector';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { take } from 'rxjs';

@Component({
  selector: 'app-send-payment',
  templateUrl: './send-payment.component.html',
  styleUrls: ['./send-payment.component.css']
})

export class SendPaymentComponent implements OnInit{
  @Output() cancelButtonClicked = new EventEmitter<boolean>();
  paymentForm: FormGroup;
  invoice = '';
  pastedText: string | undefined = '';
  step = 1;
  user: GetUserResponse | null = null;
  user$ = this.store.pipe(select(getUserData));
  btcAmount: number | null = null;
  btcFees: number | null = null;
  currencyPriceRate: number | null = null;
  fiatAmount: number | null = null;
  fiatFees: number | null = null;
  isLoading = false;
  isFailed = false;


  constructor(
    private _paymentService: PaymentService,
    private _fb: FormBuilder,
    private snackbar: MatSnackBar,
    private store: Store<AppState>,
    private zone: NgZone,
    private router: Router,
  ){
     this.paymentForm = this._fb.group({
        invoice: ['', [Validators.required]] ,
    })
  }

  ngOnInit() : void{
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user){
         this.user = user
      }
    })
  }


  async getPaymentDetails(){
    this.step = 0;
    this.isLoading = true;
    const inv: string = this.paymentForm.get('invoice')?.value;
    this.invoice = inv;
    try {
      const response: PaymentDetailsResponse = await this._paymentService.getPaymentDetails(inv)
      if(response){
        this.isLoading = false;
        this.step = 2;
        this.btcAmount = response.btcAmount
        this.btcFees = response.btcFees
        this.fiatAmount = response.fiatAmount
        this.fiatFees = response.fiatFees
        this.currencyPriceRate = response.currencyPriceRate
      }
    } catch (error) {
      this.isLoading = false;
      this.step = 1;
      this.zone.run(() =>{
      this.snackbar.open("Error Encountered", undefined, { verticalPosition: "top", duration: 5000  })  
    });
      
    }

  }

  public async sendPayment() {
    this.step = 0;
    this.isLoading = true;
    const walletId = this.user?.walletId;
    if(!walletId){
      this.snackbar.open("Error Encountered", undefined, { verticalPosition: "top", duration: 5000  }) 
      return;
    }
    try {
      const paymentResponse: PaymentSuccessResponse = await this._paymentService.sendPayment(walletId, this.invoice);
      this.isLoading = false;
      this.store.dispatch(fromWallet.FetchWallet({walletId: walletId}))
      this.store.dispatch(fromTransaction.FetchRecentTransactions({walletId: walletId}))
      if(!paymentResponse){
        this.snackbar.open("Error Encountered", undefined, { verticalPosition: "top", duration: 5000  });
      }
      this.isLoading = false;
      this.step = 3;
      
    } catch (error) {
      this.isLoading = false;
      this.step = 0;
      this.isFailed = true;
    }
  }

  back(){
    this.step = 1
    this.isLoading = false;
  }

  public onCancelButtonClicked(){
    this.cancelButtonClicked.emit(true)
  }

  public reloadPage() {
    this.onCancelButtonClicked()
  }

}
