export interface GetTransactionResponse {
    id : string,
    transactionType: string,
    currencyCode: string,
    totalAmount: number,
    amountReceived: number,
    amountSent: number,
    fees: number,
    requestReference: string,
    transactionReference: string,
    narration: string,
    status: string,
    transactionResponseCode: string,
    transactionMessage: string,
    createdAt: string,
    updatedAt: string,
    formattedDate: string | undefined,
    formattedTime: string | undefined
}