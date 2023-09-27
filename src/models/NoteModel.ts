export interface Note{
    id:string;
    description:string;
    color:string;
    createdAt:string;
    updatedAt:string;
}
export interface NoteRequestForm{
    description:string;
    color:string;
}
export interface AddNoteRequest{
    id:string;
    description:string;
    color:string;
}
export interface UpdateNoteRequest{
    id:string;
    description:string;
    color:string;
}
