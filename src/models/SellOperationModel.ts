import { Dispatch, SetStateAction } from "react";
import { BuyOperationResponse } from "./OperationModel";

export interface SellerCommissionForm{
    priceByPeso:number;
    quantityToSell:number;
    sellerProfit:number;
}

export interface ReserveOfBuyOperationProps{
    setPanelScreen:Dispatch<SetStateAction<number>>;
    reserveOperation:ReserveOfBuyOperation[] | null;
    setReserveOperationSelected:Dispatch<SetStateAction<ReserveOfBuyOperation | null>>
}
export interface ReserveOfBuyOperation{
    id:string;
    updatedAt:string;
    buyPrice:number;
    reserve:number;
}


export interface SellOperationData{
    hasSeller:boolean;
    sellerId?:string;
    sellerCommission:number;
    operationType :string;
    currencyMultiBox: string 
    buyPrice:number;
    buyOperationId:string;
    sellPrice:number;
    quantityToSell:number;
}

export interface SellOperationRequest{
    id:string;
    clientId:string;
    sellOperationData: SellOperationData[];
}

export interface SellOperationForm{
    quantity:number;
    sellPrice:number;
    currencyMultiBox:string;
}