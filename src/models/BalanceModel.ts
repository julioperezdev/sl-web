export interface AssignSellerBoxForm{
    quantity:number;
    sellerBoxName:string;
}

export interface AssignSellerBoxRequest{
    quantity:number;
    sellerBoxName:string;
}

export interface BalanceResponse{
    id:string;
    updatedAt:string;
    profit:number;
    quantityOperation:number;
    operationType:string;
}