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
    status:string;
}


export interface SummaryMultiboxResponse{
        pesosBox : number;
        officeBox : number;
        dollarHigh : number;
        dollarLow : number;
        euro : number;
        real : number;
        balance : number;
        sellerBox1 : number;
        sellerBox2 : number;
}