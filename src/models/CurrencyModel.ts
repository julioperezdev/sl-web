export interface Currency{
    id:string;
    updatedAt:string;
    name:string;
    buyPrice:number;
    sellPrice:number;
}

export interface CurrencyRequest{
    id:string;
    name:string;
    buyPrice:number;
    sellPrice:number;
}

export interface CurrencyForm{
    name:string;
    buyPrice:number;
    sellPrice:number;
}