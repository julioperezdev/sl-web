export interface AddSeller{
    name:string;
    phone:string;
}

export interface Seller{
    id:string;
    createdAt:string;
    name:string;
    phone:string;
}

export interface AddSellerRequest{
    id:string;
    name:string;
    phone:string;
}
export interface UpdateSellerRequest{
    id:string;
    phone:string;
}