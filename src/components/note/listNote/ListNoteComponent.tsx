'use client'
import styles from './ListNoteComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Note } from '@/models/NoteModel';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ListNoteComponent() {

    const [selected, setSelected] = useState<string | null>(null)
    const [notes, setNotes] = useState<Note[]>([])
    const router = useRouter();
    async function getNotes() {
        const response = await fetch(process.env.apiUrl + '/v1/note/get', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        let notesData: Note[] = await response.json();
        setNotes(notesData)

    }
    function isSelected(id:string):boolean{
        return id == selected;
    }

    function validateIsSelected(){
        if(selected == null){
            toast.error('Se debe seleccionar un comentario antes de tomar una accion')
            return false;
        }
        return true;
    }

    function onClickUpdateNote(){
        let valid = validateIsSelected();
        if(!valid) return ;
        router.replace(`/note/update/${selected}`)
    }

    async function deleteNoteById(id:string){
        const response = await fetch(`${process.env.apiUrl}/v1/note/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
        if(response.status == 501){
            toast.error('No se pudo borrar, intente nuevamente')
            return;
        }
        let notesFiltered = notes.filter(particular => particular.id != id);
        setNotes(notesFiltered)
    }
    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className={styles.listClientBase}>
            <p>Histórico de Recordatorios</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha Registro</p>
                    <p>Fecha Actualizada</p>
                    <p className={styles.description}>Detalle</p>
                </div>
                <div className={styles.dataContainer} >
                {notes.length > 0 ? notes.map(note => (
                    <div key={note.id} className={isSelected(note.id) ? styles.listDataSelected : styles.listData} onClick={()=> setSelected(note.id)}>
                        <style jsx>
                            {`
                            div {
                                background-color: ${note.color} ;
                            }
                            `}
                        </style>
                        <p>{format(parseISO(note.createdAt), 'd/MM/yyyy')}</p>
                        <p>{format(parseISO(note.updatedAt), 'd/MM/yyyy')}</p>
                        <p className={styles.descriptionText}>{note.description}</p>
                        <p className={styles.deleteButton} onClick={()=>deleteNoteById(note.id)}>X</p>
                    </div>
                )) : <p>NO HAY DATOS</p>}
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/note'>Atrás</Link></button>
                <button onClick={onClickUpdateNote}>Modificar</button>
            </div>
            <Toaster/>
        </div>
    )
}