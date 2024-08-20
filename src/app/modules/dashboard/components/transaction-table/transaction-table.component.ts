import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { GetTransactionResponse } from '../../../../models/transacton.interface';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { WalletService } from '../../../../services/wallet.service';
import { Subject } from 'rxjs';
import { FormatDateToMonthDayAndTime } from 'src/app/utils/conversion';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css'],
})
export class TransactionTableComponent implements OnInit, OnDestroy{
  @Input() transactionsHistory!: GetTransactionResponse[];

  viewportWidth: number = window.innerWidth;
  viewportHeight: number = window.innerHeight;
  toggleMobileView = false;
  toggleView = false;
  invoice  = faFileInvoice;
  transaction!: GetTransactionResponse[];
  private unsubscribe$: Subject<void> = new Subject<void>()




  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;

    if(this.viewportWidth < 480){
      this.toggleMobileView = true
    }
    else{
      this.toggleMobileView = false;
    }
  }

  constructor(
    private _walletService: WalletService
  ){}

  ngOnInit(): void{
    if(window.innerWidth < 480){
      this.toggleMobileView = true;
    }
  }


  async viewTransactionDetail(id: string){
    const txns = await this._walletService.singleTransaction(id)
    const result = FormatDateToMonthDayAndTime(txns)
    this.transaction = [result]
    this.toggleView = true
  }

  closeWindow(e: boolean){
    if(e)
    this.toggleView = false;
  }

   ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
