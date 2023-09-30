'use client'
import styles from './NoteHomeComponent.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Note } from '@/models/NoteModel';

export default function NoteHomeComponent() {

    const [selected, setSelected] = useState<string | null>(null)
    const [notes, setNotes] = useState<Note[]>([])

    async function getNotes() {
        const response = await fetch('http://localhost:8081/api/v1/note/get', {
            method: 'PUT',
        });
        let notesData: Note[] = await response.json();
        setNotes(notesData.reverse().slice(0,3));

    }
    function isSelected(id: string): boolean {
        return id == selected;
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className={styles.listClientBase}>
            <h2>Recordatorios</h2>
            <div className={styles.dataContainer} >
                {notes.length > 0 && notes.map(note => (
                    <div key={note.id} className={isSelected(note.id) ? styles.listDataSelected : styles.listData} onClick={() => setSelected(note.id)}>
                        <style jsx>
                            {`
                            div {
                                background-color: ${note.color} ;
                            }
                            `}
                        </style>
                        <p>{format(parseISO(note.updatedAt), 'd/MM/yyyy hh:mm:ss')}</p>
                        <p>{note.description}</p>
                    </div>
                ))}
            </div>
            <Link href={`/note/list`}>Ver más</Link>
        </div>
    )
}