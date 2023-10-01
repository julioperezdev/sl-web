export interface DifferenceClientDtoResponse{
    id:string
    clientName:string
    differenceType: string;
    differenceStatus:string;
    amount:number;
    description: string;
    createdAt:string;
}

export interface DifferenceClientUpdateRequest{
    id:string
    differenceType: string;
    differenceStatus:string;
    amount:number;
    description: string;
}

export interface DifferenceClient{
    id:string
    clientId:string
    differenceType: string;
    differenceStatus:string;
    amount:number;
    description: string;
    createdAt:string;
}