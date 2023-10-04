export interface AddClientForm {
    name: string;
    phone: string;
    address: string;
    description: string;
}
export interface AddClientRequest{
    id:string;
    name: string;
    phone: string;
    address: string;
    description: string;
}

export interface UpdateClientRequest{
    id:string;
    phone: string;
    address: string;
    description: string;
}
export interface UpdateClientForm{
    phone: string;
    address: string;
    description: string;
}

export interface Client{
    id:string;
    name: string;
    phone: string;
    address: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}


