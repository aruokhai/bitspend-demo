import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentDetailsResponse, PaymentSuccessResponse } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly BASE_URL = environment.base_url;
  constructor(
     private httpClient: HttpClient,
  ) { }

  async getPaymentDetails(invoice: string): Promise<PaymentDetailsResponse>{
    const getPaymentDetails =  this.BASE_URL + '/payment/' + invoice; 
    return (await firstValueFrom(this.httpClient.get<PaymentDetailsResponse>(getPaymentDetails)))    
  }

  async sendPayment(walletId: string, invoice: string): Promise<PaymentSuccessResponse>{
    const sendPaymentDetails =  this.BASE_URL + '/payment/' + walletId;
    return (await firstValueFrom(this.httpClient.post<PaymentSuccessResponse>(sendPaymentDetails, {invoice})))  
  }
}
