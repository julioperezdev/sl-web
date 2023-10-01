'use client'
import styles from './ListNoteComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Note } from '@/models/NoteModel';

export default function ListNoteComponent() {

    const [selected, setSelected] = useState<string | null>(null)
    const [notes, setNotes] = useState<Note[]>([])

    async function getNotes() {
        const response = await fetch(process.env.apiUrl + '/v1/note/get', {
            method: 'PUT',
        });
        let notesData: Note[] = await response.json();
        setNotes(notesData)

    }
    function isSelected(id:string):boolean{
        return id == selected;
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
                {notes.length > 0 && notes.map(note => (
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
                    </div>
                ))}
                </div>
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/note'>Atrás</Link></button>
                <button><Link href={`/note/update/${selected}`}>Modificar</Link></button>
            </div>
        </div>
    )
}