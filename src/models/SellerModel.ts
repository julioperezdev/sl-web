export interface AddSeller{
    name:string;
    phone:string;
    description:string;
}

export interface Seller{
    id:string;
    createdAt:string;
    updatedAt:string;
    name:string;
    phone:string;
    description:string;
}

export interface AddSellerRequest{
    id:string;
    name:string;
    phone:string;
    description:string;
}

export interface UpdateSellerForm{
    phone:string;
    description:string;
}
export interface UpdateSellerRequest{
    id:string;
    phone:string;
    description:string;
}
