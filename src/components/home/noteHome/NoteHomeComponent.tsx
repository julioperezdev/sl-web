'use client'
import styles from './NoteHomeComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Note } from '@/models/NoteModel';

export default function NoteHomeComponent() {

    const [notes, setNotes] = useState<Note[]>([])

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
        setNotes(notesData.reverse().slice(0,6));

    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className={styles.listClientBase}>
            <h2>Recordatorios</h2>
            <div className={styles.dataContainer} >
                {notes.length > 0 ? notes.map(note => (
                    <div key={note.id} className={styles.listData}>
                        <style jsx>
                            {`
                            div {
                                background-color: ${note.color} ;
                            }
                            `}
                        </style>
                        <p className={styles.date}>{format(parseISO(note.updatedAt), 'd/MM/yyyy hh:mm:ss')}</p>
                        <p className={styles.description}>{note.description}</p> 
                    </div>
                )) : <p>NO HAY DATOS</p>}
            </div>
            <Link href={`/note/list`}>Ver más</Link>
        </div>
    )
}