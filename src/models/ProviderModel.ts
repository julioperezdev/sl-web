export interface Provider{
    id:string;
    name:string;
    phone:string;
    address:string;
    createdAt:string;
    updatedAt:string;
}
export interface AddProviderRequest{
    id:string;
    name:string;
    phone:string;
    address:string;
}
export interface UpdateProviderRequest{
    id:string;
    phone:string;
    address:string;
}

export interface UpdateProviderForm{
    phone:string;
    address:string;
}