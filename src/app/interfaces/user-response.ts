export interface GetUserResponse {
    firstName: string,
    lastName: string,
    country: string,
    createdAt: number,
    role: string,
    phoneNumber?: string,
    type: 'email' | 'google',
    userId: string,
    walletId: string | undefined
    email: string,
    imageUrl?: string,
    emailVerified: boolean,
    updatedAt: number
}