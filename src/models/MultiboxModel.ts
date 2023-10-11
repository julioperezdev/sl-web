export interface CurrencyBox{
    id:string;
    updatedAt:string;
    currencyBox:string;
    operationId:string;
    quantity:number;
    quantityOperation:number;
    multiBoxStatus:string;
}

export interface CurrencyBoxResponse{
    id:string;
    updatedAt:string;
    quantity:number;
    quantityOperation:number;
    operationType:string;
}