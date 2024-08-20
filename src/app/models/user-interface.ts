interface BaseUser {
    firstName?: string,
    lastName?: string,
    country?: string,
    phoneNumber?: string,
    walletCreated?: boolean,
    userId: string,
    createdAt: number,
    updatedAt: number,
    email: string,
    role: string,
    imageUrl?: string,
    accessToken?: string,
    
}

export interface GoogleUser extends BaseUser {
    type: 'google',

}

export interface EmailUser extends BaseUser {
    type: 'email',
    emailVerified: boolean
}

export type User = GoogleUser | EmailUser;


