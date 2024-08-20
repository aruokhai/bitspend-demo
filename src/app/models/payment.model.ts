export type PaymentDetailsResponse = {
    btcAmount: number
    btcFees: number
    currencyPriceRate: number
    fiatAmount: number
    fiatFees: number
}


export interface PaymentSuccessResponse {
  id: string;
  status: string;
  amountTendered: number;
  amountSent: number;
  fees: number;
}
