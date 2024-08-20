import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { GetWalletResponse } from '../interfaces/wallet-interface';
import { BankListResponse } from '../interfaces/bank.interface';
import { WithdrawalRequestBody, WithdrawalResponse } from '../interfaces/withdrawal.interface';
import { GetTransactionResponse } from '../models/transacton.interface';


@Injectable({
  providedIn: 'root'
})
export class WalletService {
  readonly BASE_URL = environment.base_url;
  constructor(
    private httpClient: HttpClient,
    private _userService: UserService,
  ) { }


  async getWallet(walletId: string ): Promise<GetWalletResponse>{
    const getWallet =  this.BASE_URL + '/wallet/list/' + walletId
    return (await firstValueFrom(this.httpClient.get<GetWalletResponse>(getWallet)))      
  }

  async createWallet(email:string, phoneNumber: string, firstName: string, lastName: string): Promise<GetWalletResponse>{
    const createWalletUrl = this.BASE_URL + "/wallet/create"
    const result =  (await firstValueFrom(this.httpClient.post<GetWalletResponse>(createWalletUrl, {email, phoneNumber, firstName, lastName})));
    return result
  }

  async getbankList(): Promise<BankListResponse[]>{
    const getBankListUrl = this.BASE_URL + "/wallet/banklist"
    return (await firstValueFrom(this.httpClient.get<BankListResponse[]>(getBankListUrl)))
  }

  async withdrawal(walletId: string, params: WithdrawalRequestBody): Promise<WithdrawalResponse>{
    const withdrawalUrl = this.BASE_URL + "/wallet/withdrawal/" + walletId
    return (await firstValueFrom(this.httpClient.post<WithdrawalResponse>(withdrawalUrl, params)))
  }

   async recentTransactions(walletId: string): Promise<GetTransactionResponse[]>{
    const recentTransactionsUrl = this.BASE_URL + "/transaction/recent/" + walletId + "?limit=5";
    return (await firstValueFrom(this.httpClient.get<GetTransactionResponse[]>(recentTransactionsUrl)))
  }

  async allTransactions(walletId: string): Promise<GetTransactionResponse[]>{
    const transactionHistory = this.BASE_URL + '/transaction/history/' + walletId;
    return (await firstValueFrom(this.httpClient.get<GetTransactionResponse[]>(transactionHistory)));
  }

  async singleTransaction(txnId: string): Promise<GetTransactionResponse>{
    const singleTransaction = this.BASE_URL + '/transaction/' + txnId + '/history'
    return (await firstValueFrom(this.httpClient.get<GetTransactionResponse>(singleTransaction)));
  }

}
