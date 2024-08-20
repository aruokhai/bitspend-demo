import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetTransactionResponse } from '../../../../models/transacton.interface';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit{

  @Input()
  transaction!: GetTransactionResponse[];
  @Output() cancelButtonClicked = new EventEmitter<boolean>();
  
  ngOnInit(){
    return
  }

  cancel(){
    this.cancelButtonClicked.emit(true)
  }

}
