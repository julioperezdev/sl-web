export interface BuyOperationForm{
    currencyMultiBox: string 
    buyPriceForm:number;
    quantity:number
    percent?:number
}

export interface BuyOperationData{
    operationType :string;
    currencyMultiBox: string 
    buyPrice:number;
    quantity:number
    percent?:number
}

export interface BuyOperationRequest{
    id:string;
    hasOfficeCheck:boolean;
    clientId:string;
    buyOperationData: BuyOperationData[];
}

export interface BuyOperation{
    id:string;
    hasOfficeCheck:boolean;
    clientId:string;
    currencyMultiBox: string ;
    price:number;
    quantity:number;
    total:number;
    updatedAt:string;
}