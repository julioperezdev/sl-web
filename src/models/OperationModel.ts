export interface BuyOperationForm{
    currencyMultiBox: string 
    buyPriceForm:number|undefined;
    quantity:number|undefined
    percent?:number
}

// export interface BuyOperationData{
//     operationType :string;
//     currencyMultiBox: string 
//     buyPrice:number;
//     quantity:number
//     percent?:number
// }

export interface BuyOperationData{
    id:string;
    hasOfficeCheck:boolean;
    clientId:string;
    operationType :string;
    currencyMultiBox: string 
    buyPrice:number;
    quantity:number
    percent?:number
}
export interface BuyOperationRequest{
   ibuyOperationRequest:BuyOperationData[];
}
export interface BuyOperationContinue{
    id:string;
    hasOfficeCheck:boolean;
    clientId:string;
    clientName:string;
    clientPhone:string;
    operationType :string;
    currencyMultiBox: string 
    buyPrice:number;
    quantity:number;
    totalToPay:number;
    percent?:number;
}

// export interface BuyOperationData{
//     operationType :string;
//     currencyMultiBox: string 
//     buyPrice:number;
//     quantity:number
//     percent?:number
// }

// export interface BuyOperationRequest{
//     id:string;
//     hasOfficeCheck:boolean;
//     clientId:string;
//     buyOperationData: BuyOperationData[];
// }

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
