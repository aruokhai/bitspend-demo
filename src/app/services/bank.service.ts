import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { AccountNameResponse } from '../interfaces/withdrawal.interface';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  readonly BASE_URL = environment.base_url;
  constructor( 
    private httpClient: HttpClient,
  ) { }

  async getAccountName(accountNumber: string, bankCode: string): Promise<AccountNameResponse>{
    const getAccountName =  this.BASE_URL + '/wallet/nameinquiry?';
    return (await firstValueFrom(this.httpClient.get<AccountNameResponse>(`${getAccountName}accountNumber=${accountNumber}&bankCode=${bankCode}`)));   
  }
}
