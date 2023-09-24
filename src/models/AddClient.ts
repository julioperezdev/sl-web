export interface AddClient {
    name: string;
    phone: string;
    address: string;
    description: string;
}
export interface AddClientRequest extends AddClient{
    id:string;
}