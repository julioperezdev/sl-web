'use client'
import styles from './UpdateNoteComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ONE_SECOUND, sleep } from '@/helper/sleepInMilli/Sleep';
import { Note, NoteRequestForm, UpdateNoteRequest } from '@/models/NoteModel';
import { useEffect, useState } from 'react';
import { format } from 'date-fns'

export default function UpdateNoteComponent(idValue: { idValue: string }) {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<NoteRequestForm>();
    const [note, setNote] = useState<Note | null>(null)

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const dataValidated = converFormData(data);
            const response = await sendForm(dataValidated);
            if (response.ok) {
                reset();
                toast.success('Se ha actualizado exitosamente el Recordatorio')
                await sleep(ONE_SECOUND);
                router.replace(`/note/list`)
            } else {
                toast.error('Ops... No se pudo actualizar el Recordatorio')
            }
        } catch (error: any) {
            toast.error('Ops... No se pudo actualizar el Recordatorio')
        }
    }
    );

    function converFormData(data: NoteRequestForm): UpdateNoteRequest {
        return {
            id: note!.id,
            description: data.description,
            color: data.color
        }
    }

    function sendForm(updateNodeRequest: UpdateNoteRequest) {
        return fetch(process.env.apiUrl + '/v1/note/update', {
            method: 'PUT',
            body: JSON.stringify(updateNodeRequest),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
            }
        });
    }

    async function getNoteById() {
        const response = await fetch(`${process.env.apiUrl}/v1/note/get/${idValue.idValue}`, {
            method: 'PUT',
        });
        let noteData: Note = await response.json();
        setValue('description', noteData.description)
        setValue('color', noteData.color)
        setNote(noteData)
    }

    useEffect(() => {
        getNoteById();
    }, [])

    return (
        <div className={styles.formBase}>
            <p>Modificar Recordatorio</p>
            <div>
                <p className={styles.descriptionOver}>Fecha</p>
                <p>{format(new Date(), 'd/MM/yyyy')}</p>
                <p className={styles.descriptionOver}>Asignar Color</p>
                <select {...register("color", { required: true })}>
                    <option value="#f2f2f2">Blanco</option>
                    <option value="#e3ebff">Azul</option>
                    <option value="#ffe3e3">Rojo</option>
                    <option value="#fcfcde">Amarillo</option>
                </select>
                <p className={styles.descriptionOver}>Detalle</p>
                <input type="text" placeholder='Detalle' {...register("description", { required: true, maxLength: 30 })} />
                {errors.description && errors.description.type === "required" && (<span>La descripción es obligatoria</span>)}
                {errors.description && errors.description.type === "maxLength" && (<span>Máximo de 30 dígitos</span>)}
            </div>
            <div className={styles.buttonBase}>
                <button><Link href='/note/list'>Atras</Link></button>
                <button onClick={onSubmit}>Guardar</button>
            </div>
            <Toaster />
        </div>
    )
}