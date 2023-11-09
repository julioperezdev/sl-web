export interface SellerBoxResponse{
    id:string;
    quantity:number;
    quantityOperation:number;
    name:string;
    operationType:string;
    updatedAt:string;
}

export interface ManualTransactionSellerBoxRequest{
    sellerBoxName:string;
    manualOperationType:string;
    quantity:number;
}
export interface ManualTransactionSellerForm{
    manualOperationType:string;
    quantity:number;
}