import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.action'
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { GetUserResponse } from 'src/app/interfaces/user-response';
import { EmailUser } from 'src/app/models/user-interface';

@Injectable()

export class UserEffects {

     constructor(
        private userService : UserService,
        private actions$ : Actions
    ){}

    user$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(UserActions.FetchUserData),
            switchMap((action)=>{
                return from(this.userService.getUserByUserId(action.userId)).pipe(
                    switchMap((res: GetUserResponse)=>{
                        const userData: Partial<EmailUser> = {
                          emailVerified: true,
                          updatedAt: new Date().getTime(),           
                        }
                        return from(this.userService.updateUser(res.userId, userData)).pipe(
                            switchMap((_) => of(UserActions.FetchUserDataSuccess({ user: res }))
                        ),
                         catchError(error =>{ 
                                console.log(error)
                                return of(UserActions.FetchUserDataFailure({ error: `Error fetching user details: ${error}` }))
                        })
                        )
                    }),
                )
            }),
           
        )
    });

}