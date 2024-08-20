export interface BankListResponse {
    BankCode: string,
    BankName: string
}


export interface GetAccountNameResponse {
  beneficiaryAccountNumber: string,
  beneficiaryBankCode: string,
  beneficiaryName: string,
  senderAccountNumber: string,
  senderName: string,
  beneficiaryCustomerID: number
}