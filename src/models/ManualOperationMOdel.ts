export interface ManualTransactionRequest{
    currencyBoxName:string;
    manualOperationType:string;
    quantity:number;
}
export interface ManualTransactionForm{
    manualOperationType:string;
    quantity:number;
}