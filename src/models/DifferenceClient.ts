export interface DifferenceClient{
    id:string
    clientId:string
    differenceType: string;
    differenceStatus:string;
    amount:number;
    description: string;
    createdAt:string;
}