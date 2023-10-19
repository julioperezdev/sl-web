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

export interface BuyOperationResponse{
    id:string;
    hasOfficeCheck:boolean;
    clientName:string;
    currencyMultiBox: string ;
    price:number;
    quantity:number;
    total:number;
    updatedAt:string;
}

export interface GetOperationResponseDto{
    id:string,
    createdAt:string,
    updatedAt:string,
    clientName:string,
    currencyMultiBox:string,
    price:number,
    quantity:number,
    total:number
}

export interface GetBuyAndSellOperationResponseDto{
    buyOperation:GetOperationResponseDto[],
    sellOperation:GetOperationResponseDto[]
}
