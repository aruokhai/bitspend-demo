export interface WithdrawalResponse {
    requestReference: string,
    transactionReference: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface WithdrawalRequestBody {
  beneficiaryAccountNumber: string,
  beneficiaryBankCode: string,
  beneficiaryName: string,
  amount: number,
  nameEnquirySessionId: string
}

export interface AccountNameResponse {
  beneficiaryName: string,
  sessionID: string,
  status: string
}