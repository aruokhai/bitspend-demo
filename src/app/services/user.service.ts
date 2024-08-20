import { Injectable } from '@angular/core';
import { User } from '../models/user-interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetUserResponse } from '../interfaces/user-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BASE_URL = environment.base_url;
  constructor(
    private httpClient: HttpClient
  ) { 
  
  }

  async getUserByUserId(trxnId: string): Promise<GetUserResponse>{
    const userData = this.BASE_URL + '/user/details/' + trxnId
    return (await firstValueFrom(this.httpClient.get<GetUserResponse>(userData)));
  }

  async createUser(user: User): Promise<void>{
    const createUser = this.BASE_URL + '/user/create-user'
    return (await firstValueFrom(this.httpClient.post<void>(createUser, user)))
  }

  async updateUser(id: string, data: Partial<User>): Promise<void>{
    const updateUser = this.BASE_URL + '/user/update-user/' + id 
    return (await firstValueFrom(this.httpClient.post<void>(updateUser, data)));
  }

  async updateUserPhoneNumber(userId: string, phoneNumber: string): Promise<void>{
    const updateUserWithPhoneNumber = this.BASE_URL + '/user/update/phone-number'
    const url = `${updateUserWithPhoneNumber}?userId=${userId}&phoneNumber=${phoneNumber}`;
    return (await firstValueFrom(this.httpClient.get<void>(url)));
  }

  async updateUserWalletId(userId: string, walletId: string): Promise<void>{
    const updateUserWithWalletId = this.BASE_URL + '/user/update-wallet'
    const url = `${updateUserWithWalletId}?userId=${userId}&walletId=${walletId}`;
    return (await firstValueFrom(this.httpClient.get<void>(url)));

  }

  async getUserFromLocalStorage(){
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('no user found');
    const userData = this.BASE_URL + '/user/details/' + uid;
    return this.getUserByUserId(userData)
  }
}
